// ================================================================
// Mock Data — Enterprise RPA Monitor
// ================================================================

// ---- Bot roster ----
export const BOTS = [
  { id: 'BOT-001', name: 'Invoice Processor', type: 'Attended', status: 'Running', cpu: 42, memory: 58, uptime: '12h 34m', tasksCompleted: 1284, successRate: 99.2, lastRun: '2 min ago', department: 'Finance' },
  { id: 'BOT-002', name: 'Email Classifier', type: 'Unattended', status: 'Running', cpu: 31, memory: 44, uptime: '6h 12m', tasksCompleted: 856, successRate: 97.8, lastRun: '30 sec ago', department: 'Operations' },
  { id: 'BOT-003', name: 'Data Migration', type: 'Unattended', status: 'Idle', cpu: 0, memory: 12, uptime: '0h 0m', tasksCompleted: 340, successRate: 95.5, lastRun: '1h ago', department: 'IT' },
  { id: 'BOT-004', name: 'Report Generator', type: 'Attended', status: 'Running', cpu: 67, memory: 72, uptime: '3h 45m', tasksCompleted: 512, successRate: 98.9, lastRun: '15 sec ago', department: 'Analytics' },
  { id: 'BOT-005', name: 'Customer Onboarding', type: 'Unattended', status: 'Error', cpu: 0, memory: 8, uptime: '0h 0m', tasksCompleted: 128, successRate: 88.3, lastRun: '45 min ago', department: 'Sales' },
  { id: 'BOT-006', name: 'Payroll Automator', type: 'Attended', status: 'Running', cpu: 55, memory: 61, uptime: '8h 20m', tasksCompleted: 2100, successRate: 99.7, lastRun: '5 sec ago', department: 'HR' },
  { id: 'BOT-007', name: 'Inventory Sync', type: 'Unattended', status: 'Paused', cpu: 0, memory: 22, uptime: '0h 0m', tasksCompleted: 670, successRate: 96.1, lastRun: '2h ago', department: 'Supply Chain' },
  { id: 'BOT-008', name: 'Compliance Checker', type: 'Attended', status: 'Running', cpu: 38, memory: 50, uptime: '5h 10m', tasksCompleted: 945, successRate: 99.0, lastRun: '1 min ago', department: 'Legal' },
  { id: 'BOT-009', name: 'Ticket Router', type: 'Unattended', status: 'Running', cpu: 25, memory: 35, uptime: '10h 5m', tasksCompleted: 3200, successRate: 98.5, lastRun: '10 sec ago', department: 'Support' },
  { id: 'BOT-010', name: 'PDF Extractor', type: 'Attended', status: 'Idle', cpu: 0, memory: 15, uptime: '0h 0m', tasksCompleted: 210, successRate: 94.8, lastRun: '3h ago', department: 'Finance' },
];

// ---- Processes ----
export const PROCESSES = [
  { id: 'PRC-1001', name: 'Invoice Processing Pipeline', bot: 'BOT-001', status: 'Running', priority: 'High', progress: 78, startTime: '08:30 AM', duration: '2h 14m', records: 1420, errors: 3, department: 'Finance', revenue: 45000 },
  { id: 'PRC-1002', name: 'Email Classification Job', bot: 'BOT-002', status: 'Running', priority: 'Medium', progress: 45, startTime: '09:15 AM', duration: '1h 30m', records: 2800, errors: 12, department: 'Operations', revenue: 12500 },
  { id: 'PRC-1003', name: 'Quarterly Report Gen', bot: 'BOT-004', status: 'Running', priority: 'High', progress: 92, startTime: '07:00 AM', duration: '3h 45m', records: 450, errors: 0, department: 'Analytics', revenue: 84000 },
  { id: 'PRC-1004', name: 'Customer Data Import', bot: 'BOT-005', status: 'Failed', priority: 'Critical', progress: 34, startTime: '10:00 AM', duration: '0h 45m', records: 680, errors: 28, department: 'Sales', revenue: 0 },
  { id: 'PRC-1005', name: 'Payroll Batch Run', bot: 'BOT-006', status: 'Running', priority: 'Critical', progress: 61, startTime: '06:00 AM', duration: '4h 44m', records: 5200, errors: 1, department: 'HR', revenue: 150000 },
  { id: 'PRC-1006', name: 'Inventory Reconciliation', bot: 'BOT-007', status: 'Paused', priority: 'Low', progress: 22, startTime: '11:00 AM', duration: '0h 30m', records: 340, errors: 0, department: 'Supply Chain', revenue: 3200 },
  { id: 'PRC-1007', name: 'Compliance Audit Scan', bot: 'BOT-008', status: 'Running', priority: 'High', progress: 56, startTime: '08:00 AM', duration: '2h 45m', records: 1800, errors: 5, department: 'Legal', revenue: 0 },
  { id: 'PRC-1008', name: 'Support Ticket Routing', bot: 'BOT-009', status: 'Running', priority: 'Medium', progress: 88, startTime: '07:30 AM', duration: '3h 15m', records: 4200, errors: 8, department: 'Support', revenue: 18500 },
  { id: 'PRC-1009', name: 'PDF Data Extraction', bot: 'BOT-010', status: 'Completed', priority: 'Low', progress: 100, startTime: '06:30 AM', duration: '4h 0m', records: 920, errors: 2, department: 'Finance', revenue: 9500 },
  { id: 'PRC-1010', name: 'Data Migration Wave 3', bot: 'BOT-003', status: 'Queued', priority: 'Medium', progress: 0, startTime: '--', duration: '--', records: 0, errors: 0, department: 'IT', revenue: 0 },
  { id: 'PRC-1011', name: 'Vendor Payment Processing', bot: 'BOT-001', status: 'Running', priority: 'High', progress: 67, startTime: '09:00 AM', duration: '1h 45m', records: 890, errors: 1, department: 'Finance', revenue: 112000 },
  { id: 'PRC-1012', name: 'Employee Offboarding', bot: 'BOT-006', status: 'Completed', priority: 'Medium', progress: 100, startTime: '05:00 AM', duration: '5h 44m', records: 120, errors: 0, department: 'HR', revenue: 0 },
];

