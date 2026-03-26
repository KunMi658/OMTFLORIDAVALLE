// ============================================
// APP.JS — OMT Aula Interactiva
// Módulos: App (splash/nav) | ProfControl | StudentLive | ProjectorView
// ============================================

import { Sync } from './sync.js';

// ---- Utilidades ----
function normalize(str) {
  return str.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]/g, '_');
}

function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  const el = document.getElementById(id);
  if (el) el.classList.add('active');
}

// ========================================
// APP — Navegación principal
// ========================================
const App = {
  goSplash() {
    Sync.removeAllListeners();
    showScreen('screen-splash');
  },

  showStudentLogin() {
    showScreen('screen-student-login');
    setTimeout(() => document.getElementById('student-name').focus(), 100);
  },

  showProfessorLogin() {
    showScreen('screen-professor-login');
    setTimeout(() => document.getElementById('professor-pass').focus(), 100);
  },

  showProjectorMode() {
    showScreen('screen-projector');
    ProjectorView.init();
  },

  async studentJoinClass() {
    const name = document.getElementById('student-name').value.trim();
    if (!name || name.length < 2) {
      document.getElementById('student-login-error').textContent = 'Ingresa tu nombre completo';
      return;
    }
    document.getElementById('student-login-error').textContent = '';
    document.getElementById('student-login-status').textContent = '🔄 Conectando...';
    try {
      const key = await Sync.registerStudent(name);
      localStorage.setItem('omt_student_name', name);
      localStorage.setItem('omt_student_key', key);
      StudentLive.init(name, key);
      showScreen('screen-student-live');
    } catch(e) {
      document.getElementById('student-login-error').textContent = '⚠️ Error de conexión. Verifica tu internet.';
      document.getElementById('student-login-status').textContent = '';
    }
  },

  async reconnect(name, key) {
    document.getElementById('reconnect-banner').style.display = 'none';
    StudentLive.init(name, key);
    showScreen('screen-student-live');
  },

  clearSession() {
    localStorage.removeItem('omt_student_name');
    localStorage.removeItem('omt_student_key');
    document.getElementById('reconnect-banner').style.display = 'none';
  },

  professorEnter() {
    const pass = document.getElementById('professor-pass').value;
    if (pass !== '6588242') {
      document.getElementById('professor-login-error').textContent = 'Código incorrecto';
      return;
    }
    ProfControl.init();
    showScreen('screen-professor-panel');
  }
};

