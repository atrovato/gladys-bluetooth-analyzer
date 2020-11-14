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
  },
};

class StepExecutor {
  constructor(bluetooth) {
    this.bluetooth = bluetooth;
  }

  async runAndNext() {
    if (!this.currentStep) {
      this.quit();
    }

    const result = await this.currentStep.run(this);

    this.currentStep = STEPS[this.currentStep.next];
    this.lastResult = result;
    return this.runAndNext();
  }

  async run() {
    this.running = true;
    this.currentStep = STEPS[STEP_KEYS.WELCOME];
    return this.runAndNext();
  }

  quit(message) {
    quit(message);
  }
}

module.exports = StepExecutor;