// ---- KPI definitions ----
export const KPI_DEFINITIONS = [
  { id: 'kpi-1', title: 'Active Bots', value: 6, previousValue: 5, unit: '', icon: '🤖', trend: 'up', color: 'var(--success)' },
  { id: 'kpi-2', title: 'Tasks Completed', value: 10245, previousValue: 9870, unit: '', icon: '✅', trend: 'up', color: 'var(--info)' },
  { id: 'kpi-3', title: 'Success Rate', value: 97.8, previousValue: 96.5, unit: '%', icon: '📊', trend: 'up', color: 'var(--success)' },
  { id: 'kpi-4', title: 'Avg Duration', value: 2.4, previousValue: 2.8, unit: 'min', icon: '⏱️', trend: 'down', color: 'var(--primary-300)' },
  { id: 'kpi-5', title: 'Error Rate', value: 1.2, previousValue: 1.8, unit: '%', icon: '⚠️', trend: 'down', color: 'var(--warning)' },
  { id: 'kpi-6', title: 'Queue Depth', value: 34, previousValue: 42, unit: '', icon: '📋', trend: 'down', color: 'var(--primary-200)' },
];

// ---- Notifications ----
export const NOTIFICATIONS = [
  { id: 'n1', type: 'error', title: 'Bot BOT-005 Failed', message: 'Customer Onboarding bot encountered a critical error during data import.', time: '2 min ago', read: false },
  { id: 'n2', type: 'warning', title: 'High CPU on BOT-004', message: 'Report Generator is using 67% CPU. Consider scaling resources.', time: '8 min ago', read: false },
  { id: 'n3', type: 'success', title: 'PRC-1009 Completed', message: 'PDF Data Extraction finished successfully with 99.8% accuracy.', time: '15 min ago', read: false },
  { id: 'n4', type: 'info', title: 'Scheduled Maintenance', message: 'Server maintenance planned for tonight 11 PM - 1 AM EST.', time: '30 min ago', read: true },
  { id: 'n5', type: 'success', title: 'PRC-1012 Completed', message: 'Employee Offboarding batch completed with zero errors.', time: '1h ago', read: true },
  { id: 'n6', type: 'warning', title: 'License Expiring', message: 'RPA Platform license expires in 15 days. Contact admin.', time: '2h ago', read: true },
  { id: 'n7', type: 'info', title: 'New Bot Deployed', message: 'Ticket Router v2.1 has been deployed successfully.', time: '3h ago', read: true },
  { id: 'n8', type: 'error', title: 'Network Timeout', message: 'BOT-007 lost connection to inventory database for 30 seconds.', time: '4h ago', read: true },
];