// ========================================
// PROJECTOR VIEW — Vista del proyector
// ========================================
const ProjectorView = {
  timerInterval: null,
  currentClass: null,
  currentSlide: 0,

  init() {
    Sync.initOffset(); // FIX-1: ensure server time is calibrated for the projector
    Sync.listenSession(session => this.handleSession(session));
    Sync.listenStudents(students => this.updateStudentCount(students));
    Sync.listenActivity(activity => this.handleActivity(activity));
    Sync.listenResponses(responses => this.handleResponses(responses));
    Sync.listenHotSeat(hotSeat => this.handleHotSeatProjector(hotSeat));
  },

  handleHotSeatProjector(hotSeat) {
    if (!hotSeat || !hotSeat.active) {
      if (this.hotSeatActive) {
        this.hotSeatActive = false;
      }
      return;
    }
    this.hotSeatActive = true;
    
    document.getElementById('proj-waiting').style.display = 'none';
    document.getElementById('proj-content-area').style.display = 'none';
    document.getElementById('proj-results-area').style.display = 'none';
    document.getElementById('proj-activity-area').style.display = 'flex';
    
    document.querySelector('.proj-activity-badge').textContent = '🔥 SILLA CALIENTE';
    document.querySelector('.proj-activity-badge').style.background = '#ff6d00';
    document.getElementById('proj-timer-num').textContent = '∞';
    
    document.getElementById('proj-activity-question').textContent = hotSeat.question;
    
    const optionsEl = document.getElementById('proj-activity-options');
    optionsEl.innerHTML = `
      <div class="proj-hot-seat-roulette">
        <div class="roulette-lbl">Seleccionado:</div>
        <div class="roulette-name animated-name">Buscando...</div>
      </div>
    `;
    
    setTimeout(async () => {
      const students = await Sync.getStudents();
      const s = students[hotSeat.studentKey];
      if (s) {
        document.querySelector('.roulette-name').textContent = s.name;
        document.querySelector('.roulette-name').style.color = '#ff6d00';
      }
    }, 1500);
  },

  handleSession(session) {
    if (!session || !session.active) {
      this.showWaiting('El profesor está preparando la sesión...');
      return;
    }

    if (session.classId !== null) {
      const cls = COURSE_DATA.classes.find(c => c.id === session.classId);
      if (cls) {
        this.currentClass = cls;
        this.currentSlide = session.slideIndex || 0;
        document.getElementById('proj-class-info').textContent = `${cls.icon} ${cls.title}`;
        this.updateProgress(session.slideIndex, cls.studentSlides.length);
      }
    }

    switch (session.mode) {
      case 'waiting':
        this.showWaiting('Esperando inicio de clase...');
        break;
      case 'content':
        this.showContent(session.slideIndex);
        break;
      case 'activity':
        // Handled by listenActivity
        break;
      case 'results':
        this.showResultsView();
        break;
    }
  },

  showWaiting(msg) {
    document.getElementById('proj-waiting').style.display = 'flex';
    document.getElementById('proj-content-area').style.display = 'none';
    document.getElementById('proj-activity-area').style.display = 'none';
    document.getElementById('proj-results-area').style.display = 'none';
    document.querySelector('.proj-waiting-sub').textContent = msg;
  },

  showContent(slideIdx) {
    if (!this.currentClass) return;
    const slides = this.currentClass.studentSlides;
    if (slideIdx >= slides.length) return;

    document.getElementById('proj-waiting').style.display = 'none';
    document.getElementById('proj-content-area').style.display = 'flex';
    document.getElementById('proj-activity-area').style.display = 'none';
    document.getElementById('proj-results-area').style.display = 'none';

    const slide = slides[slideIdx];
    const container = document.getElementById('proj-slide-content');
    container.style.animation = 'none';
    void container.offsetHeight;
    container.style.animation = 'projSlideIn 0.5s ease';

    if (slide.type === 'info') {
      container.innerHTML = `<div class="proj-info-slide">${slide.html}</div>`;
    } else if (slide.type === 'exercise') {
      // FIX-3: don't reveal the question while the professor is still explaining.
      // The question will appear automatically when the professor launches the activity.
      container.innerHTML = `<div class="proj-exercise-preview" style="opacity:0.4">
        <div class="proj-exercise-badge">📖 CLASE EN CURSO</div>
        <div class="proj-exercise-hint">El profesor continúa la explicación...<br>La actividad se lanzará cuando esté listo.</div>
      </div>`;
    }
  },

  handleActivity(activity) {
    if (this.hotSeatActive) return;
    if (!activity || !activity.active) return;

    document.getElementById('proj-waiting').style.display = 'none';
    document.getElementById('proj-content-area').style.display = 'none';
    document.getElementById('proj-activity-area').style.display = 'flex';
    document.getElementById('proj-results-area').style.display = 'none';

    document.querySelector('.proj-activity-badge').style.background = 'var(--accent)';
    document.querySelector('.proj-activity-badge').textContent = '⚡ ACTIVIDAD EN VIVO';
    document.getElementById('proj-activity-question').textContent = activity.question;

    const optionsEl = document.getElementById('proj-activity-options');
    if (activity.type === 'multiple' && activity.options) {
      optionsEl.innerHTML = activity.options.map((opt, i) =>
        `<div class="proj-option" id="proj-opt-${i}"><span class="proj-opt-letter">${String.fromCharCode(65+i)}</span>${opt}</div>`
      ).join('');
    } else {
      optionsEl.innerHTML = `<div class="proj-text-indicator">📝 Respuesta abierta — escríbela en tu celular</div>`;
    }

    this.startTimer(activity.timerEnd, activity.timerSeconds);
  },

  startTimer(timerEnd, timerSeconds) {
    clearInterval(this.timerInterval);
    const circle = document.getElementById('proj-timer-circle');
    const numEl = document.getElementById('proj-timer-num');
    const circumference = 2 * Math.PI * 42;
    circle.style.strokeDasharray = circumference;

    // FIX-1: use the stored timerSeconds from the activity, not a re-derived value
    // (re-deriving with an un-calibrated offset was causing 150s from a 60s timer)
    const totalSecs = Math.max(1, timerSeconds || 60);

    const update = () => {
      const currentServerNow = Sync.getServerNow();
      const remaining = Math.max(0, timerEnd - currentServerNow);
      const secs = Math.ceil(remaining / 1000);
      numEl.textContent = secs;

      const pct = remaining / (totalSecs * 1000);
      circle.style.strokeDashoffset = circumference * (1 - pct);

      if (secs <= 5) {
        circle.style.stroke = '#ff1744';
        numEl.style.color = '#ff1744';
      } else if (secs <= 15) {
        circle.style.stroke = '#ffd600';
        numEl.style.color = '#ffd600';
      } else {
        circle.style.stroke = '#00c853';
        numEl.style.color = '#00c853';
      }

      if (remaining <= 0) {
        clearInterval(this.timerInterval);
        numEl.textContent = '⏰';
      }
    };

    update();
    this.timerInterval = setInterval(update, 250);
  },

  handleResponses(responses) {
    const container = document.getElementById('proj-responses-live');
    const count = Object.keys(responses).length;
    if (count === 0) { container.innerHTML = ''; return; }

    container.innerHTML = `<div class="proj-responses-header">📨 ${count} respuesta${count > 1 ? 's' : ''} recibida${count > 1 ? 's' : ''}</div>
      <div class="proj-response-chips">${Object.values(responses).map(r =>
        `<div class="proj-response-chip ${r.score > 0 ? 'chip-correct' : 'chip-wrong'}">
          ${r.score > 0 ? '✅' : '⏳'} ${r.studentName.split(' ')[0]}
        </div>`
      ).join('')}</div>`;
  },

  // Tracks cumulative activity count per session for star calculation
  _activityCount: 0,

  async showResultsView() {
    document.getElementById('proj-waiting').style.display = 'none';
    document.getElementById('proj-content-area').style.display = 'none';
    document.getElementById('proj-activity-area').style.display = 'none';
    document.getElementById('proj-results-area').style.display = 'flex';
    clearInterval(this.timerInterval);
    this._activityCount++;

    const [activity, responses, students] = await Promise.all([
      Sync.getActivity(), Sync.getResponses(), Sync.getStudents()
    ]);

    const resultsEl = document.getElementById('proj-results-content');
    if (!activity) { resultsEl.innerHTML = '<p>Sin datos de actividad.</p>'; return; }

    const studentList = Object.values(students).filter(s => s.online || responses[s.key]);
    const totalStudents = studentList.length;
    const correctCount = studentList.filter(s => {
      const r = responses[s.key];
      return r && r.score > 0;
    }).length;
    const pctCorrect = totalStudents > 0 ? Math.round((correctCount / totalStudents) * 100) : 0;

    // Correct answer for display
    let correctAnswerHtml = '';
    if (activity.type === 'multiple' && activity.options) {
      const correct = activity.options[activity.correctIndex];
      correctAnswerHtml = `<div class="res-correct-banner">
        <span class="res-correct-label">✅ Respuesta correcta</span>
        <span class="res-correct-text">${String.fromCharCode(65 + activity.correctIndex)}. ${correct}</span>
      </div>`;
    }

    // Summary stats
    const summaryHtml = `
      <div class="res-stats-row">
        ${correctAnswerHtml}
        <div class="res-stat-card res-stat-green">
          <div class="res-stat-num">${correctCount}</div>
          <div class="res-stat-label">Correctas</div>
        </div>
        <div class="res-stat-card res-stat-red">
          <div class="res-stat-num">${totalStudents - correctCount}</div>
          <div class="res-stat-label">A repasar</div>
        </div>
        <div class="res-stat-card res-stat-blue">
          <div class="res-stat-num">${pctCorrect}%</div>
          <div class="res-stat-label">Aciertos</div>
        </div>
      </div>`;

    // Bar chart — sorted by score desc
    const maxScore = Math.max(...studentList.map(s => s.score || 0), 1);
    const barHtml = `
      <div class="res-bars-section">
        <div class="res-bars-title">📊 Puntaje acumulado de la sesión</div>
        <div class="res-bars-grid">
          ${studentList.sort((a,b) => (b.score||0)-(a.score||0)).map((s, i) => {
            const scorePct = Math.round(((s.score || 0) / maxScore) * 100);
            const stars = Math.max(1, Math.min(5, Math.round((s.score||0) / maxScore * 5)));
            const r = responses[s.key];
            const isCorrect = r && r.score > 0;
            const barColor = isCorrect ? 'bar-green' : 'bar-red';
            return `<div class="res-bar-item" style="animation-delay:${i * 80}ms">
              <div class="res-bar-name">${s.name.split(' ')[0]}</div>
              <div class="res-bar-track">
                <div class="res-bar-fill ${barColor}" style="--target:${scorePct}%"></div>
              </div>
              <div class="res-bar-score">${s.score || 0}pts</div>
            </div>`;
          }).join('')}
        </div>
      </div>`;

    // Student expandable cards
    const cardsHtml = `
      <div class="res-cards-section">
        <div class="res-cards-title">👥 Detalle por estudiante — toca para ver su respuesta</div>
        <div class="res-cards-grid" id="res-cards-grid">
          ${studentList.map((s, i) => {
            const r = responses[s.key];
            const isCorrect = r && r.score > 0;
            const starCount = Math.max(1, Math.min(5, Math.round((s.score||0) / maxScore * 5)));
            const stars = '⭐'.repeat(starCount) + '☆'.repeat(5 - starCount);

            let answerDetail = '';
            if (!r) {
              answerDetail = `<div class="res-card-no-answer">⏰ No respondió a tiempo</div>`;
            } else if (activity.type === 'multiple' && activity.options) {
              const studentAnswer = activity.options[r.answer];
              const correctAnswer = activity.options[activity.correctIndex];
              answerDetail = `
                <div class="res-card-answer ${isCorrect ? 'answer-correct' : 'answer-wrong'}">
                  <div class="res-card-answer-label:">Su respuesta:</div>
                  <div class="res-card-answer-text">${String.fromCharCode(65 + r.answer)}. ${studentAnswer}</div>
                  ${!isCorrect ? `<div class="res-card-correct-show">✅ Correcta: ${String.fromCharCode(65 + activity.correctIndex)}. ${correctAnswer}</div>` : ''}
                </div>`;
            } else if (r.type === 'text') {
              answerDetail = `
                <div class="res-card-answer ${isCorrect ? 'answer-correct' : 'answer-wrong'}">
                  <div class="res-card-answer-label:">Su respuesta:</div>
                  <div class="res-card-answer-text">"${r.answer}"</div>
                </div>`;
            }

            return `
              <div class="res-card ${isCorrect ? 'res-card-ok' : 'res-card-bad'}" 
                   id="res-card-${i}" 
                   onclick="ProjectorView.toggleCard(${i})"
                   style="animation-delay:${i * 100}ms">
                <div class="res-card-header">
                  <div class="res-card-name-row">
                    <span class="res-card-status-dot ${isCorrect ? 'dot-green' : 'dot-red'}"></span>
                    <span class="res-card-name">${s.name}</span>
                  </div>
                  <div class="res-card-meta">
                    <span class="res-card-stars">${stars}</span>
                    <span class="res-card-pts">${s.score || 0} pts</span>
                    <span class="res-card-chevron" id="res-chevron-${i}">›</span>
                  </div>
                </div>
                <div class="res-card-body" id="res-card-body-${i}">
                  ${answerDetail}
                </div>
              </div>`;
          }).join('')}
        </div>
      </div>`;

    resultsEl.innerHTML = summaryHtml + barHtml + cardsHtml;

    // Animate bars after render
    requestAnimationFrame(() => {
      document.querySelectorAll('.res-bar-fill').forEach(bar => {
        bar.style.width = bar.style.getPropertyValue('--target') || '0%';
      });
    });
  },

  toggleCard(idx) {
    const body = document.getElementById(`res-card-body-${idx}`);
    const chevron = document.getElementById(`res-chevron-${idx}`);
    const card = document.getElementById(`res-card-${idx}`);
    if (!body) return;

    const isOpen = body.classList.contains('open');
    // Close all others
    document.querySelectorAll('.res-card-body').forEach((b, i) => {
      b.classList.remove('open');
      const c = document.getElementById(`res-chevron-${i}`);
      if (c) c.style.transform = 'rotate(0deg)';
    });
    document.querySelectorAll('.res-card').forEach(c => c.classList.remove('res-card-active'));

    if (!isOpen) {
      body.classList.add('open');
      if (chevron) chevron.style.transform = 'rotate(90deg)';
      card.classList.add('res-card-active');
      setTimeout(() => card.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 100);
    }
  },

  updateStudentCount(students) {
    const onlineCount = Object.values(students).filter(s => s.online).length;
    document.getElementById('proj-student-count').textContent = `${onlineCount} estudiante${onlineCount !== 1 ? 's' : ''}`;

    // Mostrar nombres en espera
    const waitingEl = document.getElementById('proj-waiting-students');
    if (waitingEl) {
      waitingEl.innerHTML = Object.values(students).filter(s => s.online).map(s =>
        `<div class="waiting-student-chip">${s.name.split(' ')[0]}</div>`
      ).join('');
    }
  },

  updateProgress(idx, total) {
    if (!total) return;
    document.getElementById('proj-slide-counter').textContent = `${idx + 1} / ${total}`;
    document.getElementById('proj-progress-fill').style.width = `${((idx + 1) / total) * 100}%`;
  }
};

