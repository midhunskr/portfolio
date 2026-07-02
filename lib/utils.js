/**
 * Small shared helpers. No framework-specific logic.
 */

/**
 * Join class names, dropping falsy values. Lightweight stand-in for
 * `clsx` — sufficient for composing CSS Module classes in JSX, e.g.
 *   cx(styles.pill, isActive && styles.pillActive)
 * @param {...(string|false|null|undefined)} classes
 * @returns {string}
 */
export function cx(...classes) {
  return classes.filter(Boolean).join(' ');
}

/**
 * Clamp a number to an inclusive range.
 * @param {number} value
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
export function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

/**
 * Linear interpolation. Used by the rAF-driven cursor / parallax hooks.
 * @param {number} current
 * @param {number} target
 * @param {number} factor 0..1
 * @returns {number}
 */
export function lerp(current, target, factor) {
  return current + (target - current) * factor;
}
