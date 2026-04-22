import { SEVEN_STEPS } from '../data/seven-steps-data.js';

// ─── RENDER PRINCIPAL ───────────────────────────
// Renderiza AMBOS os modos no DOM; data-mode no wrapper controla qual está visível via CSS.
export function renderSevenSteps(app) {
  const summaryCards = SEVEN_STEPS.map(s => buildSummaryCard(s)).join('');
  const interactiveSteps = SEVEN_STEPS.map(s => buildInteractiveStep(s)).join('');

  app.innerHTML = `
    <div class="ss-wrapper" data-mode="summary">

      <!-- Fundo em grade Retrowave -->
      <div class="ss-bg-grid" aria-hidden="true">
        <div class="ss-scanline" aria-hidden="true"></div>
      </div>

      <!-- Header -->
      <div class="ss-header">
        <div class="ss-title-badge">
          <i data-lucide="zap"></i>
          7 PASSOS AWS
        </div>
        <h2>Mapa de Conhecimento</h2>
        <p>Estrutura completa para a certificação AWS Cloud Practitioner</p>
      </div>

      <!-- Toggle de Modo -->
      <div class="ss-mode-toggle">
        <button class="ss-mode-btn" data-target="summary" onclick="window._ssMode('summary')">
          <i data-lucide="layout-grid"></i>
          <span>Visão Resumo</span>
        </button>
        <button class="ss-mode-btn" data-target="interactive" onclick="window._ssMode('interactive')">
          <i data-lucide="git-branch"></i>
          <span>Modo Interativo</span>
        </button>
      </div>

      <!-- MODO 1: Grade de resumo (todos abertos) -->
      <div class="ss-summary-grid">
        ${summaryCards}
      </div>

      <!-- MODO 2: Árvore expansível -->
      <div class="ss-interactive">
        <div class="ss-tree-root">
          <div class="ss-tree-root-icon"><i data-lucide="cloud"></i></div>
          <div class="ss-tree-root-text">
            <span class="ss-tree-root-label">AWS Cloud Practitioner</span>
            <span class="ss-tree-root-sub">7 Domínios de Estudo</span>
          </div>
        </div>
        <div class="ss-tree-connector" aria-hidden="true"></div>
        <div class="ss-tree-list">
          ${interactiveSteps}
        </div>
      </div>

    </div>`;
}

// ─── MODO 1 — CARD DE RESUMO ─────────────────────
function buildSummaryCard(step) {
  const items = step.children.map(c => `
    <li class="ss-item">
      <div class="ss-item-row">
        <i data-lucide="${c.icon}" class="ss-item-icon"></i>
        <span class="ss-item-label">${c.label}</span>
      </div>
      <div class="ss-item-tags">
        ${c.tags.map(t => `<span>${t}</span>`).join('')}
      </div>
    </li>`).join('');

  return `
    <div class="ss-card" style="--nc:${step.color};--nrgb:${step.rgb}">
      <div class="ss-card-glow" aria-hidden="true"></div>
      <div class="ss-card-top">
        <span class="ss-num">${String(step.step).padStart(2, '0')}</span>
        <div class="ss-card-title-row">
          <div class="ss-card-icon-box">
            <i data-lucide="${step.icon}"></i>
          </div>
          <span class="ss-card-title">${step.label}</span>
        </div>
      </div>
      <ul class="ss-items">${items}</ul>
    </div>`;
}

// ─── MODO 2 — PASSO INTERATIVO ───────────────────
function buildInteractiveStep(step) {
  const children = step.children.map(c => `
    <div class="ss-child" style="--nc:${step.color};--nrgb:${step.rgb}">
      <div class="ss-child-header">
        <div class="ss-child-icon-box">
          <i data-lucide="${c.icon}"></i>
        </div>
        <span class="ss-child-title">${c.label}</span>
      </div>
      <p class="ss-child-summary">${c.summary}</p>
      <div class="ss-child-tags">
        ${c.tags.map(t => `<span>${t}</span>`).join('')}
      </div>
    </div>`).join('');

  return `
    <div class="ss-step" data-step="${step.id}" style="--nc:${step.color};--nrgb:${step.rgb}">
      <button class="ss-step-btn" onclick="window._ssToggle('${step.id}')">
        <div class="ss-step-left">
          <span class="ss-step-num">${String(step.step).padStart(2, '0')}</span>
          <div class="ss-step-icon-box">
            <i data-lucide="${step.icon}"></i>
          </div>
          <div class="ss-step-info">
            <span class="ss-step-title">${step.label}</span>
            <span class="ss-step-sub">${step.children.length} tópicos</span>
          </div>
        </div>
        <div class="ss-step-chevron">
          <i data-lucide="chevron-down"></i>
        </div>
      </button>

      <div class="ss-step-body">
        <div class="ss-step-body-inner">
          <div class="ss-children-grid">
            ${children}
          </div>
        </div>
      </div>
    </div>`;
}

// ─── AÇÕES ───────────────────────────────────────
export function registerSevenStepsActions() {

  // Alterna entre Modo 1 (summary) e Modo 2 (interactive)
  window._ssMode = function (mode) {
    const wrapper = document.querySelector('.ss-wrapper');
    if (!wrapper) return;
    wrapper.dataset.mode = mode;
    if (window.lucide) window.lucide.createIcons();
  };

  // Expande / recolhe um passo no Modo 2
  window._ssToggle = function (stepId) {
    const step = document.querySelector(`.ss-step[data-step="${stepId}"]`);
    if (!step) return;
    const body = step.querySelector('.ss-step-body');
    const isOpen = step.classList.contains('ss-open');

    if (isOpen) {
      // Recolhe: define altura atual → anima para 0
      body.style.maxHeight = body.scrollHeight + 'px';
      requestAnimationFrame(() => requestAnimationFrame(() => {
        body.style.maxHeight = '0px';
      }));
      step.classList.remove('ss-open');
    } else {
      // Expande: anima de 0 → altura real
      step.classList.add('ss-open');
      body.style.maxHeight = body.scrollHeight + 'px';
      body.addEventListener('transitionend', function handler() {
        if (step.classList.contains('ss-open')) {
          body.style.maxHeight = 'none'; // libera para redimensionamento
        }
        body.removeEventListener('transitionend', handler);
      });
    }

    if (window.lucide) window.lucide.createIcons();
  };
}