// ========================================
// PROF CONTROL — Panel del Profesor
// ========================================
const ProfControl = {
  currentClass: null,
  currentSlide: 0,
  selectedTimer: 20,
  activityActive: false,

  async init() {
    await Sync.initSession();
    this.renderClassList();
    Sync.listenStudents(students => this.updateStudentList(students));
    Sync.listenResponses(responses => this.updateResponsesView(responses));
    document.getElementById('prof-session-info').textContent = '🟢 Sesión activa';
  },

  renderClassList() {
    const list = document.getElementById('prof-class-list');
    list.innerHTML = COURSE_DATA.classes.map(c => `
      <div class="prof-class-card" onclick="ProfControl.selectClass(${c.id})">
        <span class="prof-class-icon">${c.icon}</span>
        <div>
          <div class="prof-class-num">${c.num}</div>
          <div class="prof-class-title">${c.title}</div>
        </div>
        <span class="prof-class-arrow">→</span>
      </div>
    `).join('');
    document.getElementById('prof-class-selector').style.display = 'block';
    document.getElementById('prof-lesson-panel').style.display = 'none';
  },

  async selectClass(id) {
    this.currentClass = COURSE_DATA.classes.find(c => c.id === id);
    if (!this.currentClass) return;
    this.currentSlide = 0;
    await Sync.updateSession({ classId: id, slideIndex: 0, mode: 'content' });
    document.getElementById('prof-class-selector').style.display = 'none';
    document.getElementById('prof-lesson-panel').style.display = 'block';
    document.getElementById('prof-current-class-info').innerHTML =
      `${this.currentClass.icon} <strong>${this.currentClass.title}</strong>`;
    this.renderProfSlide();
  },

  renderProfSlide() {
    const profSlides = this.currentClass.professorSlides;
    const studSlides = this.currentClass.studentSlides;
    const total = profSlides.length;
    const idx = this.currentSlide;

    document.getElementById('prof-slide-info').textContent = `${idx + 1} / ${total}`;
    document.getElementById('prof-btn-prev').disabled = idx === 0;
    document.getElementById('prof-btn-next').disabled = idx === total - 1;

    // Guía del profesor
    const profSlide = profSlides[idx];
    document.getElementById('prof-guide-content').innerHTML = profSlide ? profSlide.html : '';

    // Verificar si el slide de estudiante correspondiente es ejercicio
    const studSlide = studSlides[idx];
    const actLauncher = document.getElementById('prof-activity-launcher');
    if (studSlide && studSlide.type === 'exercise') {
      actLauncher.style.display = 'block';
      document.getElementById('prof-activity-preview').textContent = studSlide.question;
      // Reset buttons
      document.getElementById('btn-launch-activity').style.display = 'block';
      document.getElementById('btn-close-activity').style.display = 'none';
      this.activityActive = false;
    } else {
      actLauncher.style.display = 'none';
    }
  },

  async nextSlide() {
    if (!this.currentClass) return;
    const total = this.currentClass.professorSlides.length;
    if (this.currentSlide < total - 1) {
      this.currentSlide++;
      await Sync.updateSession({ slideIndex: this.currentSlide, mode: 'content' });
      this.renderProfSlide();
    }
  },

  async prevSlide() {
    if (this.currentSlide > 0) {
      this.currentSlide--;
      await Sync.updateSession({ slideIndex: this.currentSlide, mode: 'content' });
      this.renderProfSlide();
    }
  },

  setTimer(secs, btn) {
    this.selectedTimer = secs;
    document.querySelectorAll('.timer-preset').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  },

  async launchActivity() {
    if (!this.currentClass) return;
    const slide = this.currentClass.studentSlides[this.currentSlide];
    if (!slide || slide.type !== 'exercise') return;

    const activityData = {
      type: slide.exerciseType,
      question: slide.question,
      options: slide.options || null,
      correctIndex: slide.correctIndex !== undefined ? slide.correctIndex : null,
      correctOrder: slide.correctOrder || null,
      correctAnswer: slide.correctAnswer || null,
      points: slide.points || 10,
      slideIdx: this.currentSlide,
      classId: this.currentClass.id
    };

    await Sync.launchActivity(activityData, this.selectedTimer);
    this.activityActive = true;
    document.getElementById('btn-launch-activity').style.display = 'none';
    document.getElementById('btn-close-activity').style.display = 'block';
  },

  async closeActivity() {
    await Sync.closeActivity();
    this.activityActive = false;
    document.getElementById('btn-launch-activity').style.display = 'block';
    document.getElementById('btn-close-activity').style.display = 'none';
    
    // F3: Make results permanent until professor continues
    const btnContinue = document.getElementById('btn-continue-class');
    if (btnContinue) btnContinue.style.display = 'block';
  },

  async continueAfterResults() {
    const btnContinue = document.getElementById('btn-continue-class');
    if (btnContinue) btnContinue.style.display = 'none';
    await Sync.updateSession({ mode: 'content', slideIndex: this.currentSlide });
  },

  // F4: Silla Caliente
  async launchHotSeat() {
    const students = await Sync.getStudents();
    const list = Object.values(students).filter(s => s.online);
    if (list.length === 0) return alert('No hay estudiantes en línea');
    
    const randomStudent = list[Math.floor(Math.random() * list.length)];
    const slide = this.currentClass.studentSlides[this.currentSlide];
    const question = slide && slide.type === 'exercise' ? slide.question : "Pregunta sorpresa de atención.";
    
    await Sync.launchHotSeat(randomStudent.key, question);
    this.activityActive = true;
    document.getElementById('btn-hot-seat').style.display = 'none';
    document.getElementById('btn-close-hot-seat').style.display = 'block';
  },

  async closeHotSeat() {
    await Sync.closeHotSeat();
    this.activityActive = false;
    document.getElementById('btn-hot-seat').style.display = 'block';
    document.getElementById('btn-close-hot-seat').style.display = 'none';
  },

  updateStudentList(students) {
    const list = Object.values(students).filter(s => s.online);
    document.getElementById('prof-student-count-badge').textContent = list.length;
    document.getElementById('prof-student-list').innerHTML = list.map(s =>
      `<div class="prof-student-item">
        <span class="prof-student-dot online"></span>
        <span class="prof-student-name">${s.name}</span>
        <span class="prof-student-score">⭐ ${s.score || 0}</span>
      </div>`
    ).join('') || '<div class="prof-no-students">Esperando estudiantes...</div>';
  },

  updateResponsesView(responses) {
    // Could add a mini response view in prof panel if needed
  },

  backToClasses() {
    this.currentClass = null;
    this.currentSlide = 0;
    Sync.updateSession({ classId: null, mode: 'waiting' });
    this.renderClassList();
  },

  async confirmReset() {
    if (confirm('¿Resetear la sesión? Todos los estudiantes serán desconectados.')) {
      await Sync.resetSession();
      App.goSplash();
    }
  }
};

