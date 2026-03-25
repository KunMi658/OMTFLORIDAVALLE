// ============================================
// SYNC.JS — Motor de sincronización Firebase
// Sistema OMT Aula Interactiva
// ============================================

import { db } from './firebase-config.js';
import {
  ref, set, get, update, onValue, remove, push, serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

const SESSION_KEY = 'omt_session_2024';

const Sync = {
  listeners: [],

  // ---- PATHS ----
  paths: {
    session: () => ref(db, `${SESSION_KEY}/session`),
    students: () => ref(db, `${SESSION_KEY}/students`),
    student: (key) => ref(db, `${SESSION_KEY}/students/${key}`),
    activity: () => ref(db, `${SESSION_KEY}/activity`),
    responses: () => ref(db, `${SESSION_KEY}/responses`),
    response: (key) => ref(db, `${SESSION_KEY}/responses/${key}`),
  },

  // ---- PROFESOR: Iniciar sesión ----
  async initSession() {
    await set(this.paths.session(), {
      active: true,
      classId: null,
      slideIndex: 0,
      mode: 'waiting', // waiting | content | activity | results
      timerEnd: null,
      timerActive: false,
      updatedAt: Date.now()
    });
    await set(ref(db, `${SESSION_KEY}/students`), null);
    await set(ref(db, `${SESSION_KEY}/activity`), null);
    await set(ref(db, `${SESSION_KEY}/responses`), null);
  },

  // ---- PROFESOR: Resetear sesión ----
  async resetSession() {
    await set(ref(db, SESSION_KEY), null);
  },

  // ---- PROFESOR: Actualizar estado de sesión ----
  async updateSession(data) {
    await update(this.paths.session(), { ...data, updatedAt: Date.now() });
  },

  // ---- PROFESOR: Lanzar actividad ----
  async launchActivity(activityData, timerSeconds) {
    const timerEnd = Date.now() + (timerSeconds * 1000);
    await set(ref(db, `${SESSION_KEY}/responses`), null);
    await set(this.paths.activity(), {
      ...activityData,
      active: true,
      timerEnd,
      timerSeconds,
      launchedAt: Date.now()
    });
    await this.updateSession({
      mode: 'activity',
      timerEnd,
      timerActive: true
    });
  },

  // ---- PROFESOR: Cerrar actividad ----
  async closeActivity() {
    await update(this.paths.activity(), { active: false });
    await this.updateSession({ mode: 'results', timerActive: false, timerEnd: null });
  },

  // ---- ESTUDIANTE: Registrarse ----
  async registerStudent(name) {
    const key = name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]/g, '_');
    await set(this.paths.student(key), {
      name,
      key,
      score: 0,
      online: true,
      joinedAt: Date.now()
    });
    return key;
  },

  // ---- ESTUDIANTE: Marcar offline ----
  async setStudentOffline(key) {
    try {
      await update(this.paths.student(key), { online: false });
    } catch (e) {}
  },

  // ---- ESTUDIANTE: Enviar respuesta ----
  async submitResponse(studentKey, studentName, answerData) {
    await set(this.paths.response(studentKey), {
      studentKey,
      studentName,
      ...answerData,
      answeredAt: Date.now()
    });
  },

  // ---- ESTUDIANTE: Actualizar puntaje ----
  async addScore(studentKey, points) {
    const snap = await get(this.paths.student(studentKey));
    if (snap.exists()) {
      const current = snap.val().score || 0;
      await update(this.paths.student(studentKey), { score: current + points });
    }
  },

  // ---- ESCUCHAR: Session ----
  listenSession(callback) {
    const unsub = onValue(this.paths.session(), (snap) => {
      callback(snap.exists() ? snap.val() : null);
    });
    this.listeners.push(unsub);
    return unsub;
  },

  // ---- ESCUCHAR: Estudiantes ----
  listenStudents(callback) {
    const unsub = onValue(this.paths.students(), (snap) => {
      const students = {};
      if (snap.exists()) {
        snap.forEach(child => { students[child.key] = child.val(); });
      }
      callback(students);
    });
    this.listeners.push(unsub);
    return unsub;
  },

  // ---- ESCUCHAR: Actividad ----
  listenActivity(callback) {
    const unsub = onValue(this.paths.activity(), (snap) => {
      callback(snap.exists() ? snap.val() : null);
    });
    this.listeners.push(unsub);
    return unsub;
  },

  // ---- ESCUCHAR: Respuestas ----
  listenResponses(callback) {
    const unsub = onValue(this.paths.responses(), (snap) => {
      const responses = {};
      if (snap.exists()) {
        snap.forEach(child => { responses[child.key] = child.val(); });
      }
      callback(responses);
    });
    this.listeners.push(unsub);
    return unsub;
  },

  // ---- OBTENER datos ----
  async getActivity() {
    const snap = await get(this.paths.activity());
    return snap.exists() ? snap.val() : null;
  },

  async getStudents() {
    const snap = await get(this.paths.students());
    const students = {};
    if (snap.exists()) snap.forEach(c => { students[c.key] = c.val(); });
    return students;
  },

  async getResponses() {
    const snap = await get(this.paths.responses());
    const responses = {};
    if (snap.exists()) snap.forEach(c => { responses[c.key] = c.val(); });
    return responses;
  },

  // ---- Limpiar listeners ----
  removeAllListeners() {
    this.listeners.forEach(unsub => { if (typeof unsub === 'function') unsub(); });
    this.listeners = [];
  }
};

export { Sync };
