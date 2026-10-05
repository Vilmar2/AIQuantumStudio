import { MiniAppItem, DashboardItem, AcademyModule, ShowcaseProject } from '../types';

export const MINI_APPS_DATA: MiniAppItem[] = [
  {
    id: 'dividi-mesa',
    name: 'Dividí Mesa',
    tagline: 'División inteligente de cuentas, platos y propinas al instante',
    description: 'Herramienta web diseñada para resolver el pago grupal en restaurantes en segundos, plato por plato o en partes iguales, con propina y alias de transferencia.',
    category: 'Gastronomía & Finanzas Prácticas',
    timeToImplement: '24 horas',
    impactMetric: '0 confusiones al pagar la cuenta',
    features: [
      'División exacta plato por plato o en partes iguales',
      'Cálculo configurable de propina del mozo (10%, 15%, personalizada)',
      'Copia instantánea de alias bancario / CVU para transferencia',
      'Exportación del desglose para compartir en WhatsApp',
    ],
    interactiveType: 'iframe-embed',
    embedUrl: 'https://dividimesa.netlify.app/',
    demoEnabled: true,
    fullAccessProtected: true,
    protectedFeatures: [
      'Exportación automática de comprobante y detalle a WhatsApp',
      'Historial de cierres de mesa y turnos para el restaurante',
      'Integración con alias de cobro dinámico y CBU/CVU',
    ],
  },
  {
    id: 'tip-quantum',
    name: 'Divisor de Propinas & Turnos',
    tagline: 'Una Mini App para dividir una cuenta o propinas de equipo al instante',
    description: 'Calcula en segundos el reparto exacto de propinas según horas trabajadas por puesto (cocina, salón, barra) o divide cuentas entre amigos con cálculo de propina sugerida.',
    category: 'Gastronomía & Utilidades',
    timeToImplement: '48 horas',
    impactMetric: '0 errores en liquidación diaria',
    features: ['Ponderación por puesto y horas', 'Importación de total POS / Mercado Pago', 'Exportación instantánea a WhatsApp'],
    interactiveType: 'tip-calculator'
  },
  {
    id: 'turno-pulse',
    name: 'Turnos para Negocios & Espera',
    tagline: 'Gestión ágil de turnos y filas de espera sin descargar aplicaciones',
    description: 'Los clientes escanean un QR o reservan online. Reciben su posición en la fila en tiempo real y una notificación automática por WhatsApp cuando su mesa o cita está lista.',
    category: 'Servicios & Locales',
    timeToImplement: '72 horas',
    impactMetric: '-40% clientes perdidos por espera',
    features: ['Acceso web instantáneo con QR', 'Avisos directos vía WhatsApp', 'Panel de llamada para recepción en tablet o celular'],
    interactiveType: 'queue-turn'
  },
  {
    id: 'margin-quote',
    name: 'Cotizador Express de Márgenes',
    tagline: 'Herramienta específica para calcular rentabilidad y precio en segundos',
    description: 'Permite a equipos comerciales generar cotizaciones validadas con costos variables, fijos y escala de descuentos protegidos en menos de un minuto.',
    category: 'Herramientas para Negocios',
    timeToImplement: '4 días',
    impactMetric: '3x velocidad de envío de presupuestos',
    features: ['Matriz de costos protegidos', 'Generación de presupuesto en PDF con marca', 'Validación de margen en vivo'],
    interactiveType: 'b2b-margin'
  },
  {
    id: 'kitchen-flow',
    name: 'Monitor de Tiempos & Despacho',
    tagline: 'Comandero digital táctil para barras y cocinas',
    description: 'Reemplaza tickets de papel perdidos por una pantalla táctil que cronometra tiempos de elaboración y alerta demoras en horas pico.',
    category: 'Operaciones',
    timeToImplement: '3 días',
    impactMetric: '-8 min por despacho en horas pico',
    features: ['Código de colores intuitivo', 'Integración salón y take-away', 'Métricas de demoras por cocinero'],
    interactiveType: 'kitchen-flow'
  }
];

