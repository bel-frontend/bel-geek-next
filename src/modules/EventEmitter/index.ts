interface EventPayload {
  [key: string]: any;
}

class EventEmitter {
  private isNodeEnvironment: boolean;
  private eventEmitter?: any;
  private store: { [key: string]: any } = {};

  constructor() {
    this.isNodeEnvironment = typeof window === "undefined";

    if (this.isNodeEnvironment) {
      const EventEmitter = require("events");
      this.eventEmitter = new EventEmitter();
    }
  }

  emit(eventName: string, payload?: EventPayload): void {
    if (this.isNodeEnvironment) {
      this.eventEmitter.emit(eventName, { type: eventName, ...payload });
    } else {
      const event = new CustomEvent(eventName, {
        detail: { type: eventName, ...payload },
      });
      window.dispatchEvent(event);
    }
  }

  on(eventName: string, callback: (payload: EventPayload) => void): void {
    if (this.isNodeEnvironment) {
      this.eventEmitter.on(eventName, callback);
    } else {
      window.addEventListener(eventName, (event: Event) => {
        if (event instanceof CustomEvent) {
          callback(event.detail);
        }
      });
    }
  }
  registerReducers(reducers: { [key: string]: (state: any) => any }) {
    Object.keys(reducers).forEach((key) => {
      this.on(key, () => {
        this.store[key] = reducers[key](this.store[key]);
      });
    });
  }
  getState() {
    return this.store;
  }
}

export default EventEmitter;

const globalEventEmitter = new EventEmitter();

export function useDispatch() {
  return (action: { type: string; payload: { [key: string]: any } }) => {
    const { type, payload } = action;
    globalEventEmitter.emit(type, { ...payload });
  };
}

export const useSelector = (selector: (state: any) => any) => {
  const state = globalEventEmitter.getState();
  return { ...selector(state) };
};