// ---- Activity feed events ----
export const ACTIVITY_EVENTS = [
  { id: 'e1', type: 'process_start', message: 'Invoice Processing Pipeline started', bot: 'BOT-001', timestamp: '10:44:12 AM' },
  { id: 'e2', type: 'task_complete', message: 'Batch #1284 processed successfully', bot: 'BOT-001', timestamp: '10:43:58 AM' },
  { id: 'e3', type: 'error', message: 'Connection timeout on data import', bot: 'BOT-005', timestamp: '10:42:30 AM' },
  { id: 'e4', type: 'task_complete', message: 'Email batch classified: 150 items', bot: 'BOT-002', timestamp: '10:41:15 AM' },
  { id: 'e5', type: 'warning', message: 'Memory usage above 70% threshold', bot: 'BOT-004', timestamp: '10:40:00 AM' },
  { id: 'e6', type: 'process_start', message: 'Compliance Audit Scan resumed', bot: 'BOT-008', timestamp: '10:38:45 AM' },
  { id: 'e7', type: 'task_complete', message: 'Payroll records batch #42 done', bot: 'BOT-006', timestamp: '10:37:20 AM' },
  { id: 'e8', type: 'bot_status', message: 'Inventory Sync paused by operator', bot: 'BOT-007', timestamp: '10:35:10 AM' },
  { id: 'e9', type: 'task_complete', message: 'Ticket routing batch completed', bot: 'BOT-009', timestamp: '10:33:55 AM' },
  { id: 'e10', type: 'process_complete', message: 'PDF Data Extraction finished', bot: 'BOT-010', timestamp: '10:30:00 AM' },
];

// ---- Performance data (for charts) ----
export const PERFORMANCE_DATA = {
  hourly: [
    { hour: '6AM', tasks: 120, errors: 2, successRate: 98.3 },
    { hour: '7AM', tasks: 280, errors: 5, successRate: 98.2 },
    { hour: '8AM', tasks: 450, errors: 8, successRate: 98.2 },
    { hour: '9AM', tasks: 620, errors: 6, successRate: 99.0 },
    { hour: '10AM', tasks: 540, errors: 12, successRate: 97.8 },
    { hour: '11AM', tasks: 380, errors: 4, successRate: 98.9 },
    { hour: '12PM', tasks: 290, errors: 3, successRate: 99.0 },
    { hour: '1PM', tasks: 410, errors: 7, successRate: 98.3 },
  ],
  daily: [
    { day: 'Mon', tasks: 4200, errors: 45 },
    { day: 'Tue', tasks: 4800, errors: 38 },
    { day: 'Wed', tasks: 5100, errors: 52 },
    { day: 'Thu', tasks: 4600, errors: 41 },
    { day: 'Fri', tasks: 3900, errors: 33 },
    { day: 'Sat', tasks: 1200, errors: 8 },
    { day: 'Sun', tasks: 800, errors: 5 },
  ],
};

// ---- Navigation items ----
export const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', path: '/', icon: 'dashboard' },
  { id: 'processes', label: 'Processes', path: '/processes', icon: 'processes' },
  { id: 'bots', label: 'Bot Management', path: '/bots', icon: 'bots' },
  { id: 'analytics', label: 'Analytics', path: '/analytics', icon: 'analytics' },
  { id: 'logs', label: 'Activity Logs', path: '/logs', icon: 'logs' },
  { id: 'settings', label: 'Settings', path: '/settings', icon: 'settings' },
];

// ---- Quick action items ----
export const QUICK_ACTIONS = [
  { id: 'qa-1', label: 'Start New Process', icon: '▶', action: 'start_process' },
  { id: 'qa-2', label: 'Deploy Bot', icon: '🚀', action: 'deploy_bot' },
  { id: 'qa-3', label: 'View Reports', icon: '📈', action: 'view_reports' },
  { id: 'qa-4', label: 'Schedule Task', icon: '📅', action: 'schedule_task' },
  { id: 'qa-5', label: 'System Health', icon: '💊', action: 'system_health' },
  { id: 'qa-6', label: 'Export Data', icon: '📤', action: 'export_data' },
];

// ---- Search categories ----
export const SEARCH_CATEGORIES = [
  { category: 'Bots', items: BOTS.map(b => ({ id: b.id, label: b.name, sublabel: b.department, type: 'bot' })) },
  { category: 'Processes', items: PROCESSES.map(p => ({ id: p.id, label: p.name, sublabel: p.status, type: 'process' })) },
  { category: 'Pages', items: NAV_ITEMS.map(n => ({ id: n.id, label: n.label, sublabel: n.path, type: 'page' })) },
];

// ---- System health ----
export const SYSTEM_HEALTH = {
  cpu: { label: 'CPU Usage', value: 42, max: 100, unit: '%', status: 'healthy' },
  memory: { label: 'Memory', value: 6.2, max: 16, unit: 'GB', status: 'healthy' },
  network: { label: 'Network I/O', value: 245, max: 1000, unit: 'Mbps', status: 'healthy' },
  disk: { label: 'Disk Usage', value: 68, max: 100, unit: '%', status: 'warning' },
  activeConnections: { label: 'Connections', value: 142, max: 500, unit: '', status: 'healthy' },
  queueLatency: { label: 'Queue Latency', value: 12, max: 100, unit: 'ms', status: 'healthy' },
};

// ---- User profile ----
export const USER_PROFILE = {
  name: 'Sarah Mitchell',
  email: 'sarah.mitchell@enterprise.com',
  role: 'RPA Administrator',
  avatar: null,
  initials: 'SM',
};

