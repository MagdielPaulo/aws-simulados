import { state, saveProgress, getSavedResume, getStats, getQuestion } from '../state.js';
import { showToast, showConfirm } from '../toast.js';

const render = () => window.__appRender.render();

// ─── HOME ───────────────────────────────────────
export function renderHome(app) {
  const st = getStats();
  const rate = st.total ? Math.round(st.ok / st.total * 100) : null;
  const rateColor = rate === null ? 'var(--text-2)' : rate >= 70 ? 'var(--green)' : rate >= 40 ? 'var(--amber)' : 'var(--red)';

  let html = `
    <div class="stats-row">
      <div class="stat-card">
        <div class="stat-value" style="color:var(--blue-400)">${st.total}</div>
        <div class="stat-label">Respondidas</div>
      </div>
      <div class="stat-card">
        <div class="stat-value" style="color:var(--green)">${st.ok}</div>
        <div class="stat-label">Corretas</div>
      </div>
      <div class="stat-card">
        <div class="stat-value" style="color:var(--red)">${st.fail}</div>
        <div class="stat-label">Erradas</div>
      </div>
      <div class="stat-card">
        <div class="stat-value" style="color:${rateColor}">${rate !== null ? rate + '%' : '—'}</div>
        <div class="stat-label">Taxa</div>
      </div>
    </div>

    <div class="section-title">
      <i data-lucide="layers"></i>
      Simulados
    </div>`;

  const resume = getSavedResume();

  for (let s = 1; s <= 5; s++) {
    const d = st.by[s];
    const pct = Math.round(d.ok / 65 * 100);
    const col = pct >= 70 ? 'var(--green)' : pct >= 40 ? 'var(--amber)' : 'var(--red)';
    const hasResume = resume && resume.sim === s && (resume.qNum > 1 || (resume.qNum === 1 && resume.answered));
    const resumeBadge = hasResume
      ? `<span class="sim-resume-badge"><i data-lucide="bookmark" style="width:10px;height:10px"></i> Q${resume.qNum}</span>`
      : '';

    html += `
      <div class="sim-card">
        <div class="sim-card-row">
          <div>
            <div class="sim-name">Simulado ${s} ${resumeBadge}</div>
            <div class="sim-detail">${d.t}/65 respondidas · ${d.ok} corretas</div>
          </div>
          <div class="sim-pct" style="color:${col}">${pct}%</div>
        </div>
        <div class="progress-bar">
          <div class="progress-fill" style="width:${pct}%"></div>
        </div>
        <div class="btn-row">
          <button class="btn btn-primary" onclick="window._go(${s},'seq')">
            <i data-lucide="${hasResume ? 'play-circle' : 'play'}"></i>
            ${hasResume ? 'Continuar' : 'Iniciar'}
          </button>
          <button class="btn btn-secondary" onclick="window._go(${s},'random')">
            <i data-lucide="shuffle"></i> Aleatório
          </button>
        </div>
      </div>`;
  }

  html += `
    <div class="section-title section-gap">
      <i data-lucide="target"></i>
      Modos Especiais
    </div>
    <div class="mode-grid">
      <div class="mode-card" onclick="window._go(0,'random')">
        <div class="mode-icon"><i data-lucide="shuffle"></i></div>
        <div class="mode-title">Todos Aleatórios</div>
        <div class="mode-desc">Questões de todos os simulados</div>
      </div>
      <div class="mode-card" onclick="window._goWrong()">
        <div class="mode-icon"><i data-lucide="rotate-ccw"></i></div>
        <div class="mode-title">Revisar Erradas</div>
        <div class="mode-desc">${st.fail} questões para revisar</div>
      </div>
    </div>
    <div class="center">
      <button class="btn btn-danger" onclick="window._reset()">
        <i data-lucide="trash-2"></i> Resetar Progresso
      </button>
    </div>`;

  app.innerHTML = html;
}

