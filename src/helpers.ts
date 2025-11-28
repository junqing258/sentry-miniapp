import type { Mechanism, WrappedFunction } from '@sentry/core';
import {
  addBreadcrumb,
  addExceptionMechanism,
  addExceptionTypeValue,
  addNonEnumerableProperty,
  captureException,
  getOriginalFunction,
  htmlTreeAsString,
  markFunctionWrapped,
  normalize,
  withScope,
} from '@sentry/core';

const debounceDuration: number = 1000;
let keypressTimeout: number | undefined;
let lastCapturedEvent: Event | undefined;
let ignoreOnError: number = 0;

/**
 * @hidden
 */
export function shouldIgnoreOnError(): boolean {
  return ignoreOnError > 0;
}

/**
 * @hidden
 */
export function ignoreNextOnError(): void {
  // onerror should trigger before setTimeout
  ignoreOnError += 1;
  setTimeout(() => {
    ignoreOnError -= 1;
  });
}

/**
 * Instruments the given function and sends an event to Sentry every time the
 * function throws an exception.
 *
 * @param fn A function to wrap.
 * @returns The wrapped function.
 * @hidden
 */
export function wrap(
  fn: WrappedFunction,
  options: {
    mechanism?: Mechanism;
  } = {},
  before?: WrappedFunction,
): any {
  // tslint:disable-next-line:strict-type-predicates
  if (typeof fn !== 'function') {
    return fn;
  }

  try {
    // If we're dealing with a function that was previously wrapped, return the original wrapper.
    const wrapper = (fn as WrappedFunction).__sentry_wrapped__;
    if (wrapper) {
      return wrapper as WrappedFunction;
    }

    if (getOriginalFunction(fn)) {
      return fn;
    }
  } catch (_oO) {
    return fn;
  }

  const sentryWrapped: WrappedFunction = function (this: any, ...args: any[]): any {
    if (before && typeof before === 'function') {
      before.apply(this, args);
    }

    try {
      const wrappedArguments = args.map((arg: any) => wrap(arg, options));

      if ((fn as { handleEvent?: unknown }).handleEvent) {
        return (fn as any).handleEvent.apply(this, wrappedArguments);
      }

      return fn.apply(this, wrappedArguments);
    } catch (ex) {
      ignoreNextOnError();

      withScope(scope => {
        scope.addEventProcessor(event => {
          const processedEvent = { ...event };

          if (options.mechanism) {
            addExceptionTypeValue(processedEvent, undefined, undefined);
            addExceptionMechanism(processedEvent, options.mechanism);
          }

          processedEvent.extra = {
            ...processedEvent.extra,
            arguments: normalize(args, 3),
          };

          return processedEvent;
        });

        captureException(ex);
      });

      throw ex;
    }
  };

  // Accessing some objects may throw
  // ref: https://github.com/getsentry/sentry-javascript/issues/1168
  try {
    // tslint:disable-next-line: no-for-in
    for (const property in fn) {
      if (Object.prototype.hasOwnProperty.call(fn, property)) {
        (sentryWrapped as any)[property] = (fn as any)[property];
      }
    }
  } catch (_oO) { } // tslint:disable-line:no-empty

  markFunctionWrapped(sentryWrapped, fn);
  addNonEnumerableProperty(fn, '__sentry_wrapped__', sentryWrapped);

  // Restore original function name (not all browsers allow that)
  try {
    const descriptor = Object.getOwnPropertyDescriptor(sentryWrapped, 'name') as PropertyDescriptor;
    if (descriptor?.configurable) {
      Object.defineProperty(sentryWrapped, 'name', {
        get(): string {
          return (fn as WrappedFunction).name;
        },
      });
    }
  } catch (_oO) {
    /*no-empty*/
  }

  return sentryWrapped;
}

let debounceTimer: number = 0;

/**
 * Wraps addEventListener to capture UI breadcrumbs
 * @param eventName the event name (e.g. "click")
 * @returns wrapped breadcrumb events handler
 * @hidden
 */
export function breadcrumbEventHandler(eventName: string, debounce: boolean = false): (event: Event) => void {
  return (event: Event) => {
    // reset keypress timeout; e.g. triggering a 'click' after
    // a 'keypress' will reset the keypress debounce so that a new
    // set of keypresses can be recorded
    keypressTimeout = undefined;
    // It's possible this handler might trigger multiple times for the same
    // event (e.g. event propagation through node ancestors). Ignore if we've
    // already captured the event.
    // tslint:disable-next-line: strict-comparisons
    if (!event || lastCapturedEvent === event) {
      return;
    }

    lastCapturedEvent = event;

    const captureBreadcrumb = () => {
      let target;

      // Accessing event.target can throw (see getsentry/raven-js#838, #768)
      try {
        target = event.target ? htmlTreeAsString(event.target as Node) : htmlTreeAsString((event as unknown) as Node);
      } catch (e) {
        target = '<unknown>';
      }

      if (target.length === 0) {
        return;
      }

      addBreadcrumb({
        category: `ui.${eventName}`, // e.g. ui.click, ui.input
        message: target,
      });
    };

    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }

    if (debounce) {
      debounceTimer = setTimeout(captureBreadcrumb);
    } else {
      captureBreadcrumb();
    }
  };
}

/**
 * Wraps addEventListener to capture keypress UI events
 * @returns wrapped keypress events handler
 * @hidden
 */
export function keypressEventHandler(): (event: Event) => void {
  // TODO: if somehow user switches keypress target before
  //       debounce timeout is triggered, we will only capture
  //       a single breadcrumb from the FIRST target (acceptable?)
  return (event: Event) => {
    let target;

    try {
      target = event.target;
    } catch (e) {
      // just accessing event properties can throw an exception in some rare circumstances
      // see: https://github.com/getsentry/raven-js/issues/838
      return;
    }

    const tagName = target && (target as HTMLElement).tagName;

    // only consider keypress events on actual input elements
    // this will disregard keypresses targeting body (e.g. tabbing
    // through elements, hotkeys, etc)
    if (!tagName || (tagName !== 'INPUT' && tagName !== 'TEXTAREA' && !(target as HTMLElement).isContentEditable)) {
      return;
    }

    // record first keypress in a series, but ignore subsequent
    // keypresses until debounce clears
    if (!keypressTimeout) {
      breadcrumbEventHandler('input')(event);
    }
    clearTimeout(keypressTimeout);

    keypressTimeout = (setTimeout(() => {
      keypressTimeout = undefined;
    }, debounceDuration) as any) as number;
  };
}