// ---- Settings ----
export const SETTINGS_SECTIONS = [
  {
    id: 'general',
    title: 'General',
    settings: [
      { id: 'auto-refresh', label: 'Auto Refresh Dashboard', type: 'toggle', value: true, description: 'Automatically refresh data every 5 seconds' },
      { id: 'compact-mode', label: 'Compact Mode', type: 'toggle', value: false, description: 'Use compact spacing for high-density view' },
      { id: 'animations', label: 'Enable Animations', type: 'toggle', value: true, description: 'Show smooth animations and transitions' },
    ],
  },
  {
    id: 'notifications',
    title: 'Notifications',
    settings: [
      { id: 'desktop-notif', label: 'Desktop Notifications', type: 'toggle', value: true, description: 'Show browser notifications for critical events' },
      { id: 'sound-alerts', label: 'Sound Alerts', type: 'toggle', value: false, description: 'Play sound for error notifications' },
      { id: 'email-digest', label: 'Email Digest', type: 'toggle', value: true, description: 'Receive daily email summary of activities' },
    ],
  },
  {
    id: 'display',
    title: 'Display',
    settings: [
      { id: 'show-sparklines', label: 'Show Sparklines', type: 'toggle', value: true, description: 'Display mini charts in KPI cards' },
      { id: 'live-feed', label: 'Live Activity Feed', type: 'toggle', value: true, description: 'Show real-time activity stream' },
      { id: 'table-density', label: 'Dense Tables', type: 'toggle', value: false, description: 'Reduce row height in data tables' },
    ],
  },
];

// ---- Log entries ----
export const LOG_ENTRIES = [
  { id: 'log-1', timestamp: '2024-01-15 10:44:12', level: 'INFO', source: 'BOT-001', message: 'Invoice Processing Pipeline started successfully', details: 'Batch size: 500 records' },
  { id: 'log-2', timestamp: '2024-01-15 10:43:58', level: 'INFO', source: 'BOT-001', message: 'Batch #1284 processed — 500/500 records', details: 'Duration: 42s' },
  { id: 'log-3', timestamp: '2024-01-15 10:42:30', level: 'ERROR', source: 'BOT-005', message: 'Connection timeout on data import', details: 'Host: db-prod-03.internal, Timeout: 30s' },
  { id: 'log-4', timestamp: '2024-01-15 10:41:15', level: 'INFO', source: 'BOT-002', message: 'Email batch classified: 150 items', details: 'Spam: 12, Priority: 28, Normal: 110' },
  { id: 'log-5', timestamp: '2024-01-15 10:40:00', level: 'WARN', source: 'BOT-004', message: 'Memory usage above 70% threshold', details: 'Current: 72%, Threshold: 70%' },
  { id: 'log-6', timestamp: '2024-01-15 10:38:45', level: 'INFO', source: 'BOT-008', message: 'Compliance Audit Scan resumed after pause', details: 'Resumed by: admin@enterprise.com' },
  { id: 'log-7', timestamp: '2024-01-15 10:37:20', level: 'INFO', source: 'BOT-006', message: 'Payroll records batch #42 processed', details: '200 employees processed' },
  { id: 'log-8', timestamp: '2024-01-15 10:35:10', level: 'WARN', source: 'BOT-007', message: 'Inventory Sync paused by operator', details: 'Reason: Database maintenance window' },
  { id: 'log-9', timestamp: '2024-01-15 10:33:55', level: 'INFO', source: 'BOT-009', message: 'Ticket routing batch completed', details: '350 tickets routed across 5 queues' },
  { id: 'log-10', timestamp: '2024-01-15 10:30:00', level: 'INFO', source: 'BOT-010', message: 'PDF Data Extraction finished', details: '920 documents, 99.8% accuracy' },
  { id: 'log-11', timestamp: '2024-01-15 10:28:00', level: 'ERROR', source: 'SYSTEM', message: 'Rate limit exceeded on API gateway', details: 'Endpoint: /api/v2/process, Limit: 1000/min' },
  { id: 'log-12', timestamp: '2024-01-15 10:25:00', level: 'INFO', source: 'BOT-006', message: 'Employee Offboarding batch completed', details: '120 records, 0 errors' },
  { id: 'log-13', timestamp: '2024-01-15 10:20:00', level: 'WARN', source: 'SYSTEM', message: 'Disk usage at 68% on primary storage', details: 'Available: 320GB / 1TB' },
  { id: 'log-14', timestamp: '2024-01-15 10:15:00', level: 'INFO', source: 'BOT-001', message: 'Vendor Payment Processing started', details: 'Expected records: 890' },
  { id: 'log-15', timestamp: '2024-01-15 10:10:00', level: 'INFO', source: 'SYSTEM', message: 'Daily backup completed successfully', details: 'Backup size: 4.2GB, Duration: 8m' },
];