// ========================================
// STUDENT LIVE — Vista del estudiante
// ========================================
const StudentLive = {
  name: '',
  key: '',
  answered: false,
  timerInterval: null,

  init(name, key) {
    this.name = name;
    this.key = key;
    this.answered = false;
    document.getElementById('student-name-badge').textContent = `🎓 ${name.split(' ')[0]}`;
    document.getElementById('student-score-badge').textContent = '⭐ 0 pts';

    Sync.listenSession(session => {
      if (!this.hotSeatActive) this.handleSession(session);
      this.lastSession = session;
    });
    Sync.listenActivity(activity => this.handleActivity(activity));
    Sync.listenHotSeat(hotSeat => this.handleHotSeat(hotSeat));
  },

  handleHotSeat(hotSeat) {
    if (!hotSeat || !hotSeat.active) {
      if (this.hotSeatActive) {
        this.hotSeatActive = false;
        this.answered = false;
        if (this.lastSession) this.handleSession(this.lastSession);
      }
      return;
    }
    
    this.hotSeatActive = true;
    if (hotSeat.studentKey === this.key) {
      this.answered = false; // FIX: reset so a prior activity answer doesn't block submission
      // Play sound
      try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = ctx.createOscillator();
        osc.connect(ctx.destination);
        osc.frequency.setValueAtTime(880, ctx.currentTime);
        osc.start();
        osc.stop(ctx.currentTime + 0.3);
      } catch(e) {}

      this.showState('sl-activity');
      document.querySelector('#sl-activity .sl-activity-badge').innerHTML = `🔥 SILLA CALIENTE`;
      document.querySelector('#sl-activity .sl-activity-badge').style.background = '#ff6d00';
      document.getElementById('sl-question').textContent = "¡Te toca a ti! " + hotSeat.question;
      document.getElementById('sl-options').innerHTML = '';
      document.getElementById('sl-answered-msg').style.display = 'none'; // FIX: hide any previous answer feedback
      document.getElementById('sl-text-area').style.display = 'block';
      document.getElementById('sl-text-input').value = '';
      document.getElementById('sl-timer-display').textContent = '∞';
      document.getElementById('sl-timer-display').style.color = '#ff6d00';
    } else {
      this.showState('sl-listening');
      document.getElementById('sl-topic').textContent = `🔥 Silla Caliente activa`;
      document.querySelector('.sl-instruction').textContent = `Esperando respuesta de otro estudiante...`;
    }
  },

  handleSession(session) {
    if (!session || !session.active) {
      this.showState('sl-waiting');
      document.getElementById('sl-waiting-msg').textContent = 'Sesión no iniciada...';
      return;
    }

    switch (session.mode) {
      case 'waiting':
        this.showState('sl-waiting');
        document.getElementById('sl-waiting-msg').textContent = 'Esperando que el profesor inicie la clase...';
        break;
      case 'content':
        this.answered = false;
        this.showState('sl-listening');
        if (session.classId !== null) {
          const cls = COURSE_DATA.classes.find(c => c.id === session.classId);
          if (cls) {
            const slide = cls.studentSlides[session.slideIndex || 0];
            document.getElementById('sl-topic').textContent = cls.title;
          }
        }
        break;
      case 'activity':
        // Handled by listenActivity
        break;
      case 'results':
        clearInterval(this.timerInterval);
        this.showResultsState();
        break;
    }
  },

  handleActivity(activity) {
    if (!activity || !activity.active) return;
    if (this.answered) return;

    this.showState('sl-activity');
    document.getElementById('sl-question').textContent = activity.question;
    document.getElementById('sl-answered-msg').style.display = 'none';

    if (activity.type === 'multiple' && activity.options) {
      document.getElementById('sl-text-area').style.display = 'none';
      document.getElementById('sl-options').innerHTML = activity.options.map((opt, i) =>
        `<button class="sl-option-btn" onclick="StudentLive.submitMultiple(${i})">
          <span class="sl-opt-letter">${String.fromCharCode(65+i)}</span>
          <span class="sl-opt-text">${opt}</span>
        </button>`
      ).join('');
    } else {
      document.getElementById('sl-options').innerHTML = '';
      document.getElementById('sl-text-area').style.display = 'block';
      document.getElementById('sl-text-input').value = '';
    }

    this.startStudentTimer(activity.timerEnd);
  },

  startStudentTimer(timerEnd) {
    clearInterval(this.timerInterval);
    const el = document.getElementById('sl-timer-display');

    const update = () => {
      const remaining = Math.max(0, timerEnd - Sync.getServerNow());
      const secs = Math.ceil(remaining / 1000);
      el.textContent = secs;

      if (secs <= 5) el.style.color = '#ff1744';
      else if (secs <= 15) el.style.color = '#ffd600';
      else el.style.color = '#00c853';

      if (remaining <= 0) {
        clearInterval(this.timerInterval);
        el.textContent = '⏰';
        if (!this.answered) {
          document.getElementById('sl-options').innerHTML = '';
          document.getElementById('sl-text-area').style.display = 'none';
          document.getElementById('sl-answered-msg').style.display = 'block';
          document.getElementById('sl-answered-msg').textContent = '⏰ Tiempo agotado';
        }
      }
    };

    update();
    this.timerInterval = setInterval(update, 250);
  },

  async submitMultiple(optionIdx) {
    if (this.answered) return;
    const activity = await Sync.getActivity();
    if (!activity || !activity.active) return;

    this.answered = true;
    const score = optionIdx === activity.correctIndex ? (activity.points || 10) : 0;

    await Sync.submitResponse(this.key, this.name, {
      answer: optionIdx,
      score,
      type: 'multiple'
    });

    if (score > 0) {
      await Sync.addScore(this.key, score);
    }

    // Show feedback immediately
    document.querySelectorAll('.sl-option-btn').forEach((btn, i) => {
      btn.disabled = true;
      if (i === activity.correctIndex) btn.classList.add('sl-opt-correct');
      else if (i === optionIdx && optionIdx !== activity.correctIndex) btn.classList.add('sl-opt-wrong');
    });

    document.getElementById('sl-answered-msg').style.display = 'block';
    document.getElementById('sl-answered-msg').textContent =
      score > 0 ? `✅ ¡Correcto! +${score} puntos` : '❌ Incorrecto — ¡a repasar!';
    document.getElementById('sl-answered-msg').className =
      `sl-answered-msg ${score > 0 ? 'sl-correct' : 'sl-wrong'}`;

    // Update badge
    const snap = await Sync.getStudents();
    if (snap[this.key]) {
      document.getElementById('student-score-badge').textContent = `⭐ ${snap[this.key].score} pts`;
    }
  },

  async submitText() {
    if (this.answered) return;
    const text = document.getElementById('sl-text-input').value.trim();
    if (!text || text.length < 3) return;

    this.answered = true;

    // FIX-2: In hot-seat mode there is no active "activity" in Firebase, so we
    // submit directly without requiring one. For normal text activities we still
    // use the activity points for scoring.
    const activity = await Sync.getActivity();
    const score = activity
      ? (text.length >= 10 ? Math.round((activity.points || 10) * 0.5) : 0)
      : 0; // hot-seat: teacher evaluates verbally, no automatic score

    await Sync.submitResponse(this.key, this.name, {
      answer: text,
      score,
      type: 'text'
    });

    if (score > 0) await Sync.addScore(this.key, score);

    document.getElementById('sl-text-area').style.display = 'none';
    document.getElementById('sl-answered-msg').style.display = 'block';
    document.getElementById('sl-answered-msg').textContent = this.hotSeatActive
      ? '✅ Respuesta enviada. El profesor la leerá en voz alta.'
      : '✅ Respuesta enviada. El profesor la revisará.';
    document.getElementById('sl-answered-msg').className = 'sl-answered-msg sl-sent';
  },

  async showResultsState() {
    this.showState('sl-results');
    const students = await Sync.getStudents();
    const me = students[this.key];
    const score = me ? (me.score || 0) : 0;

    document.getElementById('student-score-badge').textContent = `⭐ ${score} pts`;
    document.getElementById('sl-results-content').innerHTML = `
      <div class="sl-result-icon">${score > 0 ? '🌟' : '📚'}</div>
      <h3 class="sl-result-title">${score > 0 ? '¡Bien hecho!' : 'Sigue practicando'}</h3>
      <div class="sl-result-score">${score} puntos acumulados</div>
      <p class="sl-result-msg">${score > 0
        ? 'Vas por buen camino. Sigue atento a la clase.'
        : 'No te preocupes, repasa el tema y lo dominarás.'}</p>
      <div class="sl-waiting-next">⏳ Esperando siguiente actividad...</div>
    `;
  },

  showState(id) {
    ['sl-waiting', 'sl-listening', 'sl-activity', 'sl-results'].forEach(s => {
      const el = document.getElementById(s);
      if (el) el.style.display = s === id ? 'flex' : 'none';
    });
  }
};

