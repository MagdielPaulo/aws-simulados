// ═══════════════════════════════════════════════
// ÁRVORE DE HABILIDADES — AWS Cloud Practitioner
// unlockAt = total de respostas corretas necessárias
// ═══════════════════════════════════════════════

export const NODES = [
  // ROOT
  {
    id: 'root',
    label: 'AWS Cloud',
    sublabel: 'Infraestrutura Global',
    icon: 'cloud',
    summary: 'Infraestrutura global com 33+ regiões, 105+ zonas de disponibilidade e 600+ pontos de presença (PoPs) em todo o mundo.',
    level: 0,
    unlockAt: 0,
    children: ['fundamentos', 'computacao', 'armazenamento', 'database', 'redes', 'seguranca', 'governanca', 'ai'],
  },

  // LEVEL 1
  {
    id: 'fundamentos',
    label: 'Fundamentos',
    sublabel: 'Base conceitual',
    icon: 'book-open',
    summary: 'Modelos de serviço (IaaS/PaaS/SaaS), responsabilidade compartilhada, benefícios da nuvem e AWS CAF.',
    level: 1,
    unlockAt: 0,
    children: ['responsabilidade', 'precificacao', 'well-architected'],
  },
  {
    id: 'computacao',
    label: 'Computação',
    sublabel: 'Processar na nuvem',
    icon: 'cpu',
    summary: 'Da VM tradicional ao serverless. EC2, Lambda, containers e serviços de computação gerenciados.',
    level: 1,
    unlockAt: 5,
    children: ['ec2', 'lambda', 'containers'],
  },
  {
    id: 'armazenamento',
    label: 'Armazenamento',
    sublabel: 'Dados em repouso',
    icon: 'hard-drive',
    summary: 'Objetos, blocos, arquivos e arquivamento. Eleven 9s de durabilidade com S3.',
    level: 1,
    unlockAt: 10,
    children: ['s3', 'ebs-efs', 'backup-glacier'],
  },
  {
    id: 'database',
    label: 'Banco de Dados',
    sublabel: 'Persistência gerenciada',
    icon: 'database',
    summary: 'Relacional, NoSQL, gráfico, séries temporais e em memória — todos gerenciados pela AWS.',
    level: 1,
    unlockAt: 15,
    children: ['rds-aurora', 'dynamodb', 'databases-especiais'],
  },
  {
    id: 'redes',
    label: 'Redes',
    sublabel: 'Conectividade global',
    icon: 'globe',
    summary: 'VPC isolada, CDN global, DNS inteligente, balanceamento de carga e API Gateway.',
    level: 1,
    unlockAt: 20,
    children: ['vpc', 'cdn-dns', 'api-lb'],
  },
  {
    id: 'seguranca',
    label: 'Segurança',
    sublabel: 'Proteção em camadas',
    icon: 'shield',
    summary: 'IAM, criptografia, detecção de ameaças, conformidade e proteção DDoS.',
    level: 1,
    unlockAt: 25,
    children: ['iam', 'protecao', 'criptografia'],
  },
  {
    id: 'governanca',
    label: 'Governança',
    sublabel: 'Controle e visibilidade',
    icon: 'settings',
    summary: 'Organizations, Control Tower, CloudWatch, CloudTrail e Trusted Advisor.',
    level: 1,
    unlockAt: 35,
    children: ['cloudwatch', 'organizations', 'config'],
  },
  {
    id: 'ai',
    label: 'IA & Analytics',
    sublabel: 'Inteligência aplicada',
    icon: 'brain',
    summary: 'Machine learning gerenciado, IA aplicada sem código e análise de dados em escala.',
    level: 1,
    unlockAt: 45,
    children: ['sagemaker', 'ia-aplicada', 'analytics'],
  },

  // LEVEL 2 — Fundamentos
  {
    id: 'responsabilidade',
    label: 'Responsabilidade Compartilhada',
    icon: 'users',
    summary: 'AWS cuida da segurança DA nuvem (hardware, rede física, hipervisor). Cliente cuida da segurança NA nuvem (dados, IAM, SO de instâncias).',
    level: 2,
    unlockAt: 0,
    children: [],
  },
  {
    id: 'precificacao',
    label: 'Precificação & Suporte',
    icon: 'dollar-sign',
    summary: 'Pay-as-you-go, Reserved Instances (até 72% off), Savings Plans, Spot (até 90% off). Planos: Free, Developer, Business, Enterprise On-Ramp, Enterprise.',
    level: 2,
    unlockAt: 3,
    children: [],
  },
  {
    id: 'well-architected',
    label: 'Well-Architected',
    icon: 'layers',
    summary: '6 pilares: Excelência Operacional, Segurança, Confiabilidade, Eficiência de Performance, Otimização de Custos e Sustentabilidade.',
    level: 2,
    unlockAt: 8,
    children: [],
  },

  // LEVEL 2 — Computação
  {
    id: 'ec2',
    label: 'Amazon EC2',
    icon: 'server',
    summary: 'VMs escaláveis. Tipos: On-Demand, Reserved, Spot, Dedicated. Auto Scaling ajusta a frota automaticamente. Patch do SO é responsabilidade do cliente.',
    level: 2,
    unlockAt: 5,
    children: [],
  },
  {
    id: 'lambda',
    label: 'AWS Lambda',
    icon: 'zap',
    summary: 'Serverless orientado a eventos. Sem gestão de servidor. Paga por invocação e ms de execução. Ideal para processamento em resposta a eventos S3, API, etc.',
    level: 2,
    unlockAt: 12,
    children: [],
  },
  {
    id: 'containers',
    label: 'Containers (ECS/EKS/Fargate)',
    icon: 'box',
    summary: 'ECS = orquestração nativa AWS. EKS = Kubernetes gerenciado. Fargate = serverless para containers (sem gestão de instâncias EC2).',
    level: 2,
    unlockAt: 18,
    children: [],
  },

  // LEVEL 2 — Armazenamento
  {
    id: 's3',
    label: 'Amazon S3',
    icon: 'archive',
    summary: 'Armazenamento de objetos com 11 noves de durabilidade. Classes: Standard, Intelligent-Tiering, Standard-IA, One Zone-IA, Glacier Instant, Glacier Flexible, Deep Archive.',
    level: 2,
    unlockAt: 10,
    children: [],
  },
  {
    id: 'ebs-efs',
    label: 'EBS & EFS',
    icon: 'disc',
    summary: 'EBS = armazenamento em bloco persistente para EC2 (anexado a uma AZ). EFS = sistema de arquivos NFS elástico e multi-AZ para workloads compartilhados.',
    level: 2,
    unlockAt: 22,
    children: [],
  },
  {
    id: 'backup-glacier',
    label: 'AWS Backup & Glacier',
    icon: 'save',
    summary: 'AWS Backup centraliza backups de EC2, EBS, RDS, DynamoDB, EFS e S3. Glacier Deep Archive = mais barato por GB, para dados acessados 1-2x/ano.',
    level: 2,
    unlockAt: 28,
    children: [],
  },

  // LEVEL 2 — Database
  {
    id: 'rds-aurora',
    label: 'RDS & Aurora',
    icon: 'database',
    summary: 'RDS gerenciado: MySQL, PostgreSQL, MariaDB, Oracle, SQL Server. Aurora é compatível com MySQL/PostgreSQL e até 5x mais rápido. Multi-AZ = failover automático.',
    level: 2,
    unlockAt: 15,
    children: [],
  },
  {
    id: 'dynamodb',
    label: 'Amazon DynamoDB',
    icon: 'table',
    summary: 'NoSQL totalmente serverless com latência de milissegundos em qualquer escala. Suporta modelos key-value e documentos. DAX para cache em microsegundos.',
    level: 2,
    unlockAt: 25,
    children: [],
  },
  {
    id: 'databases-especiais',
    label: 'Bancos Especializados',
    icon: 'git-branch',
    summary: 'Neptune (grafos), Timestream (séries temporais), DocumentDB (MongoDB-compatível), ElastiCache (in-memory Redis/Memcached), Redshift (data warehouse).',
    level: 2,
    unlockAt: 40,
    children: [],
  },

  // LEVEL 2 — Redes
  {
    id: 'vpc',
    label: 'Amazon VPC',
    icon: 'network',
    summary: 'Rede virtual isolada na AWS. Sub-redes públicas/privadas, Internet Gateway, NAT Gateway, Security Groups (stateful, por instância) e NACLs (stateless, por sub-rede).',
    level: 2,
    unlockAt: 20,
    children: [],
  },
  {
    id: 'cdn-dns',
    label: 'CloudFront & Route 53',
    icon: 'wifi',
    summary: 'CloudFront = CDN global com 600+ PoPs para entrega de conteúdo com baixa latência. Route 53 = DNS altamente disponível com roteamento inteligente e failover.',
    level: 2,
    unlockAt: 30,
    children: [],
  },
  {
    id: 'api-lb',
    label: 'API Gateway & ELB',
    icon: 'arrow-left-right',
    summary: 'API Gateway expõe APIs REST, HTTP e WebSocket. ELB: ALB (HTTP/HTTPS, regras de roteamento), NLB (TCP ultra-baixa latência), GLB (appliances de rede).',
    level: 2,
    unlockAt: 45,
    children: [],
  },

  // LEVEL 2 — Segurança
  {
    id: 'iam',
    label: 'AWS IAM',
    icon: 'key',
    summary: 'Controle de acesso: usuários, grupos, roles, políticas. Princípio do menor privilégio. MFA obrigatório para root. IAM Credential Report lista status de credenciais.',
    level: 2,
    unlockAt: 25,
    children: [],
  },
  {
    id: 'protecao',
    label: 'Proteção & Conformidade',
    icon: 'shield-check',
    summary: 'GuardDuty (ameaças por ML), Inspector (vulnerabilidades EC2/containers), Macie (dados sensíveis S3), Shield (DDoS), WAF (camada 7), Artifact (relatórios ISO/SOC/PCI).',
    level: 2,
    unlockAt: 35,
    children: [],
  },
  {
    id: 'criptografia',
    label: 'Criptografia',
    icon: 'lock',
    summary: 'KMS gerencia chaves de criptografia para EBS, S3, RDS e mais. CloudHSM = HSM dedicado para requisitos regulatórios. STS = credenciais temporárias com escopo mínimo.',
    level: 2,
    unlockAt: 50,
    children: [],
  },

  // LEVEL 2 — Governança
  {
    id: 'cloudwatch',
    label: 'CloudWatch & CloudTrail',
    icon: 'eye',
    summary: 'CloudWatch = métricas, logs, alarmes e dashboards. CloudTrail = auditoria de todas as chamadas de API AWS (who, what, when, where). EventBridge para eventos em tempo real.',
    level: 2,
    unlockAt: 35,
    children: [],
  },
  {
    id: 'organizations',
    label: 'AWS Organizations',
    icon: 'building',
    summary: 'Gestão multi-conta hierárquica. SCPs (Service Control Policies) para guardrails preventivos. Faturamento consolidado. Control Tower para landing zones com guardrails.',
    level: 2,
    unlockAt: 45,
    children: [],
  },
  {
    id: 'config',
    label: 'Config & Trusted Advisor',
    icon: 'clipboard-check',
    summary: 'AWS Config = conformidade contínua de configurações (detectivo). Trusted Advisor = recomendações em segurança, custo, desempenho, tolerância a falhas e limites de serviço.',
    level: 2,
    unlockAt: 55,
    children: [],
  },

  // LEVEL 2 — IA & Analytics
  {
    id: 'sagemaker',
    label: 'Amazon SageMaker',
    icon: 'brain',
    summary: 'Plataforma completa de ML: preparação de dados, treinamento distribuído, tuning automático, deploy de modelos, monitoramento e Feature Store.',
    level: 2,
    unlockAt: 45,
    children: [],
  },
  {
    id: 'ia-aplicada',
    label: 'IA Aplicada',
    icon: 'sparkles',
    summary: 'Rekognition (visão computacional), Polly (texto→fala), Comprehend (NLP), Lex (chatbots), Personalize (recomendações), Translate, Textract (OCR), Kendra (busca).',
    level: 2,
    unlockAt: 55,
    children: [],
  },
  {
    id: 'analytics',
    label: 'Analytics & Big Data',
    icon: 'bar-chart-2',
    summary: 'Athena (SQL serverless no S3), Kinesis (streaming em tempo real), Redshift (data warehouse petabyte-scale), QuickSight (BI), Glue (ETL serverless).',
    level: 2,
    unlockAt: 65,
    children: [],
  },
];

export function getNodeById(id) {
  return NODES.find(n => n.id === id);
}

export function isNodeUnlocked(nodeId, totalCorrect) {
  const node = getNodeById(nodeId);
  return node ? totalCorrect >= node.unlockAt : false;
}
