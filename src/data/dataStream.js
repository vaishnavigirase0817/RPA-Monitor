// src/data/dataStream.js

const DEPARTMENTS = ['Finance', 'HR', 'IT', 'Operations', 'Sales'];
const REGIONS = ['NA', 'EMEA', 'APAC', 'LATAM'];
const BOT_TYPES = ['Attended', 'Unattended', 'Hybrid'];
const PRIORITIES = ['Low', 'Medium', 'High', 'Critical'];
const STATUSES = ['Running', 'Warning', 'Failed', 'Stopped', 'Completed'];
const ENVIRONMENTS = ['Production', 'Staging', 'Development'];
const OWNERS = ['Alice Chen', 'Bob Smith', 'Carol Davis', 'David Lee', 'Eve Martinez'];
const TRIGGERS = ['Schedule', 'API', 'Manual', 'Event'];
const TAGS_POOL = ['Finance', 'Critical', 'Production', 'Automation', 'AI', 'High Priority', 'Legacy', 'Nightly'];

// Helper to get random item
const sample = (arr) => arr[Math.floor(Math.random() * arr.length)];
const sampleMultiple = (arr, count) => {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};
const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// Generate 500+ initial rows
const generateInitialData = (count = 550) => {
  return Array.from({ length: count }, (_, i) => {
    const revenue = randomInt(1000, 50000) * (Math.random() > 0.5 ? 1 : 0);
    const opCost = randomInt(100, 5000);
    const budget = opCost * randomInt(2, 5);
    return {
      id: `PRC-${1000 + i}`,
      name: `Enterprise Process ${i + 1}`,
      department: sample(DEPARTMENTS),
      region: sample(REGIONS),
      botType: sample(BOT_TYPES),
      priority: sample(PRIORITIES),
      status: sample(STATUSES),
      progress: randomInt(0, 100),
      records: randomInt(100, 10000),
      errors: randomInt(0, 50),
      revenue,
      cpu: randomInt(0, 100),
      memory: randomInt(100, 16000), // MB
      duration: randomInt(1, 300), // minutes
      
      // New fields for Inspector Panel
      botId: `BOT-${randomInt(100, 999)}`,
      owner: sample(OWNERS),
      environment: sample(ENVIRONMENTS),
      version: `1.${randomInt(0,5)}.${randomInt(0,9)}`,
      description: `Automated processing for ${sample(DEPARTMENTS)} records in ${sample(REGIONS)}.`,
      queueLength: randomInt(0, 500),
      latency: randomInt(10, 1500), // ms
      throughput: randomInt(10, 500), // records/sec
      successRate: randomInt(85, 100),
      failureRate: randomInt(0, 15),
      operationalCost: opCost,
      estimatedSavings: opCost * randomInt(1, 4),
      budget: budget,
      roi: (((revenue + (opCost * 2)) - opCost) / opCost) * 100,
      workflowName: `WF_Process_${i + 1}`,
      trigger: sample(TRIGGERS),
      retryCount: randomInt(0, 3),
      lastExecution: new Date(Date.now() - randomInt(10000, 86400000)).toISOString(),
      nextExecution: new Date(Date.now() + randomInt(10000, 86400000)).toISOString(),
      dependencies: [`PRC-${randomInt(1000, 1500)}`, `PRC-${randomInt(1000, 1500)}`],
      executionPath: `/workflows/${sample(DEPARTMENTS).toLowerCase()}/proc_${i+1}.xaml`,
      tags: sampleMultiple(TAGS_POOL, randomInt(2, 5))
    };
  });
};

class DataStream {
  constructor() {
    this.data = generateInitialData(550);
    this.subscribers = new Set();
    this.intervalId = null;
    this.isRunning = false;
  }

  // Subscribe to updates
  subscribe(callback) {
    this.subscribers.add(callback);
    // Send initial data immediately
    callback(this.data);
    return () => this.subscribers.delete(callback);
  }

  // Start the 200ms stream
  start() {
    if (this.isRunning) return;
    this.isRunning = true;
    
    this.intervalId = setInterval(() => {
      this.tick();
    }, 200);
  }

  // Pause the stream
  pause() {
    if (!this.isRunning) return;
    this.isRunning = false;
    clearInterval(this.intervalId);
  }

  // Mutate data on tick
  tick() {
    let mutated = false;
    const newData = this.data.map(row => {
      // Only mutate ~5% of rows per tick to simulate live updates
      if (Math.random() > 0.05) return row;
      
      mutated = true;
      const newStatus = Math.random() > 0.9 ? sample(STATUSES) : row.status;
      
      return {
        ...row,
        status: newStatus,
        progress: newStatus === 'Completed' ? 100 : Math.min(100, row.progress + randomInt(0, 5)),
        records: row.records + randomInt(0, 100),
        errors: newStatus === 'Failed' ? row.errors + randomInt(1, 5) : row.errors,
        cpu: randomInt(0, 100),
        memory: Math.max(100, row.memory + randomInt(-100, 100)),
        revenue: row.revenue + randomInt(0, 500),
        queueLength: Math.max(0, row.queueLength + randomInt(-5, 5)),
        latency: Math.max(10, row.latency + randomInt(-50, 50)),
        throughput: Math.max(0, row.throughput + randomInt(-10, 10))
      };
    });

    if (mutated) {
      this.data = newData;
      this.notify();
    }
  }

  notify() {
    const dataRef = this.data;
    this.subscribers.forEach(cb => cb(dataRef));
  }
}

// Export singleton instance
export const dataStream = new DataStream();

// Automatically start the stream on import
dataStream.start();