export const DASHBOARDS_DATA: DashboardItem[] = [
  {
    id: 'dashboard-01',
    name: 'Executive Sales & Cashflow',
    category: 'Ventas & Tesorería',
    tagline: 'El pulso de tu facturación, cobranzas y caja en una sola pantalla',
    description: 'Toma información dispersa entre bancos, Mercado Pago y facturación, y la centraliza en un tablero ejecutivo en tiempo real.',
    highlightKpi: '$58.4M',
    kpiLabel: 'Facturación Consolidada',
    kpiDelta: '+24.8% vs mes anterior',
    chartType: 'area',
    demoType: 'interactive',
    metrics: [
      { label: 'Ticket Promedio', value: '$62.400', trend: '+12.5%' },
      { label: 'Cobranzas Pendientes', value: '$0 vencidas', trend: 'Al día' },
      { label: 'Margen Operativo', value: '38.2%', trend: '+3.1%' },
      { label: 'Runway de Caja', value: '8.4 meses', trend: 'Saludable' }
    ]
  },
  {
    id: 'dashboard-02',
    name: 'Operations & Fulfillment Cockpit',
    category: 'Operaciones & Logística',
    tagline: 'Tiempos de entrega, incidentes y productividad de equipo',
    description: 'Centraliza pedidos de múltiples plataformas en un solo monitor para evitar demoras y controlar cuellos de botella.',
    highlightKpi: '98.9%',
    kpiLabel: 'SLA de Cumplimiento a Tiempo',
    kpiDelta: 'Meta superada (target 95%)',
    chartType: 'bar',
    demoType: 'interactive',
    metrics: [
      { label: 'Tiempo Medio Entrega', value: '24 min', trend: '-6 min' },
      { label: 'Capacidad Operativa', value: '82%', trend: 'Óptima' },
      { label: 'Incidentes Abiertos', value: '0', trend: '-100%' },
      { label: 'Satisfacción Cliente', value: '4.9 / 5', trend: 'Excelente' }
    ]
  },
  {
    id: 'dashboard-03',
    name: 'Inventory Health & Gross Margin',
    category: 'Stock & Rentabilidad',
    tagline: 'Días de stock por producto, rotación y alertas de reposición',
    description: 'Cruza el ritmo de venta real contra las existencias en depósito para sugerir pedidos antes de que falte mercadería.',
    highlightKpi: '14.2 días',
    kpiLabel: 'Rotación Promedio de Mercadería',
    kpiDelta: '-3.5 días vs período anterior',
    chartType: 'donut',
    demoType: 'interactive',
    metrics: [
      { label: 'Capital Inmovilizado', value: '$8.9M', trend: '-22%' },
      { label: 'Stock Crítico', value: '100% OK', trend: 'Sin roturas' },
      { label: 'Precisión de Inventario', value: '99.2%', trend: '+2.4%' },
      { label: 'Margen Bruto Ponderado', value: '44.5%', trend: '+2.8%' }
    ]
  }
];

export const ACADEMY_LEARNING_AXES = [
  {
    title: 'IA APLICADA',
    desc: 'Cómo aplicar modelos de Inteligencia Artificial para resolver problemas comerciales reales y monetizables.',
  },
  {
    title: 'AUTOMATIZACIÓN',
    desc: 'Conexión de sistemas, APIs y flujos de trabajo para eliminar tareas operativas repetitivas.',
  },
  {
    title: 'PRODUCTIVIDAD',
    desc: 'Metodologías para multiplicar la velocidad de entrega de tu equipo y ahorrar horas hombre cada semana.',
  },
  {
    title: 'HERRAMIENTAS DIGITALES',
    desc: 'Diseño y ensamblado de Mini Apps y tableros interactivos sin pasar meses programando.',
  }
];

export const ACADEMY_MODULES: AcademyModule[] = [
  {
    id: 'mod-1',
    number: '01',
    title: 'Fundamentos de IA Práctica para Negocios',
    duration: '2 semanas',
    focus: 'Pensamiento algorítmico, resolución de problemas y detección de ineficiencias.',
    deliverable: 'Auditoría de procesos y mapa de oportunidades para tu empresa o clientes.'
  },
  {
    id: 'mod-2',
    number: '02',
    title: 'Construcción de Mini Apps sin Fricción',
    duration: '3 semanas',
    focus: 'Diseño de interfaces táctiles y prototipado ágil para usuarios reales.',
    deliverable: 'Tu primera Mini App funcional lista para ser utilizada.'
  },
  {
    id: 'mod-3',
    number: '03',
    title: 'Dashboards Ejecutivos y Visualización de Datos',
    duration: '3 semanas',
    focus: 'Estructuración de métricas clave y storytelling visual en tiempo real.',
    deliverable: 'Un Dashboard interactivo de alto impacto con indicadores reales de negocio.'
  },
  {
    id: 'mod-4',
    number: '04',
    title: 'Automatización de Flujos y Procesos',
    duration: '2 semanas',
    focus: 'Conexión de APIs, webhooks y pipelines para eliminar tareas manuales.',
    deliverable: 'Un circuito automatizado que ahorra horas de trabajo cada semana.'
  }
];

export const SHOWCASE_PROJECTS: ShowcaseProject[] = [
  {
    id: 'showcase-1',
    title: 'Gastronomy Flow Suite',
    clientType: 'Cadena de locales gastronómicos',
    category: 'Mini App',
    result: '+35% rotación de mesas y cálculo de propinas automatizado',
    description: 'Implementación conjunta de turnos digitales y divisor de propinas para eliminar colas y reducir el tiempo de cierre nocturno de 45 a 4 minutos.',
    accentColor: '#00e5ff'
  },
  {
    id: 'showcase-2',
    title: 'Treasury & Liquidity Radar',
    clientType: 'Distribuidora mayorista comercial',
    category: 'Dashboard',
    result: 'Recuperación de $14.2M en cobranzas sin conciliar',
    description: 'Dashboard que unificó 4 fuentes de datos dispersas en una sola pantalla ejecutiva con alertas de cobro en tiempo real.',
    accentColor: '#0066ff'
  },
  {
    id: 'showcase-3',
    title: 'Instant Custom Quote Engine',
    clientType: 'Empresa de fabricación a medida',
    category: 'Solución Digital',
    result: 'De 48 horas de espera a 90 segundos para recibir cotización',
    description: 'Solución digital donde el cliente carga dimensiones y recibe al instante el costo, desglose de materiales y cotización formal.',
    accentColor: '#38bdf8'
  }
];