// ─── STUDY VIEW ─────────────────────────────────
export function renderStudy(app) {
  const q = getQuestion(state.sim, state.qNum);
  const isOk = state.answered &&
    JSON.stringify([...state.sel].sort()) === JSON.stringify([...q.ans].sort());
  const pc = Object.keys(state.progress).filter(k => k.startsWith(`s${state.sim}`)).length;
  const L = 'ABCDE';

  const sessionHtml = (state.session.ok + state.session.fail > 0)
    ? `<span class="session-ok"><i data-lucide="check" style="width:12px;height:12px"></i> ${state.session.ok}</span>
       <span class="session-fail"><i data-lucide="x" style="width:12px;height:12px"></i> ${state.session.fail}</span>`
    : '';

  let html = `
    <div class="topbar">
      <button class="back-btn" onclick="window._goHome()">
        <i data-lucide="arrow-left"></i> Menu
      </button>
      <div class="session-info">
        ${sessionHtml}
        ${sessionHtml ? ' · ' : ''}Sim ${state.sim} · ${pc}/65
      </div>
    </div>
    <div class="progress-bar">
      <div class="progress-fill" style="width:${(state.qNum / 65) * 100}%"></div>
    </div>
    <div class="q-badge">
      <span class="q-num">Q${state.qNum}</span>
      ${q.multi ? `<span class="q-multi">Selecione ${q.ans.length}</span>` : ''}
    </div>
    <div class="q-text">${q.q.replace(/\n/g, '<br>')}</div>
    <div class="opt-list">`;

  q.opts.forEach((o, i) => {
    let cls = 'opt';
    let letterContent = L[i];

    if (state.answered) {
      cls += ' locked';
      if (q.ans.includes(i)) {
        cls += ' correct';
        letterContent = '<i data-lucide="check" style="width:14px;height:14px"></i>';
      } else if (state.sel.includes(i)) {
        cls += ' wrong';
        letterContent = '<i data-lucide="x" style="width:14px;height:14px"></i>';
      }
    } else if (state.sel.includes(i)) {
      cls += ' selected';
    }

    html += `<button class="${cls}" onclick="window._pick(${i})">
      <span class="opt-letter">${letterContent}</span>
      <span>${o}</span>
    </button>`;
  });

  html += `</div>
    <div class="btn-row" style="margin-bottom:14px">`;

  if (!state.answered) {
    html += `
      <button class="btn btn-hint" onclick="window._toggleHint()">
        <i data-lucide="lightbulb"></i> Dica
      </button>
      <button class="btn btn-confirm" ${state.sel.length === 0 ? 'disabled' : ''} onclick="window._confirm()">
        Confirmar <i data-lucide="check-circle"></i>
      </button>`;
  } else {
    html += `
      <button class="btn btn-hint" onclick="window._toggleConcept()">
        <i data-lucide="book-marked"></i> Conceito
      </button>
      <button class="btn btn-next" onclick="window._next()">
        Próxima <i data-lucide="arrow-right"></i>
      </button>`;
  }

  html += `</div>`;

  if (state.showHint && !state.answered) {
    html += `<div class="info-box box-hint">
      <div class="info-box-label"><i data-lucide="lightbulb"></i> Dica</div>
      ${q.hint}
    </div>`;
  }

  if (state.answered) {
    if (isOk) {
      html += `<div class="info-box box-ok">
        <div class="info-box-label"><i data-lucide="check-circle"></i> Correto!</div>
        ${q.just}
      </div>`;
    } else {
      html += `<div class="info-box box-fail">
        <div class="info-box-label"><i data-lucide="alert-circle"></i> Incorreto</div>
        ${q.just}<br><br>
        <strong>Resposta correta: ${q.ans.map(a => L[a]).join(', ')}</strong>
      </div>`;
    }
  }

  if (state.showConcept && state.answered) {
    html += `<div class="info-box box-concept">
      <div class="info-box-label"><i data-lucide="book-marked"></i> Conceito-Chave</div>
      ${q.concept}
    </div>`;
  }

  html += `
    <div class="nav-dots-wrap">
      <div class="nav-dots-title">Navegação — Simulado ${state.sim}</div>
      <div class="nav-dots">`;

  for (let n = 1; n <= 65; n++) {
    const k = `s${state.sim}q${n}`;
    let cls = 'nav-dot';
    if (state.progress[k] === true) cls += ' ok';
    else if (state.progress[k] === false) cls += ' fail';
    if (n === state.qNum) cls += ' curr';
    html += `<button class="${cls}" onclick="window._goQ(${n})">${n}</button>`;
  }

  html += `</div></div>`;
  app.innerHTML = html;
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ─── ACTIONS ────────────────────────────────────
export function registerActions() {

  window._go = function (sim, mode) {
    const startFresh = () => {
      state.view      = 'study';
      state.studyMode = mode;
      state.sim       = sim || 1;
      state.qNum      = 1;
      state.sel       = [];
      state.answered  = false;
      state.showHint  = false;
      state.showConcept = false;
      state.session   = { ok: 0, fail: 0 };
      if (mode === 'random') {
        state.sim  = sim || Math.ceil(Math.random() * 5);
        state.qNum = Math.ceil(Math.random() * 65);
      }
      render();
    };

    if (mode === 'seq' && sim) {
      const resume = getSavedResume();
      const hasResume = resume &&
        resume.sim === sim &&
        (resume.qNum > 1 || (resume.qNum === 1 && resume.answered));

      if (hasResume) {
        showConfirm({
          icon: 'play-circle',
          color: '#FF9900',
          rgb: '255,153,0',
          title: `Simulado ${sim} — Continuar?`,
          message: `Você estava na questão <strong>${resume.qNum}</strong>. Deseja continuar de onde parou?`,
          confirmText: 'Continuar',
          cancelText: 'Recomeçar',
          onConfirm: () => {
            state.view      = 'study';
            state.studyMode = 'seq';
            state.sim       = resume.sim;
            state.qNum      = resume.qNum;
            state.sel       = resume.sel || [];
            state.answered  = resume.answered || false;
            state.showHint  = false;
            state.showConcept = false;
            state.session   = { ok: resume.sessionOk || 0, fail: resume.sessionFail || 0 };
            render();
          },
          onCancel: startFresh,
        });
        return;
      }
    }

    startFresh();
  };

  window._goWrong = function () {
    const wrong = [];
    Object.entries(state.progress).forEach(([k, v]) => {
      if (!v) {
        const m = k.match(/s(\d+)q(\d+)/);
        if (m) wrong.push({ s: +m[1], q: +m[2] });
      }
    });
    if (!wrong.length) {
      showToast('Nenhuma questão errada para revisar!', 'check-circle', 'toast-correct');
      return;
    }
    state.wrongQueue  = wrong;
    state.wrongIndex  = 0;
    state.view        = 'study';
    state.studyMode   = 'wrong';
    state.sim         = wrong[0].s;
    state.qNum        = wrong[0].q;
    state.sel         = [];
    state.answered    = false;
    state.showHint    = false;
    state.showConcept = false;
    state.session     = { ok: 0, fail: 0 };
    render();
  };

  window._goHome = function () {
    // Persiste posição atual antes de sair (garante retomada futura)
    saveProgress();
    state.view = 'home';
    render();
  };

  window._pick = function (i) {
    if (state.answered) return;
    const q = getQuestion(state.sim, state.qNum);
    if (q.multi) {
      const idx = state.sel.indexOf(i);
      if (idx >= 0) state.sel.splice(idx, 1);
      else state.sel.push(i);
    } else {
      state.sel = [i];
    }
    render();
  };

  window._confirm = function () {
    if (!state.sel.length) return;
    state.answered = true;
    const q = getQuestion(state.sim, state.qNum);
    const ok = JSON.stringify([...state.sel].sort()) === JSON.stringify([...q.ans].sort());
    state.progress[`s${state.sim}q${state.qNum}`] = ok;
    if (ok) state.session.ok++;
    else state.session.fail++;
    saveProgress(); // salva progresso + posição atual como resume
    render();
  };

  window._next = function () {
    state.sel         = [];
    state.answered    = false;
    state.showHint    = false;
    state.showConcept = false;

    if (state.studyMode === 'wrong' && state.wrongQueue) {
      state.wrongIndex++;
      if (state.wrongIndex < state.wrongQueue.length) {
        state.sim  = state.wrongQueue[state.wrongIndex].s;
        state.qNum = state.wrongQueue[state.wrongIndex].q;
      } else {
        showToast(`Revisão completa! ${state.session.ok} certas, ${state.session.fail} erradas.`, 'award', 'toast-correct');
        state.view = 'home';
      }
    } else if (state.studyMode === 'random') {
      state.sim  = Math.ceil(Math.random() * 5);
      state.qNum = Math.ceil(Math.random() * 65);
    } else {
      if (state.qNum < 65) {
        state.qNum++;
      } else if (state.sim < 5) {
        state.sim++;
        state.qNum = 1;
      } else {
        showToast(`Simulado completo! ${state.session.ok} certas, ${state.session.fail} erradas.`, 'award', 'toast-correct');
        state.view = 'home';
      }
    }

    // Persiste nova posição como resume (ou limpa resume se voltou para home)
    if (state.studyMode === 'seq') saveProgress();
    render();
  };

  window._goQ = function (n) {
    state.qNum        = n;
    state.sel         = [];
    state.answered    = false;
    state.showHint    = false;
    state.showConcept = false;
    // Salva posição do salto para retomada
    if (state.studyMode === 'seq') saveProgress();
    render();
  };

  window._toggleHint = function () {
    state.showHint = !state.showHint;
    render();
  };

  window._toggleConcept = function () {
    state.showConcept = !state.showConcept;
    render();
  };

  window._reset = function () {
    showConfirm({
      icon: 'trash-2',
      color: '#ef4444',
      rgb: '239,68,68',
      title: 'Resetar Progresso',
      message: 'Isso apagará todas as respostas e o progresso de todos os simulados. Essa ação não pode ser desfeita.',
      confirmText: 'Apagar tudo',
      cancelText: 'Cancelar',
      danger: true,
      onConfirm: () => {
        state.progress = {};
        saveProgress();
        render();
      },
    });
  };
}
