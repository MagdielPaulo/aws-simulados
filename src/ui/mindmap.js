import { state, getTotalCorrect, getStats } from '../state.js';

// ─── TOPICS DATA ────────────────────────────────
const TOPICS = [
  {
    area: 'fund',
    label: 'Fundamentos',
    icon: 'book-open',
    color: '#3b82f6',
    rgb: '59,130,246',
    summary: 'Base conceitual da AWS: modelos IaaS/PaaS/SaaS, responsabilidade compartilhada, AWS CAF e benefícios da nuvem.',
    tags: ['Resp. Compartilhada', 'Well-Architected', 'AWS CAF', 'Precificação', 'Planos de Suporte'],
  },
  {
    area: 'monitor',
    label: 'Monitoramento',
    icon: 'activity',
    color: '#f59e0b',
    rgb: '245,158,11',
    summary: 'Visibilidade total, auditoria de APIs, conformidade contínua de configurações e otimização de custos.',
    tags: ['CloudWatch', 'CloudTrail', 'AWS Config', 'Trusted Advisor', 'Cost Explorer'],
  },
  {
    area: 'network',
    label: 'Networking',
    icon: 'wifi',
    color: '#06b6d4',
    rgb: '6,182,212',
    summary: 'Redes virtuais isoladas, CDN global, DNS inteligente e balanceamento de carga em múltiplas camadas.',
    tags: ['Amazon VPC', 'CloudFront', 'Route 53', 'API Gateway', 'Direct Connect'],
  },
  {
    area: 'storage',
    label: 'Armazenamento',
    icon: 'hard-drive',
    color: '#8b5cf6',
    rgb: '139,92,246',
    summary: 'Objetos (S3 — 11 noves), blocos (EBS), arquivos (EFS) e arquivamento de longo prazo (Glacier).',
    tags: ['Amazon S3', 'Amazon EBS', 'Amazon EFS', 'AWS Backup', 'Glacier Deep Archive'],
  },
  {
    area: 'security',
    label: 'Segurança',
    icon: 'shield',
    color: '#ef4444',
    rgb: '239,68,68',
    summary: 'Identidade e acesso (IAM), criptografia (KMS), detecção de ameaças e proteção DDoS em camadas.',
    tags: ['AWS IAM', 'KMS & CloudHSM', 'GuardDuty', 'Macie', 'Shield & WAF'],
  },
  {
    area: 'compute',
    label: 'Computação',
    icon: 'cpu',
    color: '#10b981',
    rgb: '16,185,129',
    summary: 'VMs (EC2), serverless (Lambda), containers (ECS/EKS/Fargate) e plataforma gerenciada (Beanstalk).',
    tags: ['Amazon EC2', 'AWS Lambda', 'ECS / EKS', 'AWS Fargate', 'Elastic Beanstalk'],
  },
  {
    area: 'database',
    label: 'Database',
    icon: 'database',
    color: '#0ea5e9',
    rgb: '14,165,233',
    summary: 'Relacional (RDS/Aurora), NoSQL serverless (DynamoDB), grafos, séries temporais e data warehouse.',
    tags: ['RDS & Aurora', 'DynamoDB', 'Neptune', 'Timestream', 'Redshift'],
  },
  {
    area: 'ai',
    label: 'IA & Analytics',
    icon: 'brain',
    color: '#ec4899',
    rgb: '236,72,153',
    summary: 'ML gerenciado (SageMaker), IA aplicada sem código e análise de dados em escala de petabytes.',
    tags: ['SageMaker', 'Rekognition & Polly', 'Athena', 'Kinesis', 'QuickSight'],
  },
];

// Grid HTML order for 3x3: fund monitor network / storage CENTER security / compute database ai
const GRID_ORDER = ['fund', 'monitor', 'network', 'storage', 'CENTER', 'security', 'compute', 'database', 'ai'];

// ─── RENDER ─────────────────────────────────────
export function renderMindmap(app) {
  const total = getTotalCorrect();
  const st = getStats();
  const rate = st.total ? Math.round(st.ok / st.total * 100) : 0;
  const rateColor = rate >= 70 ? '#22c55e' : rate >= 40 ? '#f59e0b' : '#ef4444';

  const cells = GRID_ORDER.map(area => {
    if (area === 'CENTER') return buildCenter(total, rate, rateColor);
    return buildCard(TOPICS.find(t => t.area === area));
  }).join('');

  app.innerHTML = `
    <div class="mm-wrapper">
      <div class="mm-header">
        <h2>Mapa Mental — AWS Cloud Practitioner</h2>
        <p>Passe o mouse sobre os domínios para explorar os serviços</p>
      </div>
      <div class="mm-outer" id="mm-outer">
        <svg class="mm-connectors" id="mm-connectors" aria-hidden="true"></svg>
        <div class="mm-grid" id="mm-grid">
          ${cells}
        </div>
      </div>
    </div>`;

  requestAnimationFrame(() => requestAnimationFrame(drawConnectors));
}