// ========================================
// INIT — Keyboard events
// ========================================
document.addEventListener('DOMContentLoaded', () => {
  // Bug 1: Reconexión
  const savedName = localStorage.getItem('omt_student_name');
  const savedKey = localStorage.getItem('omt_student_key');
  
  if (savedName && savedKey) {
    Sync.initOffset();
    Sync.listenSession(session => {
      if (session && session.active) {
        const banner = document.getElementById('reconnect-banner');
        if (banner && banner.style.display !== 'none') {
          banner.style.display = 'flex';
          banner.innerHTML = `
            <div class="reconnect-box">
              <p>Clase en curso detectada.</p>
              <p><strong>¿Deseas continuar como ${savedName.split(' ')[0]}?</strong></p>
              <button class="btn btn-primary" style="margin-bottom:8px;" onclick="App.reconnect('${savedName}', '${savedKey}')">▶ Continuar Clase</button>
              <button class="btn btn-secondary" onclick="App.clearSession()">No, soy otro estudiante</button>
            </div>
          `;
        }
      }
    });
  }

  document.getElementById('student-name').addEventListener('keyup', e => {
    if (e.key === 'Enter') App.studentJoinClass();
  });
  document.getElementById('professor-pass').addEventListener('keyup', e => {
    if (e.key === 'Enter') App.professorEnter();
  });
});

// Expose globals for onclick handlers
window.App = App;
window.ProfControl = ProfControl;
window.StudentLive = StudentLive;
