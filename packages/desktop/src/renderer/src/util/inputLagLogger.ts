import log from 'electron-log'

// Logs keystrokes that took long to reach the screen, to find typing lag in
// native (NativeBoat) builds. Records only the kind of key, never what was typed.
const SLOW_MS = 50

const keyKind = (key: string): string => (key.length === 1 ? 'char' : key)

const onKeydown = (event: KeyboardEvent): void => {
  const start = performance.now()
  // Time the event spent queued before we saw it, when the clock is comparable.
  const queued = start - event.timeStamp
  requestAnimationFrame(() => {
    const handled = performance.now() - start
    const waited = queued >= 0 && queued < 60000 ? queued : 0
    if (handled + waited >= SLOW_MS) {
      log.warn(
        `[input-lag] ${keyKind(event.key)}: waited ${Math.round(waited)} ms, ` +
          `handled+painted in ${Math.round(handled)} ms`
      )
    }
  })
}

export const startInputLagLogger = (): (() => void) => {
  document.addEventListener('keydown', onKeydown, true)
  return () => document.removeEventListener('keydown', onKeydown, true)
}
