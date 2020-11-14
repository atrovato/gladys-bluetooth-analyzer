const loading = require('loading-cli');

const { quit } = require('./quit');
const { welcome } = require('./welcome');
const { serviceSelection } = require('./serviceSelection');
const { scanPeripherals } = require('./scanPeripherals');
const { listPeripherals } = require('./listPeripherals');

const STEP_KEYS = {
  WELCOME: 'welcome',
  SERVICE_SELECTION: 'service_selection',
  SCAN_PERIPHERALS: 'scan_peripherals',
  LIST_PERIPHERALS: 'list_peripherals',
};

const STEPS = {
  [STEP_KEYS.WELCOME]: {
    run: welcome,
    next: STEP_KEYS.SERVICE_SELECTION,
  },
  [STEP_KEYS.SERVICE_SELECTION]: {
    run: serviceSelection,
    next: STEP_KEYS.SCAN_PERIPHERALS,
  },
  [STEP_KEYS.SCAN_PERIPHERALS]: {
    run: scanPeripherals,
    next: STEP_KEYS.LIST_PERIPHERALS,
  },
  [STEP_KEYS.LIST_PERIPHERALS]: {
    run: listPeripherals,
    previous: STEP_KEYS.SCAN_PERIPHERALS,
  },
};

class StepExecutor {
  constructor(bluetooth) {
    this.bluetooth = bluetooth;
    this.results = {};
  }

  async runAndNext() {
    if (!this.currentStep) {
      this.quit();
    }

    const step = STEPS[this.currentStep];
    const result = await step.run(this);

    this.results[this.currentStep] = result;
    if (result && result.previousStep) {
      this.currentStep = step.previous;
    } else {
      this.currentStep = step.next;
    }

    return this.runAndNext();
  }

  async run() {
    this.running = true;
    this.currentStep = STEP_KEYS.WELCOME;
    return this.runAndNext();
  }

  async startLoading(text = 'Loading') {
    this.loading = loading({ text, frames: ['◐', '◓', '◑', '◒'], interval: 200 }).start();
  }

  async stopLoading() {
    this.loading.stop();
  }

  quit(message) {
    quit(message);
  }
}

module.exports = StepExecutor;