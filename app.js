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

// ---- BUG-3 FIX: Mapeo profesor→estudiante ----
// Dado un índice de studentSlides, encuentra el professorSlide correspondiente
function getProfGuideForStudentSlide(cls, studentSlideIdx) {
  if (!cls || !cls.professorSlides) return null;
  for (let i = cls.professorSlides.length - 1; i >= 0; i--) {
    if (studentSlideIdx >= (cls.professorSlides[i].studentSlideStart || 0)) {
      return cls.professorSlides[i];
    }
  }
  return cls.professorSlides[0];
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
    try {
      await Sync.registerStudent(name);
    } catch(e) {}
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
  hotSeatActive: false,

  init() {
    Sync.initOffset();
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
        // Clean up any hot seat indicator
        const indicator = document.getElementById('proj-hotseat-student');
        if (indicator) indicator.remove();
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
    
    // BUG-4 FIX: Show options if it's a multiple choice hot seat
    if (hotSeat.options && hotSeat.options.length > 0) {
      optionsEl.innerHTML = hotSeat.options.map((opt, i) =>
        `<div class="proj-option" id="proj-opt-${i}"><span class="proj-opt-letter">${String.fromCharCode(65+i)}</span>${opt}</div>`
      ).join('');
    } else {
      optionsEl.innerHTML = `
        <div class="proj-hot-seat-roulette">
          <div class="roulette-lbl">Seleccionado:</div>
          <div class="roulette-name animated-name">Buscando...</div>
        </div>
      `;
    }
    
    // Show selected student after animation
    setTimeout(async () => {
      const students = await Sync.getStudents();
      const s = students[hotSeat.studentKey];
      if (s) {
        if (!hotSeat.options) {
          const nameEl = document.querySelector('.roulette-name');
          if (nameEl) {
            nameEl.textContent = s.name;
            nameEl.style.color = '#ff6d00';
          }
        }
        // Show student name indicator
        const existingIndicator = document.getElementById('proj-hotseat-student');
        if (!existingIndicator) {
          const indicator = document.createElement('div');
          indicator.id = 'proj-hotseat-student';
          indicator.style.cssText = 'text-align:center; font-size:1.5rem; color:#ff6d00; margin-top:10px; font-weight:700;';
          indicator.textContent = `🎯 ${s.name}`;
          optionsEl.parentElement.appendChild(indicator);
        } else {
          existingIndicator.textContent = `🎯 ${s.name}`;
        }
      }
    }, 1500);
    
    // Show response when student answers
    const responseDiv = document.getElementById('proj-responses-live');
    if (hotSeat.response) {
      responseDiv.innerHTML = `<div class="proj-responses-header">✅ ¡Respuesta recibida!</div>
        <div class="proj-response-chips">
          <div class="proj-response-chip chip-correct">📝 ${hotSeat.response}</div>
        </div>`;
    } else {
      responseDiv.innerHTML = `<div class="proj-responses-header">⏳ Esperando respuesta...</div>`;
    }
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
        // BUG-3 FIX: use studentSlideIndex from session
        const slideIdx = session.studentSlideIndex !== undefined ? session.studentSlideIndex : (session.slideIndex || 0);
        this.currentSlide = slideIdx;
        document.getElementById('proj-class-info').textContent = `${cls.icon} ${cls.title}`;
        this.updateProgress(slideIdx, cls.studentSlides.length);
      }
    }

    switch (session.mode) {
      case 'waiting':
        this.showWaiting('Esperando inicio de clase...');
        break;
      case 'content': {
        // BUG-3 FIX: use studentSlideIndex
        const slideIdx = session.studentSlideIndex !== undefined ? session.studentSlideIndex : (session.slideIndex || 0);
        this.showContent(slideIdx);
        break;
      }
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
      container.innerHTML = `<div class="proj-exercise-preview">
        <div class="proj-exercise-badge">⚡ PREPARANDO ACTIVIDAD</div>
        <div class="proj-exercise-q">${slide.question}</div>
        <div class="proj-exercise-hint">Atentos... el profesor lanzará las opciones en breve.</div>
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
    if (this.hotSeatActive) return; // Don't overwrite hot seat response display
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

    // BUG-2 FIX: Stars — 0 stars for 0 score (removed Math.max(1,...))
    const maxScore = Math.max(...studentList.map(s => s.score || 0), 1);
    const barHtml = `
      <div class="res-bars-section">
        <div class="res-bars-title">📊 Puntaje acumulado de la sesión</div>
        <div class="res-bars-grid">
          ${studentList.sort((a,b) => (b.score||0)-(a.score||0)).map((s, i) => {
            const scorePct = Math.round(((s.score || 0) / maxScore) * 100);
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

    // Student expandable cards — BUG-2 FIX: proper stars
    const cardsHtml = `
      <div class="res-cards-section">
        <div class="res-cards-title">👥 Detalle por estudiante — toca para ver su respuesta</div>
        <div class="res-cards-grid" id="res-cards-grid">
          ${studentList.map((s, i) => {
            const r = responses[s.key];
            const isCorrect = r && r.score > 0;
            // BUG-2 FIX: 0 score = 0 stars. No minimum of 1.
            const starCount = (s.score || 0) === 0 ? 0 : Math.min(5, Math.round((s.score||0) / maxScore * 5));
            const stars = '⭐'.repeat(starCount) + '☆'.repeat(5 - starCount);

            let answerDetail = '';
            if (!r) {
              answerDetail = `<div class="res-card-no-answer">⏰ No respondió a tiempo</div>`;
            } else if (activity.type === 'multiple' && activity.options) {
              const studentAnswer = activity.options[r.answer];
              const correctAnswer = activity.options[activity.correctIndex];
              answerDetail = `
                <div class="res-card-answer ${isCorrect ? 'answer-correct' : 'answer-wrong'}">
                  <div class="res-card-answer-label">Su respuesta:</div>
                  <div class="res-card-answer-text">${String.fromCharCode(65 + r.answer)}. ${studentAnswer}</div>
                  ${!isCorrect ? `<div class="res-card-correct-show">✅ Correcta: ${String.fromCharCode(65 + activity.correctIndex)}. ${correctAnswer}</div>` : ''}
                </div>`;
            } else if (r.type === 'text') {
              answerDetail = `
                <div class="res-card-answer ${isCorrect ? 'answer-correct' : 'answer-wrong'}">
                  <div class="res-card-answer-label">Su respuesta:</div>
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
  currentSlide: 0, // BUG-3 FIX: Now indexes into studentSlides
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
    this.currentSlide = 0; // BUG-3 FIX: index into studentSlides
    // BUG-3 FIX: Send both slideIndex and studentSlideIndex
    await Sync.updateSession({ classId: id, slideIndex: 0, studentSlideIndex: 0, mode: 'content' });
    document.getElementById('prof-class-selector').style.display = 'none';
    document.getElementById('prof-lesson-panel').style.display = 'block';
    document.getElementById('prof-current-class-info').innerHTML =
      `${this.currentClass.icon} <strong>${this.currentClass.title}</strong>`;
    this.renderProfSlide();
  },

  // BUG-3 FIX: Professor now navigates studentSlides and sees matching professor guide
  renderProfSlide() {
    const studSlides = this.currentClass.studentSlides;
    const total = studSlides.length;
    const idx = this.currentSlide;

    document.getElementById('prof-slide-info').textContent = `${idx + 1} / ${total}`;
    document.getElementById('prof-btn-prev').disabled = idx === 0;
    document.getElementById('prof-btn-next').disabled = idx === total - 1;

    const actLauncher = document.getElementById('prof-activity-launcher');
    const guideCard = document.getElementById('prof-guide-card');
    const studSlide = studSlides[idx];

    if (studSlide && studSlide.type === 'exercise') {
      guideCard.style.display = 'none';
      actLauncher.style.display = 'flex';
      document.querySelector('.prof-activity-title').textContent = `⚡ EXAMEN DE APRENDIZAJE #${idx + 1}`;
      document.getElementById('prof-activity-preview').innerHTML = `<strong>${studSlide.question}</strong><br><br><span style="font-size:12px;color:#ff6d00;">Instrucciones: Responde solo tocando la respuesta correcta, si tocas otra se autoseleccionará y no podrás volver a responder.</span>`;
      
      document.getElementById('btn-launch-activity').style.display = 'block';
      document.getElementById('btn-close-activity').style.display = 'none';
      document.getElementById('btn-hot-seat').style.display = 'block';
      document.getElementById('btn-close-hot-seat').style.display = 'none';
      this.activityActive = false;
    } else {
      guideCard.style.display = 'block';
      const profGuide = getProfGuideForStudentSlide(this.currentClass, idx);
      document.getElementById('prof-guide-content').innerHTML = profGuide ? profGuide.html : '<p>Continúa la explicación...</p>';
      actLauncher.style.display = 'none';
    }
  },

  // BUG-3 FIX: Navigate studentSlides
  async nextSlide() {
    if (!this.currentClass) return;
    const total = this.currentClass.studentSlides.length;
    if (this.currentSlide < total - 1) {
      if (this.activityActive) await this.closeActivity();
      this.currentSlide++;
      // Send studentSlideIndex for projector/students
      await Sync.updateSession({ slideIndex: this.currentSlide, studentSlideIndex: this.currentSlide, mode: 'content' });
      this.renderProfSlide();
    }
  },

  async prevSlide() {
    if (this.currentSlide > 0) {
      if (this.activityActive) await this.closeActivity();
      this.currentSlide--;
      await Sync.updateSession({ slideIndex: this.currentSlide, studentSlideIndex: this.currentSlide, mode: 'content' });
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
    document.getElementById('btn-hot-seat').style.display = 'none';
    document.getElementById('prof-responses-panel').style.display = 'block';
    document.getElementById('prof-resp-list').innerHTML = '';
    document.getElementById('prof-resp-summary').textContent = 'Esperando respuestas...';
  },

  async closeActivity() {
    await Sync.closeActivity();
    this.activityActive = false;
    document.getElementById('btn-launch-activity').style.display = 'block';
    document.getElementById('btn-close-activity').style.display = 'none';
    document.getElementById('btn-hot-seat').style.display = 'block';
    document.getElementById('prof-responses-panel').style.display = 'none';
    
    // F3: Make results permanent until professor continues
    const btnContinue = document.getElementById('btn-continue-class');
    if (btnContinue) btnContinue.style.display = 'block';
  },

  async continueAfterResults() {
    const btnContinue = document.getElementById('btn-continue-class');
    if (btnContinue) btnContinue.style.display = 'none';
    await Sync.updateSession({ mode: 'content', slideIndex: this.currentSlide, studentSlideIndex: this.currentSlide });
  },

  // BUG-4 FIX: Silla Caliente — pass full question data
  async launchHotSeat() {
    const students = await Sync.getStudents();
    const list = Object.values(students).filter(s => s.online);
    if (list.length === 0) return alert('No hay estudiantes en línea');
    
    const randomStudent = list[Math.floor(Math.random() * list.length)];
    const slide = this.currentClass.studentSlides[this.currentSlide];
    
    let question, options, correctIndex;
    if (slide && slide.type === 'exercise') {
      question = slide.question;
      if (slide.exerciseType === 'multiple' && slide.options) {
        options = slide.options;
        correctIndex = slide.correctIndex;
      }
    } else {
      question = "Pregunta sorpresa de atención: ¿Qué hemos aprendido hasta ahora?";
    }
    
    await Sync.launchHotSeat(randomStudent.key, question, options || null, correctIndex);
    this.activityActive = true;
    document.getElementById('btn-hot-seat').style.display = 'none';
    document.getElementById('btn-close-hot-seat').style.display = 'block';
    document.getElementById('btn-launch-activity').style.display = 'none';
  },

  async closeHotSeat() {
    await Sync.closeHotSeat();
    this.activityActive = false;
    document.getElementById('btn-hot-seat').style.display = 'block';
    document.getElementById('btn-close-hot-seat').style.display = 'none';
    document.getElementById('btn-launch-activity').style.display = 'block';
  },

  updateStudentList(students) {
    const list = Object.values(students).filter(s => s.online);
    document.getElementById('prof-student-count-badge').textContent = list.length;
    document.getElementById('prof-student-list').innerHTML = list.map(s =>
      `<div class="prof-student-item">
        <span class="prof-student-dot online"></span>
        <span class="prof-student-name">${s.name}</span>
        <span class="prof-student-score">⭐ ${s.score || 0}</span>
        <div class="prof-student-actions">
          <button class="btn-prof-action" onclick="ProfControl.unbugStudent('${s.key}')" title="Desbugear">🔄</button>
          <button class="btn-prof-action btn-prof-kick" onclick="ProfControl.kickStudent('${s.key}')" title="Expulsar">❌</button>
        </div>
      </div>`
    ).join('') || '<div class="prof-no-students">Esperando estudiantes...</div>';
  },

  async kickStudent(key) {
    if(confirm('¿Expulsar a este estudiante? No podrá volver a entrar a esta sesión.')) {
        await Sync.kickStudent(key);
    }
  },

  async unbugStudent(key) {
    if(confirm('¿Permitir que este estudiante vuelva a responder la actividad actual?')) {
        await Sync.unbugStudent(key);
    }
  },

  updateResponsesView(responses) {
    const panel = document.getElementById('prof-responses-panel');
    if (!panel || panel.style.display === 'none') return;

    const summaryEl = document.getElementById('prof-resp-summary');
    const listEl = document.getElementById('prof-resp-list');
    const count = Object.keys(responses).length;

    // Get current activity to look up correct answer
    Sync.getActivity().then(activity => {
      const items = Object.values(responses);
      if (count === 0) {
        summaryEl.textContent = 'Esperando respuestas...';
        listEl.innerHTML = '';
        return;
      }

      const correctCount = items.filter(r => r.score > 0).length;
      summaryEl.innerHTML = `<span style="color:var(--green)">${correctCount} correctas</span> · <span style="color:var(--red)">${count - correctCount} incorrectas</span> · ${count} total`;

      listEl.innerHTML = items.map(r => {
        const isCorrect = r.score > 0;
        let answerText = r.answer;
        if (activity && activity.type === 'multiple' && activity.options && typeof r.answer === 'number') {
          answerText = `${String.fromCharCode(65 + r.answer)}. ${activity.options[r.answer]}`;
        }
        return `<div class="prof-resp-item ${isCorrect ? 'prof-resp-correct' : 'prof-resp-wrong'}">
          <span class="prof-resp-icon">${isCorrect ? '\u2705' : '\u274c'}</span>
          <div class="prof-resp-info">
            <div class="prof-resp-name">${r.studentName.split(' ')[0]}</div>
            <div class="prof-resp-answer">${answerText}</div>
          </div>
          <span class="prof-resp-pts">${r.score > 0 ? '+' + r.score : '0'} pts</span>
        </div>`;
      }).join('');
    });
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
  hotSeatActive: false,
  lastSession: null,

  init(name, key) {
    this.name = name;
    this.key = key;
    this.answered = false;
    this.hotSeatActive = false;
    document.getElementById('student-name-badge').textContent = `🎓 ${name.split(' ')[0]}`;
    document.getElementById('student-score-badge').textContent = '⭐ 0 pts';

    Sync.listenSession(session => {
      if (!this.hotSeatActive) this.handleSession(session);
      this.lastSession = session;
    });
    Sync.listenActivity(activity => this.handleActivity(activity));
    Sync.listenHotSeat(hotSeat => this.handleHotSeat(hotSeat));
    
    Sync.listenKicked(key, isKicked => {
      if (isKicked) {
        App.clearSession();
        alert('Tu sesión anterior fue cerrada para limpiar duplicados. Puedes volver a ingresar tu nombre para reconectarte.');
        App.goSplash();
      }
    });

    Sync.listenResponses(responses => {
      if (this.answered && !responses[this.key] && !this.hotSeatActive) {
        // Response was deleted by professor (unbug)
        this.answered = false;
        Sync.getActivity().then(activity => {
            if(activity && activity.active) this.handleActivity(activity);
        });
      }
    });
  },

  // BUG-4 FIX: Complete rewrite of hot seat handler
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
    this.answered = false; // BUG-4 FIX: Always reset answered for hot seat
    
    if (hotSeat.studentKey === this.key) {
      // This student is selected!
      // Play alert sound
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
      document.getElementById('sl-answered-msg').style.display = 'none';
      document.getElementById('sl-timer-display').textContent = '∞';
      document.getElementById('sl-timer-display').style.color = '#ff6d00';
      
      // BUG-4 FIX: Show multiple choice options if available
      if (hotSeat.options && hotSeat.options.length > 0) {
        document.getElementById('sl-text-area').style.display = 'none';
        document.getElementById('sl-options').innerHTML = hotSeat.options.map((opt, i) =>
          `<button class="sl-option-btn" onclick="StudentLive.submitHotSeatMultiple(${i})">
            <span class="sl-opt-letter">${String.fromCharCode(65+i)}</span>
            <span class="sl-opt-text">${opt}</span>
          </button>`
        ).join('');
      } else {
        document.getElementById('sl-options').innerHTML = '';
        document.getElementById('sl-text-area').style.display = 'block';
        document.getElementById('sl-text-input').value = '';
      }
    } else {
      // Another student is on the hot seat
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
            // BUG-3 FIX: use studentSlideIndex
            const slideIdx = session.studentSlideIndex !== undefined ? session.studentSlideIndex : (session.slideIndex || 0);
            const slide = cls.studentSlides[slideIdx];
            document.getElementById('sl-topic').textContent = cls.title;
            const instructionEl = document.querySelector('.sl-instruction');
            if (slide && slide.type === 'info') {
              const summaryHtml = StudentLive.generateSummary(slide.html, this.key);
              instructionEl.innerHTML = `
                <div class="sl-summary-game">
                  <div class="sl-summary-text blur-effect" id="sl-summary-text">${summaryHtml}</div>
                  <button class="btn-hold-focus" id="btn-hold-focus">👆 Mantén presionado para leer tus apuntes</button>
                </div>
              `;
              StudentLive.setupFocusMinigame();
            } else if (slide && slide.type === 'exercise') {
              instructionEl.textContent = 'El profesor lanzará una actividad pronto...';
            }
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
    if (this.hotSeatActive) return;
    if (!activity || !activity.active) return;
    if (this.answered) return;
    
    // Check if the activity is meant for the current slide to avoid old stuck activities
    if (this.lastSession && this.lastSession.mode === 'content') {
        const currentIdx = this.lastSession.studentSlideIndex !== undefined ? this.lastSession.studentSlideIndex : this.lastSession.slideIndex;
        if (activity.slideIdx !== currentIdx) return;
    }

    this.showState('sl-activity');
    document.querySelector('#sl-activity .sl-activity-badge').innerHTML = `⚡ ¡RESPONDE AHORA!`;
    document.querySelector('#sl-activity .sl-activity-badge').style.background = 'var(--accent, #6c5ce7)';
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

  // BUG-4 FIX: Hot seat multiple choice submission
  async submitHotSeatMultiple(optionIdx) {
    if (this.answered) return;
    this.answered = true;

    // Get current hot seat data
    const hotSeatSnap = await new Promise((resolve) => {
      const unsub = Sync.listenHotSeat(data => {
        resolve(data);
        // Note: listener stays registered but that's OK, it will be cleaned on next init
      });
    });
    
    // Submit response to hotSeat node
    const answerText = hotSeatSnap && hotSeatSnap.options 
      ? `${String.fromCharCode(65 + optionIdx)}. ${hotSeatSnap.options[optionIdx]}`
      : `Opción ${String.fromCharCode(65 + optionIdx)}`;
    await Sync.submitHotSeatResponse(answerText);
    
    // Check correctness and award points
    const isCorrect = hotSeatSnap && hotSeatSnap.correctIndex === optionIdx;
    if (isCorrect) {
      await Sync.addScore(this.key, 15); // Hot seat bonus points
    }

    // Show feedback
    document.querySelectorAll('.sl-option-btn').forEach((btn, i) => {
      btn.disabled = true;
      if (hotSeatSnap && i === hotSeatSnap.correctIndex) btn.classList.add('sl-opt-correct');
      else if (i === optionIdx && !isCorrect) btn.classList.add('sl-opt-wrong');
    });

    document.getElementById('sl-answered-msg').style.display = 'block';
    document.getElementById('sl-answered-msg').textContent = isCorrect
      ? '✅ ¡Correcto! +15 puntos (Silla Caliente)'
      : '❌ Incorrecto — ¡a repasar!';
    document.getElementById('sl-answered-msg').className =
      `sl-answered-msg ${isCorrect ? 'sl-correct' : 'sl-wrong'}`;

    // Update badge
    const snap = await Sync.getStudents();
    if (snap[this.key]) {
      document.getElementById('student-score-badge').textContent = `⭐ ${snap[this.key].score} pts`;
    }
  },

  // BUG-2 & BUG-4 FIX: Text submissions
  async submitText() {
    if (this.answered) return;
    const text = document.getElementById('sl-text-input').value.trim();
    if (!text || text.length < 3) return;

    this.answered = true;

    if (this.hotSeatActive) {
      // BUG-4 FIX: Hot seat text submission — submit to hotSeat node, no auto-scoring
      await Sync.submitHotSeatResponse(text);
      document.getElementById('sl-text-area').style.display = 'none';
      document.getElementById('sl-answered-msg').style.display = 'block';
      document.getElementById('sl-answered-msg').textContent = '✅ Respuesta enviada. El profesor la leerá en voz alta.';
      document.getElementById('sl-answered-msg').className = 'sl-answered-msg sl-sent';
    } else {
      // BUG-2 FIX: Normal text activity — score is 0 (teacher evaluates manually)
      // No auto-scoring based on text length
      await Sync.submitResponse(this.key, this.name, {
        answer: text,
        score: 0, // BUG-2 FIX: No auto-points for text, teacher reviews verbally
        type: 'text'
      });
      document.getElementById('sl-text-area').style.display = 'none';
      document.getElementById('sl-answered-msg').style.display = 'block';
      document.getElementById('sl-answered-msg').textContent = '✅ Respuesta enviada. El profesor la revisará.';
      document.getElementById('sl-answered-msg').className = 'sl-answered-msg sl-sent';
    }
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
  },

  generateSummary(html, key) {
    const temp = document.createElement('div');
    temp.innerHTML = html;
    const highlights = Array.from(temp.querySelectorAll('strong, .slide-highlight, li'))
      .map(el => el.textContent.trim())
      .filter(text => text.length > 5);
      
    if (highlights.length === 0) return 'Presta atención al proyector.';
    
    let hash = 0;
    for (let i = 0; i < key.length; i++) hash = key.charCodeAt(i) + ((hash << 5) - hash);
    hash = Math.abs(hash);
    
    const numPoints = Math.min(3, highlights.length);
    const selected = [];
    for(let i=0; i<numPoints; i++) {
        const idx = (hash + i) % highlights.length;
        if(!selected.includes(highlights[idx])) selected.push(highlights[idx]);
    }
    if (selected.length === 0) selected.push(highlights[0]); // fallback
    return selected.map(text => `• ${text}`).join('<br><br>');
  },

  setupFocusMinigame() {
    const btn = document.getElementById('btn-hold-focus');
    const text = document.getElementById('sl-summary-text');
    if(!btn || !text) return;
    
    const reveal = (e) => { 
        e.preventDefault(); 
        text.classList.remove('blur-effect'); 
        btn.classList.add('btn-hold-active');
        btn.textContent = '👁️ Leyendo...';
    };
    const hide = (e) => { 
        e.preventDefault(); 
        text.classList.add('blur-effect'); 
        btn.classList.remove('btn-hold-active');
        btn.textContent = '👆 Mantén presionado para leer tus apuntes';
    };
    
    btn.addEventListener('touchstart', reveal);
    btn.addEventListener('touchend', hide);
    btn.addEventListener('touchcancel', hide);
    btn.addEventListener('mousedown', reveal);
    btn.addEventListener('mouseup', hide);
    btn.addEventListener('mouseleave', hide);
  }
};

// ========================================
// INIT — Keyboard events + Session expiry check
// ========================================
document.addEventListener('DOMContentLoaded', async () => {
  // BUG-1 FIX: Check session expiry on startup (2 hours of inactivity)
  try {
    Sync.initOffset();
    const wasExpired = await Sync.cleanExpiredSession();
    if (wasExpired) {
      // Session was expired (>2 hours inactive), cleaned up
      localStorage.removeItem('omt_student_name');
      localStorage.removeItem('omt_student_key');
      console.log('[OMT] Sesión expirada limpiada automáticamente');
    }
  } catch(e) {
    console.warn('[OMT] Error verificando sesión:', e);
  }

  // BUG-5 FIX: Reconnection — only if session is active and NOT expired
  const savedName = localStorage.getItem('omt_student_name');
  const savedKey = localStorage.getItem('omt_student_key');
  
  if (savedName && savedKey) {
    Sync.listenSession(session => {
      const banner = document.getElementById('reconnect-banner');
      if (session && session.active) {
        if (banner && (banner.style.display !== 'block')) {
          banner.style.display = 'flex';
          const safeName = savedName.replace(/'/g, "\\'");
          banner.innerHTML = `
            <div class="reconnect-box">
              <p>Clase en curso detectada.</p>
              <p><strong>¿Deseas continuar como ${savedName.split(' ')[0]}?</strong></p>
              <button class="btn btn-primary" style="margin-bottom:8px;" onclick="App.reconnect('${safeName}', '${savedKey}')">▶ Continuar Clase</button>
              <button class="btn btn-secondary" onclick="App.clearSession()">No, soy otro estudiante</button>
            </div>
          `;
        }
      } else {
        // Session is not active, clear saved student data
        localStorage.removeItem('omt_student_name');
        localStorage.removeItem('omt_student_key');
        if (banner) banner.style.display = 'none';
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
window.ProjectorView = ProjectorView; // BUG FIX: Was missing, needed for toggleCard onclick
