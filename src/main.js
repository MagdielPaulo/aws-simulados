import { state } from './state.js';
import { renderHome, renderStudy, registerActions } from './ui/simulator.js';
import { renderSevenSteps, registerSevenStepsActions } from './ui/seven-steps.js';

const app = document.getElementById('app');

function renderShell() {
  const v = state.view;
  return `
    <div class="header">
      <div class="header-badge">
        <i data-lucide="cloud"></i>
        AWS Certified Cloud Practitioner
      </div>
      <h1>Trilha de <span>Aprendizado</span></h1>
      <p>325 questões · 5 simulados · 7 Passos AWS</p>
    </div>
    <nav class="nav-tabs">
      <button class="nav-tab ${v === 'home' || v === 'study' ? 'active' : ''}" onclick="window._setView('home')">
        <i data-lucide="layout-dashboard"></i>
        <span>Simulados</span>
      </button>
      <button class="nav-tab ${v === 'sevensteps' ? 'active' : ''}" onclick="window._setView('sevensteps')">
        <i data-lucide="map"></i>
        <span>7 Passos</span>
      </button>
    </nav>`;
}

export function render() {
  const container = document.createElement('div');
  container.className = 'container';

  if (state.view === 'study') {
    container.innerHTML = renderShell();
    const content = document.createElement('div');
    renderStudy(content);
    container.appendChild(content);
  } else {
    container.innerHTML = renderShell();
    const content = document.createElement('div');

    if (state.view === 'sevensteps') {
      renderSevenSteps(content);
    } else {
      renderHome(content);
    }

    container.appendChild(content);
  }

  app.innerHTML = '';
  app.appendChild(container);

  if (window.lucide) {
    window.lucide.createIcons();
  }
}

window._setView = function (view) {
  state.view = view;
  render();
};

window.__appRender = { render };

registerActions();
registerSevenStepsActions();
render();
