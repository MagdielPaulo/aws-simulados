import { TREE_DATA } from '../data/treemap-data.js';

// ─── RENDER ─────────────────────────────────────
export function renderTreemap(app) {
  const domains = TREE_DATA.domains.map(d => buildDomain(d)).join('');

  app.innerHTML = `
    <div class="tmap-wrapper">
      <div class="tmap-header">
        <h2>Mapa Mental Interativo</h2>
        <p>Clique nos domínios para expandir os tópicos de estudo</p>
      </div>

      <div class="tmap-root">
        <div class="tmap-root-glow" aria-hidden="true"></div>
        <div class="tmap-root-inner">
          <div class="tmap-root-icon-box">
            <i data-lucide="cloud"></i>
          </div>
          <div>
            <div class="tmap-root-label">AWS Cloud Practitioner</div>
            <div class="tmap-root-sub">CLF-C02 · 65 questões · 90 minutos · 4 Domínios</div>
          </div>
        </div>
      </div>

      <div class="tmap-connector" aria-hidden="true">
        <div class="tmap-connector-line"></div>
        <div class="tmap-connector-branches">
          ${TREE_DATA.domains.map(() => '<div class="tmap-connector-tick"></div>').join('')}
        </div>
      </div>

      <div class="tmap-domains">
        ${domains}
      </div>
    </div>`;
}

// ─── DOMAIN CARD ────────────────────────────────
function buildDomain(domain) {
  const children = domain.children.map(c => buildChild(c, domain)).join('');

  return `
    <div class="tmap-domain" data-domain="${domain.id}" style="--dc:${domain.color};--drgb:${domain.rgb}">
      <button class="tmap-domain-btn" onclick="window._tmToggle('${domain.id}')">
        <div class="tmap-domain-left">
          <div class="tmap-domain-icon-box">
            <i data-lucide="${domain.icon}"></i>
          </div>
          <div class="tmap-domain-info">
            <div class="tmap-domain-title">${domain.label}</div>
            <div class="tmap-domain-meta">
              <span class="tmap-pct-badge">${domain.pct} da prova</span>
              <span class="tmap-child-count">${domain.children.length} tópicos</span>
            </div>
          </div>
        </div>
        <div class="tmap-chevron">
          <i data-lucide="chevron-down"></i>
        </div>
      </button>

      <div class="tmap-children">
        <div class="tmap-children-inner">
          <div class="tmap-children-grid">
            ${children}
          </div>
        </div>
      </div>
    </div>`;
}

// ─── CHILD NODE ──────────────────────────────────
function buildChild(child, domain) {
  const tags = child.tags.map(t => `<span>${t}</span>`).join('');
  return `
    <div class="tmap-child" style="--dc:${domain.color};--drgb:${domain.rgb}">
      <div class="tmap-child-header">
        <div class="tmap-child-icon-box">
          <i data-lucide="${child.icon}"></i>
        </div>
        <div class="tmap-child-title">${child.label}</div>
      </div>
      <p class="tmap-child-summary">${child.summary}</p>
      <div class="tmap-child-tags">${tags}</div>
    </div>`;
}

// ─── ACTIONS ─────────────────────────────────────
export function registerTreemapActions() {
  window._tmToggle = function (domainId) {
    const domain = document.querySelector(`[data-domain="${domainId}"]`);
    if (!domain) return;

    const children = domain.querySelector('.tmap-children');
    const isOpen = domain.classList.contains('tmap-open');

    if (isOpen) {
      // Collapse: snapshot height → 0 to trigger CSS transition
      children.style.maxHeight = children.scrollHeight + 'px';
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          children.style.maxHeight = '0px';
        });
      });
      domain.classList.remove('tmap-open');
    } else {
      // Expand: 0 → scrollHeight
      domain.classList.add('tmap-open');
      children.style.maxHeight = children.scrollHeight + 'px';
      children.addEventListener('transitionend', function handler() {
        if (domain.classList.contains('tmap-open')) {
          children.style.maxHeight = 'none';
        }
        children.removeEventListener('transitionend', handler);
      });
    }

    if (window.lucide) window.lucide.createIcons();
  };
}
