const loading = require('loading-cli');
const colors = require('colors');

const { quit } = require('./quit');
const { welcome } = require('./welcome');
const { serviceSelection } = require('./serviceSelection');
const { scanPeripherals } = require('./scanPeripherals');
const { listPeripherals } = require('./listPeripherals');
const { explorePeripheral } = require('./explorePeripheral');
const { executeService } = require('./executeService');
const { summary } = require('./summary');

const STEP_KEYS = {
  WELCOME: 'welcome',
  SERVICE_SELECTION: 'service_selection',
  SCAN_PERIPHERALS: 'scan_peripherals',
  LIST_PERIPHERALS: 'list_peripherals',
  EXPLORE_PERIPHERAL: 'explore_peripheral',
  EXECUTE_SERVICE: 'execute_service',
  SUMMARY: 'summary',
};

const STEPS = {
  [STEP_KEYS.WELCOME]: {
    run: welcome,
    next: STEP_KEYS.SCAN_PERIPHERALS,
  },
  [STEP_KEYS.SERVICE_SELECTION]: {
    run: serviceSelection,
    next: STEP_KEYS.EXECUTE_SERVICE,
  },
  [STEP_KEYS.SCAN_PERIPHERALS]: {
    run: scanPeripherals,
    next: STEP_KEYS.LIST_PERIPHERALS,
  },
  [STEP_KEYS.LIST_PERIPHERALS]: {
    run: listPeripherals,
    previous: STEP_KEYS.SCAN_PERIPHERALS,
    next: STEP_KEYS.EXPLORE_PERIPHERAL,
  },
  [STEP_KEYS.EXPLORE_PERIPHERAL]: {
    run: explorePeripheral,
    previous: STEP_KEYS.LIST_PERIPHERALS,
    next: STEP_KEYS.SERVICE_SELECTION,
  },
  [STEP_KEYS.EXECUTE_SERVICE]: {
    run: executeService,
    previous: STEP_KEYS.LIST_PERIPHERALS,
    next: STEP_KEYS.SUMMARY,
  },
  [STEP_KEYS.SUMMARY]: {
    run: summary,
  },
};

class StepExecutor {
  constructor(bluetooth) {
    this.bluetooth = bluetooth;
    this.result = {};
  }

  async runAndNext() {
    if (!this.currentStep) {
      this.quit();
    }

    const step = STEPS[this.currentStep];
    const result = await step.run(this);

    if (result && result.previousStep) {
      this.currentStep = step.previous;
    } else {
      this.result = { ...this.result, ...result };
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
    this.loading = loading({
      text: colors.magenta(text),
      frames: ['◐', '◓', '◑', '◒'],
      interval: 200,
      color: 'magenta',
    }).start();
  }

  async stopLoading() {
    this.loading.stop();
  }

  quit(message) {
    quit(message);
  }
}

module.exports = StepExecutor;
