// ============================================
// APP.JS — Lógica principal del curso OMT
// ============================================
const App = {
    role: null, // 'student' | 'professor'
    studentName: '',
    currentClass: null,
    currentSlide: 0,
    profCurrentSlide: 0,
    scores: {},
    answeredExercises: {},

    // ---- NAVIGATION ----
    showScreen(id) {
        document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
        const el = document.getElementById(id);
        if (el) el.classList.add('active');
    },
    goSplash() { this.showScreen('screen-splash'); },

    showStudentLogin() { this.showScreen('screen-student-login'); document.getElementById('student-name').focus(); },
    showProfessorLogin() { this.showScreen('screen-professor-login'); document.getElementById('professor-pass').focus(); },

    studentEnter() {
        const name = document.getElementById('student-name').value.trim();
        if (!name || name.length < 2) {
            document.getElementById('student-login-error').textContent = 'Ingresa tu nombre completo';
            return;
        }
        this.role = 'student';
        this.studentName = name;
        this.loadStudentData();
        this.showClassSelect();
    },

    professorEnter() {
        const pass = document.getElementById('professor-pass').value;
        if (pass !== '6588242') {
            document.getElementById('professor-login-error').textContent = 'Código incorrecto';
            return;
        }
        this.role = 'professor';
        this.showClassSelect();
    },

    // ---- CLASS SELECTION ----
    showClassSelect() {
        const badge = document.getElementById('user-badge');
        badge.textContent = this.role === 'student' ? `🎓 ${this.studentName}` : '👨‍🏫 Profesor';
        const grid = document.getElementById('class-grid');
        grid.innerHTML = '';
        COURSE_DATA.classes.forEach(c => {
            const progress = this.getClassProgress(c.id);
            const card = document.createElement('div');
            card.className = 'class-card';
            card.style.borderLeftColor = c.color;
            card.onclick = () => this.startClass(c.id);
            card.innerHTML = `
        <span class="class-card-icon">${c.icon}</span>
        <div class="class-card-num">${c.num}</div>
        <div class="class-card-title">${c.title}</div>
        <div class="class-card-desc">${c.desc}</div>
        ${this.role === 'student' ? `<div class="class-card-progress">
          <div class="progress-bar"><div class="progress-fill" style="width:${progress.pct}%"></div></div>
          <div class="class-card-score">⭐ ${progress.score} pts | ${progress.pct}% completado</div>
        </div>` : ''}`;
            grid.appendChild(card);
        });
        if (this.role === 'student') {
            const histBtn = document.createElement('button');
            histBtn.className = 'btn btn-nav btn-block';
            histBtn.style.marginTop = '16px';
            histBtn.innerHTML = '📊 Ver Mi Historial Completo';
            histBtn.onclick = () => this.showResults();
            grid.appendChild(histBtn);
        }
        this.showScreen('screen-class-select');
    },

    startClass(id) {
        this.currentClass = COURSE_DATA.classes.find(c => c.id === id);
        if (!this.currentClass) return;
        if (this.role === 'student') {
            this.currentSlide = 0;
            this.renderStudentSlide();
            this.showScreen('screen-lesson');
        } else {
            this.profCurrentSlide = 0;
            this.renderProfessorSlide();
            this.showScreen('screen-professor-lesson');
        }
    },

    backToClasses() { this.showClassSelect(); },

    // ---- STUDENT SLIDES ----
    renderStudentSlide() {
        const slides = this.currentClass.studentSlides;
        const total = slides.length;
        const idx = this.currentSlide;
        const slide = slides[idx];
        document.getElementById('slide-counter').textContent = `${idx + 1}/${total}`;
        document.getElementById('progress-fill').style.width = `${((idx + 1) / total) * 100}%`;
        document.getElementById('score-display').textContent = `⭐ ${this.getClassScore(this.currentClass.id)}`;
        const container = document.getElementById('slide-content');
        container.style.animation = 'none';
        container.offsetHeight; // reflow
        container.style.animation = 'slideUp 0.3s ease';

        if (slide.type === 'info') {
            container.innerHTML = slide.html;
        } else if (slide.type === 'exercise') {
            container.innerHTML = this.renderExercise(slide, idx);
        }

        document.getElementById('btn-prev').disabled = idx === 0;
        const nextBtn = document.getElementById('btn-next');
        if (idx === total - 1) {
            nextBtn.textContent = '🏁 Finalizar Clase';
            nextBtn.onclick = () => this.finishClass();
        } else {
            nextBtn.textContent = 'Siguiente →';
            nextBtn.onclick = () => this.nextSlide();
        }
    },

    nextSlide() {
        if (this.currentSlide < this.currentClass.studentSlides.length - 1) {
            this.currentSlide++;
            this.renderStudentSlide();
            document.getElementById('slide-content').scrollTop = 0;
        }
    },
    prevSlide() {
        if (this.currentSlide > 0) {
            this.currentSlide--;
            this.renderStudentSlide();
        }
    },

    // ---- PROFESSOR SLIDES ----
    renderProfessorSlide() {
        const slides = this.currentClass.professorSlides;
        const total = slides.length;
        const idx = this.profCurrentSlide;
        document.getElementById('prof-slide-counter').textContent = `${idx + 1}/${total}`;
        document.getElementById('prof-progress-fill').style.width = `${((idx + 1) / total) * 100}%`;
        document.getElementById('prof-slide-content').innerHTML = slides[idx].html;
        document.getElementById('prof-btn-prev').disabled = idx === 0;
        const nextBtn = document.getElementById('prof-btn-next');
        nextBtn.textContent = idx === total - 1 ? '← Volver a Clases' : 'Siguiente →';
        nextBtn.onclick = idx === total - 1 ? () => this.backToClasses() : () => this.profNextSlide();
    },
    profNextSlide() {
        if (this.profCurrentSlide < this.currentClass.professorSlides.length - 1) {
            this.profCurrentSlide++;
            this.renderProfessorSlide();
        }
    },
    profPrevSlide() {
        if (this.profCurrentSlide > 0) {
            this.profCurrentSlide--;
            this.renderProfessorSlide();
        }
    },

    // ---- EXERCISE RENDERING ----
    renderExercise(slide, slideIdx) {
        const key = `c${this.currentClass.id}_s${slideIdx}`;
        const prev = this.answeredExercises[key];
        let html = `<div class="exercise-box"><h4>✍️ EJERCICIO</h4><p class="exercise-q">${slide.question}</p>`;

        if (slide.exerciseType === 'text') {
            html += `<textarea class="exercise-input" id="ex-input-${slideIdx}" placeholder="Escribe tu respuesta aquí..." ${prev ? 'disabled' : ''}>${prev ? prev.answer : ''}</textarea>`;
            if (!prev) html += `<button class="exercise-submit" onclick="App.submitText(${slideIdx})">Enviar Respuesta</button>`;
        } else if (slide.exerciseType === 'multiple') {
            html += `<div class="exercise-options">`;
            slide.options.forEach((opt, i) => {
                let cls = 'exercise-option';
                if (prev) {
                    if (i === slide.correctIndex) cls += ' correct';
                    else if (i === prev.selected && i !== slide.correctIndex) cls += ' wrong';
                }
                html += `<button class="${cls}" ${prev ? 'disabled' : ''} onclick="App.submitMultiple(${slideIdx},${i})">${opt}</button>`;
            });
            html += `</div>`;
        } else if (slide.exerciseType === 'order') {
            html += this.renderOrderExercise(slide, slideIdx, prev);
        } else if (slide.exerciseType === 'classify') {
            html += this.renderClassifyExercise(slide, slideIdx, prev);
        }

        if (prev) {
            const fbClass = prev.score >= slide.points ? 'feedback-correct' : prev.score > 0 ? 'feedback-partial' : 'feedback-wrong';
            const icon = prev.score >= slide.points ? '✅' : prev.score > 0 ? '⚡' : '❌';
            html += `<div class="exercise-feedback ${fbClass}">${icon} Puntos: ${prev.score}/${slide.points}<br>${slide.correctAnswer || slide.explanation || ''}</div>`;
        }

        html += `<div id="ex-feedback-${slideIdx}"></div></div>`;
        return html;
    },

    renderOrderExercise(slide, slideIdx, prev) {
        const items = prev ? prev.finalOrder : [...slide.items];
        let html = `<ul class="order-list" id="order-list-${slideIdx}">`;
        items.forEach((item, i) => {
            const correctMark = prev ? (item === slide.correctOrder[i] ? '✅' : '❌') : '';
            html += `<li class="order-item" draggable="${prev ? 'false' : 'true'}" data-idx="${i}" 
        ${prev ? '' : `ontouchstart="App.touchDragStart(event,${slideIdx})" ontouchmove="App.touchDragMove(event,${slideIdx})" ontouchend="App.touchDragEnd(event,${slideIdx})"
        ondragstart="App.dragStart(event)" ondragover="App.dragOver(event)" ondrop="App.drop(event,${slideIdx})"`}>
        <span class="grip">${prev ? correctMark : '⠿'}</span> ${item}</li>`;
        });
        html += `</ul>`;
        if (!prev) html += `<button class="exercise-submit" onclick="App.submitOrder(${slideIdx})">Confirmar Orden</button>`;
        return html;
    },

    renderClassifyExercise(slide, slideIdx, prev) {
        let html = '';
        slide.items.forEach((item, i) => {
            const selected = prev ? prev.answers[i] : null;
            const isCorrect = prev ? selected === item.answer : null;
            html += `<div style="margin:10px 0; padding:12px; background:var(--bg-glass); border-radius:10px; ${prev ? (isCorrect ? 'border:1px solid var(--green)' : 'border:1px solid var(--red)') : 'border:1px solid rgba(255,255,255,0.08)'}">
        <p style="font-size:13px; margin-bottom:8px;">${prev ? (isCorrect ? '✅' : '❌') : ''} ${item.text}</p>
        <div style="display:flex; gap:6px; flex-wrap:wrap;">`;
            slide.options.forEach(opt => {
                const isSelected = selected === opt;
                const btnStyle = prev
                    ? (opt === item.answer ? 'border-color:var(--green);background:rgba(0,200,83,0.15);' : (isSelected && !isCorrect ? 'border-color:var(--red);opacity:0.5;' : 'opacity:0.4;'))
                    : (isSelected ? 'border-color:var(--accent);background:rgba(26,115,232,0.15);' : '');
                html += `<button class="exercise-option" style="flex:1;min-width:auto;padding:8px;font-size:12px;${btnStyle}" 
          ${prev ? 'disabled' : ''} onclick="App.selectClassify(${slideIdx},${i},'${opt}')">${opt}</button>`;
            });
            html += `</div></div>`;
        });
        if (!prev) html += `<button class="exercise-submit" onclick="App.submitClassify(${slideIdx})">Confirmar Respuestas</button>`;
        return html;
    },

    // ---- EXERCISE SUBMISSION ----
    classifySelections: {},

    selectClassify(slideIdx, itemIdx, option) {
        if (!this.classifySelections[slideIdx]) this.classifySelections[slideIdx] = {};
        this.classifySelections[slideIdx][itemIdx] = option;
        this.renderStudentSlide();
    },

    submitClassify(slideIdx) {
        const slide = this.currentClass.studentSlides[slideIdx];
        const key = `c${this.currentClass.id}_s${slideIdx}`;
        const answers = this.classifySelections[slideIdx] || {};
        if (Object.keys(answers).length < slide.items.length) {
            this.showFeedback(slideIdx, 'feedback-wrong', '⚠️ Clasifica todos los elementos antes de enviar.');
            return;
        }
        let correct = 0;
        slide.items.forEach((item, i) => { if (answers[i] === item.answer) correct++; });
        const score = Math.round((correct / slide.items.length) * slide.points);
        this.saveAnswer(key, { answers, score });
        this.renderStudentSlide();
    },

    submitText(slideIdx) {
        const input = document.getElementById(`ex-input-${slideIdx}`);
        const answer = input.value.trim();
        if (!answer || answer.length < 3) {
            this.showFeedback(slideIdx, 'feedback-wrong', '⚠️ Escribe una respuesta más completa.');
            return;
        }
        const slide = this.currentClass.studentSlides[slideIdx];
        const key = `c${this.currentClass.id}_s${slideIdx}`;
        const score = this.evaluateText(answer, slide);
        this.saveAnswer(key, { answer, score });
        this.renderStudentSlide();
    },

    evaluateText(answer, slide) {
        const normalized = this.normalize(answer);
        let matched = 0;
        const kws = slide.keywords || [];
        kws.forEach(kw => { if (normalized.includes(this.normalize(kw))) matched++; });
        const ratio = kws.length > 0 ? matched / slide.minKeywords : 0;
        if (ratio >= 1) return slide.points;
        if (ratio >= 0.5) return Math.round(slide.points * 0.7);
        if (matched > 0) return Math.round(slide.points * 0.4);
        // check if answer is at least 15 chars (some effort)
        if (answer.length > 15) return Math.round(slide.points * 0.2);
        return 0;
    },

    normalize(str) {
        return str.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9\s]/g, '');
    },

    submitMultiple(slideIdx, optionIdx) {
        const slide = this.currentClass.studentSlides[slideIdx];
        const key = `c${this.currentClass.id}_s${slideIdx}`;
        const score = optionIdx === slide.correctIndex ? slide.points : 0;
        this.saveAnswer(key, { selected: optionIdx, score });
        this.renderStudentSlide();
    },

    // ---- DRAG & DROP (ORDER) ----
    draggedItem: null,
    dragStart(e) { this.draggedItem = e.target; e.target.classList.add('dragging'); },
    dragOver(e) { e.preventDefault(); },
    drop(e, slideIdx) {
        e.preventDefault();
        if (!this.draggedItem) return;
        this.draggedItem.classList.remove('dragging');
        const list = document.getElementById(`order-list-${slideIdx}`);
        const items = [...list.querySelectorAll('.order-item')];
        const target = e.target.closest('.order-item');
        if (target && target !== this.draggedItem) {
            const targetIdx = items.indexOf(target);
            const dragIdx = items.indexOf(this.draggedItem);
            if (dragIdx < targetIdx) target.after(this.draggedItem);
            else target.before(this.draggedItem);
        }
        this.draggedItem = null;
    },

    // Touch drag for mobile
    touchDragEl: null,
    touchDragClone: null,
    touchStartY: 0,
    touchDragStart(e, slideIdx) {
        this.touchDragEl = e.target.closest('.order-item');
        this.touchStartY = e.touches[0].clientY;
        this.touchDragEl.style.opacity = '0.5';
    },
    touchDragMove(e, slideIdx) {
        e.preventDefault();
        if (!this.touchDragEl) return;
        const touch = e.touches[0];
        const list = document.getElementById(`order-list-${slideIdx}`);
        const items = [...list.querySelectorAll('.order-item')];
        const target = document.elementFromPoint(touch.clientX, touch.clientY);
        const targetItem = target ? target.closest('.order-item') : null;
        if (targetItem && targetItem !== this.touchDragEl) {
            const tIdx = items.indexOf(targetItem);
            const dIdx = items.indexOf(this.touchDragEl);
            if (dIdx < tIdx) targetItem.after(this.touchDragEl);
            else targetItem.before(this.touchDragEl);
        }
    },
    touchDragEnd(e, slideIdx) {
        if (this.touchDragEl) this.touchDragEl.style.opacity = '1';
        this.touchDragEl = null;
    },

    submitOrder(slideIdx) {
        const slide = this.currentClass.studentSlides[slideIdx];
        const key = `c${this.currentClass.id}_s${slideIdx}`;
        const list = document.getElementById(`order-list-${slideIdx}`);
        const items = [...list.querySelectorAll('.order-item')];
        const finalOrder = items.map(li => li.textContent.replace('⠿', '').trim());
        let correct = 0;
        finalOrder.forEach((item, i) => { if (item === slide.correctOrder[i]) correct++; });
        const score = Math.round((correct / slide.correctOrder.length) * slide.points);
        this.saveAnswer(key, { finalOrder, score });
        this.renderStudentSlide();
    },

    showFeedback(slideIdx, cls, msg) {
        const el = document.getElementById(`ex-feedback-${slideIdx}`);
        if (el) { el.innerHTML = `<div class="exercise-feedback ${cls}">${msg}</div>`; }
    },

    // ---- SCORING & STORAGE ----
    saveAnswer(key, data) {
        this.answeredExercises[key] = data;
        if (!this.scores[this.currentClass.id]) this.scores[this.currentClass.id] = {};
        this.scores[this.currentClass.id][key] = data.score;
        this.saveStudentData();
    },

    getClassScore(classId) {
        if (!this.scores[classId]) return 0;
        return Object.values(this.scores[classId]).reduce((a, b) => a + b, 0);
    },

    getClassProgress(classId) {
        const cls = COURSE_DATA.classes.find(c => c.id === classId);
        if (!cls) return { pct: 0, score: 0 };
        const exercises = cls.studentSlides.filter(s => s.type === 'exercise');
        const total = exercises.length;
        let answered = 0;
        cls.studentSlides.forEach((s, i) => {
            if (s.type === 'exercise' && this.answeredExercises[`c${classId}_s${i}`]) answered++;
        });
        return {
            pct: total > 0 ? Math.round((answered / total) * 100) : 0,
            score: this.getClassScore(classId)
        };
    },

    // ---- FINISH CLASS ----
    finishClass() {
        const classId = this.currentClass.id;
        const progress = this.getClassProgress(classId);
        const maxScore = this.currentClass.studentSlides.filter(s => s.type === 'exercise').reduce((a, s) => a + s.points, 0);
        const pct = maxScore > 0 ? Math.round((progress.score / maxScore) * 100) : 0;
        const scoreClass = pct >= 80 ? 'high' : pct >= 50 ? 'mid' : 'low';
        const emoji = pct >= 80 ? '🏆' : pct >= 50 ? '👍' : '📚';

        // Save to history
        this.saveToHistory(classId, progress.score, maxScore, pct);

        const container = document.getElementById('results-content');
        container.innerHTML = `
      <div style="font-size:48px;margin-bottom:10px;">${emoji}</div>
      <h2>${this.currentClass.title}</h2>
      <p style="color:var(--text-dim);margin:8px 0 20px;">Resultados de ${this.studentName}</p>
      <div class="result-card">
        <h4>Puntuación Final</h4>
        <div class="result-score ${scoreClass}">${progress.score} / ${maxScore}</div>
        <div class="result-detail">${pct}% de aciertos</div>
        <div class="progress-bar" style="margin-top:10px;"><div class="progress-fill" style="width:${pct}%"></div></div>
      </div>
      <div class="result-card">
        <h4>Interpretación</h4>
        <p class="result-detail">${pct >= 80 ? '¡Excelente! Dominas los conceptos de esta clase.' : pct >= 50 ? 'Buen trabajo. Repasa los conceptos que fallaste.' : 'Necesitas repasar. Revisa el material y vuelve a intentarlo.'}</p>
      </div>
      <button class="btn btn-primary btn-block" style="margin-top:16px;" onclick="App.showClassSelect()">← Volver a las Clases</button>`;
        this.showScreen('screen-results');
    },

    // ---- HISTORY ----
    saveToHistory(classId, score, maxScore, pct) {
        const history = this.getHistory();
        history.push({
            name: this.studentName,
            classId,
            className: this.currentClass.title,
            score, maxScore, pct,
            date: new Date().toLocaleString('es-CO')
        });
        localStorage.setItem('omt_history_' + this.normalize(this.studentName), JSON.stringify(history));
    },

    getHistory() {
        const key = 'omt_history_' + this.normalize(this.studentName);
        try { return JSON.parse(localStorage.getItem(key)) || []; } catch { return []; }
    },

    showResults() {
        const history = this.getHistory();
        const container = document.getElementById('results-content');
        let html = `<div style="font-size:36px;margin-bottom:10px;">📊</div>
      <h2>Historial de ${this.studentName}</h2>
      <p style="color:var(--text-dim);margin:8px 0 20px;">${history.length} registros acumulados</p>`;

        if (history.length === 0) {
            html += `<div class="result-card"><p class="result-detail">Aún no has completado ninguna clase.</p></div>`;
        } else {
            // Summary per class
            COURSE_DATA.classes.forEach(c => {
                const classHistory = history.filter(h => h.classId === c.id);
                if (classHistory.length > 0) {
                    const best = Math.max(...classHistory.map(h => h.pct));
                    html += `<div class="result-card">
            <h4>${c.icon} ${c.title}</h4>
            <div class="result-detail">Intentos: ${classHistory.length} | Mejor: ${best}%</div>`;
                    classHistory.forEach(h => {
                        html += `<div class="history-item"><span>${h.date}</span><span style="color:${h.pct >= 80 ? 'var(--green)' : h.pct >= 50 ? 'var(--yellow)' : 'var(--red)'}">${h.score}/${h.maxScore} (${h.pct}%)</span></div>`;
                    });
                    html += `</div>`;
                }
            });
        }

        html += `<button class="btn btn-primary btn-block" style="margin-top:16px;" onclick="App.showClassSelect()">← Volver a las Clases</button>`;
        container.innerHTML = html;
        this.showScreen('screen-results');
    },

    // ---- PERSISTENCE ----
    saveStudentData() {
        const key = 'omt_student_' + this.normalize(this.studentName);
        const data = { scores: this.scores, answered: this.answeredExercises, classify: this.classifySelections };
        localStorage.setItem(key, JSON.stringify(data));
    },

    loadStudentData() {
        const key = 'omt_student_' + this.normalize(this.studentName);
        try {
            const data = JSON.parse(localStorage.getItem(key));
            if (data) {
                this.scores = data.scores || {};
                this.answeredExercises = data.answered || {};
                this.classifySelections = data.classify || {};
            } else {
                this.scores = {};
                this.answeredExercises = {};
                this.classifySelections = {};
            }
        } catch {
            this.scores = {};
            this.answeredExercises = {};
            this.classifySelections = {};
        }
    }
};

// Enter key support for login fields
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('student-name').addEventListener('keyup', e => { if (e.key === 'Enter') App.studentEnter(); });
    document.getElementById('professor-pass').addEventListener('keyup', e => { if (e.key === 'Enter') App.professorEnter(); });
});
