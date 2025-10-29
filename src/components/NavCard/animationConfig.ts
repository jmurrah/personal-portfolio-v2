export const BASE_ANIMATION_MS = 750;
const BASE_ANIMATION_SECONDS = BASE_ANIMATION_MS / 1000;
const BASE_EASE = [0.16, 1, 0.3, 1] as const;

const overlayDuration = BASE_ANIMATION_SECONDS * 0.4;
const portalDuration = BASE_ANIMATION_SECONDS * 0.5;
const contentDuration = BASE_ANIMATION_SECONDS * 0.6;

export const NAV_CARD_ANIMATION = {
  baseMs: BASE_ANIMATION_MS,
  baseSeconds: BASE_ANIMATION_SECONDS,
  easing: BASE_EASE,
  layout: { type: 'tween', ease: BASE_EASE, duration: BASE_ANIMATION_SECONDS } as const,
  overlay: { duration: overlayDuration } as const,
  portal: { duration: portalDuration } as const,
  content: { duration: contentDuration, ease: BASE_EASE } as const,
  interactionLockMs: Math.round(BASE_ANIMATION_MS * 1.25),
  highlight: { type: 'spring', stiffness: 500, damping: 45 } as const,
} as const;
