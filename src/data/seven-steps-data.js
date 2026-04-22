// ═══════════════════════════════════════════════
// 7 PASSOS — AWS CLOUD PRACTITIONER (CLF-C02)
// ═══════════════════════════════════════════════

export const SEVEN_STEPS = [
  {
    id: 'cloud-general',
    step: 1,
    label: 'Conceitos Gerais de Cloud',
    icon: 'cloud',
    color: '#5ba3ff',
    rgb: '91,163,255',
    children: [
      {
        icon: 'layers',
        label: 'Modelos de Serviço & Implantação',
        summary: 'IaaS: você gerencia SO e acima (ex: EC2). PaaS: você gerencia só o app (ex: Beanstalk). SaaS: produto pronto (ex: WorkMail). Implantação: Cloud pura, On-Premises ou Híbrida.',
        tags: ['IaaS', 'PaaS', 'SaaS', 'Cloud', 'On-Premises', 'Híbrido'],
      },
      {
        icon: 'trending-up',
        label: 'Benefícios da Nuvem',
        summary: 'Troque Capex por Opex. Elimina superprovisioning. Alta disponibilidade, elasticidade automática e escala global em minutos. Modelo pay-as-you-go reduz custos operacionais.',
        tags: ['Capex → Opex', 'Agilidade', 'Elasticidade', 'Pay-as-you-go', 'Alcance Global'],
      },
      {
        icon: 'layout',
        label: 'Well-Architected Framework',
        summary: '6 pilares: Excelência Operacional, Segurança, Confiabilidade, Eficiência de Performance, Otimização de Custos e Sustentabilidade. AWS CAF: 6 perspectivas (Negócio, Pessoas, Governança, Plataforma, Segurança, Operações).',
        tags: ['6 Pilares', 'AWS CAF', 'WAF Tool', 'Design Principles'],
      },
      {
        icon: 'globe',
        label: 'Infraestrutura Global AWS',
        summary: '33+ Regiões, 105+ AZs (mínimo 3 por região). 600+ Edge Locations para CloudFront e Route 53. Critérios de escolha: latência, conformidade regulatória, preço, serviços disponíveis.',
        tags: ['Regiões', 'AZs', 'Edge Locations', 'Local Zones', 'Wavelength'],
      },
      {
        icon: 'refresh-cw',
        label: 'Modelo de Responsabilidade Compartilhada',
        summary: 'AWS: segurança DA nuvem (hardware, data centers, rede física, hipervisor). CLIENTE: segurança NA nuvem (dados, IAM, configs de rede, SO de instâncias, criptografia de aplicação).',
        tags: ['AWS cuida', 'Cliente cuida', 'Segurança DA nuvem', 'Segurança NA nuvem'],
      },
    ],
  },

  {
    id: 'monitoring',
    step: 2,
    label: 'Monitoração e Analytics',
    icon: 'activity',
    color: '#FF9900',
    rgb: '255,153,0',
    children: [
      {
        icon: 'activity',
        label: 'Amazon CloudWatch',
        summary: 'Métricas, logs, alarmes e dashboards para todos os serviços AWS. Alarmes disparam ações (SNS, Auto Scaling). Container Insights para ECS/EKS. Retenção de logs configurável.',
        tags: ['Métricas', 'Logs', 'Alarmes', 'Dashboards', 'Container Insights'],
      },
      {
        icon: 'eye',
        label: 'AWS CloudTrail',
        summary: 'Auditoria de TODAS as chamadas de API AWS: quem fez o quê, quando e de onde. Habilitado por padrão. Integra com S3 para retenção longa. Detecta atividade suspeita e garante compliance.',
        tags: ['API Audit', 'Quem/O quê/Quando', 'Compliance', 'Trail por região/global'],
      },
      {
        icon: 'clipboard-check',
        label: 'AWS Config',
        summary: 'Conformidade contínua de configurações de recursos AWS. Config Rules (gerenciadas ou customizadas) detectam drift de configuração. Histórico completo de mudanças. Complementa o CloudTrail.',
        tags: ['Conformidade', 'Config Rules', 'Drift Detection', 'Histórico de Recursos'],
      },
      {
        icon: 'star',
        label: 'Trusted Advisor',
        summary: '5 categorias: Otimização de Custos, Performance, Segurança, Tolerância a Falhas e Limites de Serviço. Acesso completo exige plano Business ou superior. Recomendações em tempo real.',
        tags: ['Custo', 'Performance', 'Segurança', 'Tolerância a Falhas', 'Business+'],
      },
      {
        icon: 'bar-chart-2',
        label: 'Analytics (Athena, Kinesis, QuickSight)',
        summary: 'Athena: SQL serverless direto no S3 (paga por query). Kinesis: streaming de dados em tempo real (Data Streams, Firehose). QuickSight: BI visual serverless sem infra. Glue: ETL serverless.',
        tags: ['Athena (SQL no S3)', 'Kinesis (streaming)', 'QuickSight (BI)', 'Glue (ETL)'],
      },
    ],
  },

  {
    id: 'storage-db',
    step: 3,
    label: 'Storage e Database',
    icon: 'hard-drive',
    color: '#a78bfa',
    rgb: '167,139,250',
    children: [
      {
        icon: 'archive',
        label: 'Amazon S3',
        summary: 'Armazenamento de objetos com 11 noves (99,999999999%) de durabilidade. Classes: Standard, Intelligent-Tiering, Standard-IA, One Zone-IA, Glacier Instant, Glacier Flexible, Deep Archive. Lifecycle Policies para automatizar transições.',
        tags: ['Objetos', '11 Noves', 'Classes de Storage', 'Glacier', 'Lifecycle'],
      },
      {
        icon: 'disc',
        label: 'EBS, EFS & Storage Gateway',
        summary: 'EBS: armazenamento em bloco persistente para EC2, vinculado a uma AZ, persiste após stop/start. EFS: sistema NFS elástico multi-AZ, cresce automaticamente. Storage Gateway: ponte híbrida entre on-premises e S3/EBS.',
        tags: ['EBS (bloco/AZ)', 'EFS (arquivo/NFS)', 'Storage Gateway', 'Snow Family'],
      },
      {
        icon: 'database',
        label: 'RDS & Aurora',
        summary: 'RDS gerenciado: MySQL, PostgreSQL, Oracle, SQL Server, MariaDB. Multi-AZ = alta disponibilidade com failover automático. Read Replica = escala de leitura horizontal. Aurora: compatível com MySQL/PostgreSQL, até 5x mais rápido, serverless opcional.',
        tags: ['RDS Multi-AZ', 'Read Replica', 'Aurora', 'Failover Automático'],
      },
      {
        icon: 'table',
        label: 'Amazon DynamoDB',
        summary: 'NoSQL totalmente serverless com latência de milissegundos em qualquer escala. Key-value e documentos. DAX: cache em memória com latência de microsegundos. Tabelas globais para replicação multi-região.',
        tags: ['NoSQL', 'Serverless', 'DAX (cache)', 'Tabelas Globais', 'Milissegundos'],
      },
      {
        icon: 'git-branch',
        label: 'Bancos Especializados',
        summary: 'ElastiCache: in-memory Redis ou Memcached para sessões e cache de queries. Redshift: data warehouse em escala de petabytes, compatível com SQL. Neptune: grafos. Timestream: séries temporais. DocumentDB: MongoDB-compatível.',
        tags: ['ElastiCache', 'Redshift (DW)', 'Neptune (grafos)', 'Timestream', 'DocumentDB'],
      },
    ],
  },

  {
    id: 'compute',
    step: 4,
    label: 'Computação em Nuvem',
    icon: 'cpu',
    color: '#22c55e',
    rgb: '34,197,94',
    children: [
      {
        icon: 'server',
        label: 'Amazon EC2',
        summary: 'VMs escaláveis. Tipos de instância: propósito geral, computação, memória, armazenamento, acelerado. Modelos de preço: On-Demand (flexível), Reserved 1/3 anos (até 72% off), Spot (até 90%, interruptível), Dedicated Hosts. Patch do SO é responsabilidade do cliente.',
        tags: ['On-Demand', 'Reserved (72% off)', 'Spot (90% off)', 'Dedicated', 'Auto Scaling'],
      },
      {
        icon: 'zap',
        label: 'AWS Lambda',
        summary: 'Serverless orientado a eventos. Zero gestão de servidor. Cobrança por número de invocações e tempo de execução (ms). Escala automática para qualquer volume. Ideal para processamento S3, API Gateway, DynamoDB Streams.',
        tags: ['Serverless', 'Orientado a Eventos', 'Invocação + ms', 'Escala Automática'],
      },
      {
        icon: 'box',
        label: 'Containers (ECS / EKS / Fargate)',
        summary: 'ECS: orquestração de containers nativa AWS. EKS: Kubernetes gerenciado. Fargate: engine serverless para ECS e EKS — elimina gestão de instâncias EC2. ECR: registry de imagens Docker privado e gerenciado.',
        tags: ['ECS (AWS nativo)', 'EKS (Kubernetes)', 'Fargate (serverless)', 'ECR (registry)'],
      },
      {
        icon: 'sliders',
        label: 'Elastic Beanstalk & LightSail',
        summary: 'Beanstalk: PaaS que provisiona automaticamente EC2, ALB, Auto Scaling e RDS. Ideal para devs sem expertise em infra. LightSail: VPS simplificado com preço fixo mensal. Ideal para projetos simples e migrações.',
        tags: ['Beanstalk (PaaS)', 'LightSail (VPS)', 'Sem gestão de infra', 'Preço fixo'],
      },
    ],
  },

  {
    id: 'pricing',
    step: 5,
    label: 'Preço e Suporte',
    icon: 'dollar-sign',
    color: '#f59e0b',
    rgb: '245,158,11',
    children: [
      {
        icon: 'tag',
        label: 'Modelos de Precificação',
        summary: 'On-Demand: máxima flexibilidade, sem compromisso. Reserved Standard (até 72% off) vs Convertible (66%, mais flexível). Spot: até 90%, AWS pode interromper com 2 min de aviso. Savings Plans: compromisso $/hora, flexível por família de instância ou por conta.',
        tags: ['On-Demand', 'Reserved (1/3 anos)', 'Spot (interruptível)', 'Savings Plans'],
      },
      {
        icon: 'bar-chart-2',
        label: 'Ferramentas de Gestão de Custos',
        summary: 'Cost Explorer: visualização, tendências e previsão de 12 meses. AWS Budgets: alertas proativos por custo, uso, reserva ou Savings Plans. CUR (Cost and Usage Report): dados granulares por hora, exportados ao S3. Pricing Calculator: estimativas antes de contratar.',
        tags: ['Cost Explorer', 'AWS Budgets', 'CUR', 'Pricing Calculator', 'Cost Anomaly'],
      },
      {
        icon: 'building',
        label: 'Organizations & Faturamento Consolidado',
        summary: 'Faturamento consolidado: uma fatura para todas as contas + descontos por volume agregado. Organizations + OUs + SCPs como guardrails preventivos. Control Tower automatiza landing zones com guardrails de segurança e conformidade.',
        tags: ['Faturamento Consolidado', 'Organizations', 'OUs', 'SCPs', 'Control Tower'],
      },
      {
        icon: 'headphones',
        label: 'Planos de Suporte',
        summary: 'Basic: gratuito, Trusted Advisor limitado, sem suporte técnico. Developer: $29/mês, 1 contato, horário comercial, <12h geral/<24h sistema. Business: $100/mês, Trusted Advisor completo, telefone 24/7, <1h urgente. Enterprise On-Ramp: $5.500/mês. Enterprise: TAM dedicado, <15min crítico.',
        tags: ['Basic (grátis)', 'Developer ($29)', 'Business ($100)', 'Enterprise On-Ramp', 'Enterprise (TAM)'],
      },
    ],
  },

  {
    id: 'security',
    step: 6,
    label: 'Segurança',
    icon: 'shield',
    color: '#ef4444',
    rgb: '239,68,68',
    children: [
      {
        icon: 'key',
        label: 'AWS IAM',
        summary: 'Usuários, Grupos, Roles e Políticas (inline vs managed). Princípio do menor privilégio. NUNCA use a conta root para operações diárias. MFA obrigatório para root. IAM Credential Report para auditoria. Permission Boundaries para limitar delegates.',
        tags: ['Usuários', 'Grupos', 'Roles', 'Políticas', 'MFA', 'Menor Privilégio'],
      },
      {
        icon: 'shield-check',
        label: 'Proteção & Detecção de Ameaças',
        summary: 'GuardDuty: ameaças via ML analisando CloudTrail, VPC Flow Logs e DNS. Inspector: CVEs em EC2 e imagens de container. Macie: descobre e protege dados sensíveis (PII) no S3. Shield Standard: DDoS L3/L4 gratuito. WAF: camada 7, bloqueia SQL injection e XSS.',
        tags: ['GuardDuty', 'Inspector', 'Macie', 'Shield Standard', 'WAF', 'Security Hub'],
      },
      {
        icon: 'lock',
        label: 'Criptografia',
        summary: 'KMS: chaves simétricas e assimétricas gerenciadas pela AWS, integrado com EBS, S3, RDS. CloudHSM: hardware dedicado para requisitos regulatórios específicos. STS: credenciais temporárias de curta duração. Secrets Manager: armazena e rotaciona secrets automaticamente.',
        tags: ['KMS', 'CloudHSM', 'STS', 'Secrets Manager', 'ACM (certificados SSL)'],
      },
      {
        icon: 'file-check',
        label: 'Conformidade & Artefatos',
        summary: 'AWS Artifact: portal self-service para relatórios de conformidade (ISO 27001, SOC 1/2/3, PCI-DSS). AWS Compliance Programs: 143+ certificações. Auditores podem acessar relatórios diretamente para processos de compliance.',
        tags: ['AWS Artifact', 'ISO 27001', 'SOC 1/2/3', 'PCI-DSS', 'Compliance Programs'],
      },
    ],
  },

  {
    id: 'networking',
    step: 7,
    label: 'Networking',
    icon: 'wifi',
    color: '#06b6d4',
    rgb: '6,182,212',
    children: [
      {
        icon: 'network',
        label: 'Amazon VPC',
        summary: 'Rede virtual isolada na AWS. Sub-redes públicas (com IGW) e privadas (com NAT Gateway). Security Group: stateful, nível de instância, default nega tudo. NACL: stateless, nível de sub-rede, regras numeradas. VPC Peering e Transit Gateway para conexões entre VPCs.',
        tags: ['Sub-redes Públicas/Privadas', 'SG (stateful)', 'NACL (stateless)', 'NAT Gateway', 'VPC Peering'],
      },
      {
        icon: 'wifi',
        label: 'CloudFront & Route 53',
        summary: 'CloudFront: CDN global com 600+ PoPs, entrega conteúdo com baixa latência, integra com Shield WAF. Route 53: DNS altamente disponível, roteamento por latência, geolocalização, failover e ponderado. Integra com Alias Records para serviços AWS.',
        tags: ['CloudFront (CDN)', 'Route 53 (DNS)', '600+ PoPs', 'Failover', 'Geolocalização'],
      },
      {
        icon: 'arrow-left-right',
        label: 'ELB & API Gateway',
        summary: 'ALB (Application LB): HTTP/HTTPS, roteamento por caminho e host (L7). NLB (Network LB): TCP/UDP, ultra-baixa latência, IPs estáticos (L4). GLB (Gateway LB): inspeciona tráfego com appliances de segurança. API Gateway: expõe APIs REST, HTTP e WebSocket com throttling e caching.',
        tags: ['ALB (L7)', 'NLB (L4)', 'GLB', 'API Gateway', 'WebSocket'],
      },
      {
        icon: 'cable',
        label: 'Conectividade Híbrida',
        summary: 'Direct Connect: link dedicado físico entre on-premises e AWS, consistente, sem internet pública. AWS VPN (Site-to-Site): túnel IPSec criptografado sobre internet, mais barato. Transit Gateway: hub central que conecta múltiplas VPCs e redes on-premises com uma única peça.',
        tags: ['Direct Connect (dedicado)', 'VPN Site-to-Site', 'Transit Gateway', 'On-premises → AWS'],
      },
    ],
  },
];
