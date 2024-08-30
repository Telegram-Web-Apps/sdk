import type { Computed, Signal } from '@telegram-apps/signals';

import { $eventSignalsCache } from '@/events/listening/signalFor.js';
import { $lastEvent, $lastEventCleanup } from '@/events/lastEvent.js';
import { $targetOrigin } from '@/methods/$targetOrigin.js';
import { $debug } from '@/debug.js';

function resetAndDestroy(s: Signal<any> | Computed<any>): void {
  'reset' in s && s.reset();
  s.destroy();
}

/**
 * Resets the package state. Normally, you don't use this function in your application.
 * We are using it only for test purposes.
 */
export function resetPackageState() {
  [
    ...Object.values($eventSignalsCache()),
    $eventSignalsCache,
    $lastEvent,
    $lastEventCleanup,
    $targetOrigin,
    $debug,
  ].forEach(resetAndDestroy);
}