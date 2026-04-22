import { GAB, getQuestion } from './data/questions.js';

const STORAGE_KEY = 'aws_v4';

export const state = {
  view: 'home',       // 'home' | 'study' | 'mindmap' | 'treemap' | 'sevensteps'
  sim: 1,
  qNum: 1,
  sel: [],
  answered: false,
  showHint: false,
  showConcept: false,
  studyMode: 'seq',   // 'seq' | 'random' | 'wrong'
  session: { ok: 0, fail: 0 },
  progress: {},
  wrongQueue: null,
  wrongIndex: 0,
  selectedMapNode: null,
  newlyUnlocked: [],
};

// ─── LOAD ──────────────────────────────────────
// Suporta formato antigo (objeto puro = progress) e novo (v:2 com chaves separadas)
try {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw) {
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === 'object') {
      state.progress = (parsed.v === 2 && parsed.progress)
        ? parsed.progress
        : parsed; // legado: o objeto inteiro era o progress
    }
  }
} catch {}

// ─── SAVE ──────────────────────────────────────
export function saveProgress() {
  try {
    const data = { v: 2, progress: state.progress };
    // Persiste posição de retomada apenas em modo sequencial
    if (state.view === 'study' && state.studyMode === 'seq') {
      data.resume = {
        sim: state.sim,
        qNum: state.qNum,
        sel: state.sel.slice(),
        answered: state.answered,
        sessionOk: state.session.ok,
        sessionFail: state.session.fail,
      };
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {}
}

// ─── RESUME ────────────────────────────────────
export function getSavedResume() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const saved = JSON.parse(raw);
    return (saved && saved.v === 2 && saved.resume) ? saved.resume : null;
  } catch {
    return null;
  }
}

// ─── STATS ─────────────────────────────────────
export function getStats() {
  const result = { total: 0, ok: 0, fail: 0, by: {} };
  for (let s = 1; s <= 5; s++) {
    result.by[s] = { t: 0, ok: 0, f: 0 };
    for (let q = 1; q <= 65; q++) {
      const k = `s${s}q${q}`;
      if (state.progress[k] !== undefined) {
        result.total++;
        result.by[s].t++;
        if (state.progress[k]) { result.ok++; result.by[s].ok++; }
        else { result.fail++; result.by[s].f++; }
      }
    }
  }
  return result;
}

export function getTotalCorrect() {
  return Object.values(state.progress).filter(Boolean).length;
}

export { getQuestion, GAB };