// ─── CARD ────────────────────────────────────────
function buildCard(topic) {
  return `
    <div class="mm-card" data-area="${topic.area}" style="--c:${topic.color};--rgb:${topic.rgb}">
      <div class="cloud-veil">
        <div class="cb cb1"></div>
        <div class="cb cb2"></div>
        <div class="cb cb3"></div>
        <div class="veil-hint">
          <i data-lucide="${topic.icon}"></i>
          <span>${topic.label}</span>
        </div>
      </div>
      <div class="mm-card-body">
        <div class="mm-card-head">
          <div class="mm-icon-box">
            <i data-lucide="${topic.icon}"></i>
          </div>
          <h3>${topic.label}</h3>
        </div>
        <p class="mm-desc">${topic.summary}</p>
        <div class="mm-tags">
          ${topic.tags.map(t => `<span>${t}</span>`).join('')}
        </div>
      </div>
    </div>`;
}

// ─── CENTER HUB ─────────────────────────────────
function buildCenter(total, rate, rateColor) {
  return `
    <div class="mm-center" id="mm-center">
      <div class="mm-center-ring"></div>
      <div class="mm-center-inner">
        <div class="mm-center-aws">AWS</div>
        <div class="mm-center-title">Cloud Practitioner</div>
        <div class="mm-center-hr"></div>
        <div class="mm-center-stats">
          <div>
            <div class="mm-cs-val" style="color:#60a5fa">${total}</div>
            <div class="mm-cs-lbl">Acertos</div>
          </div>
          <div class="mm-cs-sep"></div>
          <div>
            <div class="mm-cs-val" style="color:${rateColor}">${rate}%</div>
            <div class="mm-cs-lbl">Taxa</div>
          </div>
        </div>
      </div>
    </div>`;
}

// ─── SVG CONNECTORS ─────────────────────────────
function drawConnectors() {
  const outer = document.getElementById('mm-outer');
  const center = document.getElementById('mm-center');
  const svg = document.getElementById('mm-connectors');
  if (!outer || !center || !svg) return;

  const oRect = outer.getBoundingClientRect();
  const cRect = center.getBoundingClientRect();
  const cx = cRect.left - oRect.left + cRect.width / 2;
  const cy = cRect.top - oRect.top + cRect.height / 2;

  svg.setAttribute('viewBox', `0 0 ${oRect.width} ${oRect.height}`);
  svg.style.width = oRect.width + 'px';
  svg.style.height = oRect.height + 'px';

  let lines = `<defs>
    ${TOPICS.map(t => `
      <linearGradient id="lg-${t.area}" gradientUnits="userSpaceOnUse"
        x1="${cx}" y1="${cy}" x2="0" y2="0">
        <stop offset="0%" stop-color="${t.color}" stop-opacity="0.5"/>
        <stop offset="100%" stop-color="${t.color}" stop-opacity="0.12"/>
      </linearGradient>`).join('')}
  </defs>`;

  document.querySelectorAll('.mm-card').forEach(card => {
    const area = card.dataset.area;
    const topic = TOPICS.find(t => t.area === area);
    if (!topic) return;
    const r = card.getBoundingClientRect();
    const nx = r.left - oRect.left + r.width / 2;
    const ny = r.top - oRect.top + r.height / 2;

    // Update gradient end point
    const grad = svg.querySelector(`#lg-${area}`);
    if (grad) { grad.setAttribute('x2', nx); grad.setAttribute('y2', ny); }

    const mx = (cx + nx) / 2 + (ny - cy) * 0.15;
    const my = (cy + ny) / 2 - (nx - cx) * 0.15;
    lines += `<path d="M${cx},${cy} Q${mx},${my} ${nx},${ny}"
      fill="none" stroke="url(#lg-${area})"
      stroke-width="1.5" stroke-dasharray="5 9" opacity="0.7"/>`;
  });

  svg.innerHTML = lines;
}

// ─── STUBS (no unlock mechanic) ─────────────────
export function checkNewUnlocks() {}

export function registerMapActions() {}
