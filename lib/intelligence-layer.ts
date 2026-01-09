/**
 * Intelligence Layer - Human-first interactive enhancements
 * 
 * Features:
 * - Predictive Soft Snap: Subtle element translation toward cursor
 * - Focus Dimming: Dim siblings when hovering/focusing interactive elements
 * - Breathing Cursor Halo: Soft radial halo around idle cursor (desktop only)
 * 
 * All effects are additive, removable, and respect accessibility preferences.
 */

// Feature flags - can be disabled via data attributes or environment
const FEATURES = {
  PREDICTIVE_SNAP: true,
  FOCUS_DIMMING: true,
  CURSOR_HALO: true,
} as const;

// Configuration
const CONFIG = {
  // Predictive Soft Snap
  SNAP_MAX_DISTANCE: 3, // pixels
  SNAP_PROXIMITY_THRESHOLD: 80, // pixels from element center
  SNAP_SMOOTHING: 0.15, // 0-1, lower = smoother but slower
  
  // Focus Dimming
  DIM_OPACITY: 0.88, // 0-1, opacity of dimmed siblings
  
  // Cursor Halo
  HALO_SIZE_MIN: 20, // pixels
  HALO_SIZE_MAX: 40, // pixels
  HALO_BREATH_DURATION: 5500, // milliseconds
  HALO_IDLE_DELAY: 1000, // milliseconds before halo appears
  HALO_MOVEMENT_THRESHOLD: 5, // pixels to consider cursor moving
} as const;

// State
let cursorPos = { x: 0, y: 0 };
let cursorVelocity = { x: 0, y: 0 };
let lastCursorPos = { x: 0, y: 0 };
let lastUpdateTime = performance.now();
let animationFrameId: number | null = null;
let haloElement: HTMLElement | null = null;
let isCursorMoving = false;
let cursorIdleTimer: ReturnType<typeof setTimeout> | null = null;
let haloAnimationId: number | null = null;
let prefersReducedMotion = false;

// Interactive element selectors
const INTERACTIVE_SELECTORS = [
  'a[href]',
  'button:not([disabled])',
  '[role="button"]:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
  '.group', // Cards with hover states
  '[data-interactive]', // Explicitly marked elements
  '[class*="cursor-pointer"]', // Elements with cursor-pointer class
].join(', ');

/**
 * Check if reduced motion is preferred
 */
function checkReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Check if device is touch-capable
 */
function isTouchDevice(): boolean {
  if (typeof window === 'undefined') return false;
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}

/**
 * Get element center coordinates
 */
function getElementCenter(element: HTMLElement): { x: number; y: number } {
  const rect = element.getBoundingClientRect();
  return {
    x: rect.left + rect.width / 2,
    y: rect.top + rect.height / 2,
  };
}

/**
 * Calculate distance between two points
 */
function getDistance(
  p1: { x: number; y: number },
  p2: { x: number; y: number }
): number {
  const dx = p2.x - p1.x;
  const dy = p2.y - p1.y;
  return Math.sqrt(dx * dx + dy * dy);
}

/**
 * Clamp value between min and max
 */
function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

/**
 * Linear interpolation
 */
function lerp(start: number, end: number, factor: number): number {
  return start + (end - start) * factor;
}

/**
 * Predictive Soft Snap - Apply subtle translation toward cursor
 */
function applyPredictiveSnap(element: HTMLElement): void {
  if (!FEATURES.PREDICTIVE_SNAP || prefersReducedMotion) return;
  
  // Skip if element has data-no-snap attribute
  if (element.hasAttribute('data-no-snap')) return;
  
  // Skip destructive actions
  const isDestructive =
    element.getAttribute('data-destructive') === 'true' ||
    element.classList.contains('destructive') ||
    element.getAttribute('aria-label')?.toLowerCase().includes('delete') ||
    element.getAttribute('aria-label')?.toLowerCase().includes('remove');
  
  if (isDestructive) return;
  
  const center = getElementCenter(element);
  const distance = getDistance(cursorPos, center);
  
  // Only apply if cursor is within proximity threshold
  if (distance > CONFIG.SNAP_PROXIMITY_THRESHOLD) {
    // Reset transform
    element.style.setProperty('--snap-x', '0px');
    element.style.setProperty('--snap-y', '0px');
    return;
  }
  
  // Calculate direction toward cursor
  const dx = cursorPos.x - center.x;
  const dy = cursorPos.y - center.y;
  
  // Normalize and scale by distance (closer = more movement)
  const proximityFactor = 1 - distance / CONFIG.SNAP_PROXIMITY_THRESHOLD;
  const snapX = (dx / distance) * CONFIG.SNAP_MAX_DISTANCE * proximityFactor;
  const snapY = (dy / distance) * CONFIG.SNAP_MAX_DISTANCE * proximityFactor;
  
  // Smooth interpolation
  const currentX = parseFloat(element.style.getPropertyValue('--snap-x') || '0');
  const currentY = parseFloat(element.style.getPropertyValue('--snap-y') || '0');
  
  const newX = lerp(currentX, snapX, CONFIG.SNAP_SMOOTHING);
  const newY = lerp(currentY, snapY, CONFIG.SNAP_SMOOTHING);
  
  element.style.setProperty('--snap-x', `${newX}px`);
  element.style.setProperty('--snap-y', `${newY}px`);
}

/**
 * Focus Dimming - Dim sibling elements when hovering/focusing
 */
function handleFocusDimming(element: HTMLElement, isActive: boolean): void {
  if (!FEATURES.FOCUS_DIMMING || prefersReducedMotion) return;
  
  // Skip if element has data-no-dim attribute
  if (element.hasAttribute('data-no-dim')) return;
  
  // Find parent container (common patterns)
  const parent = element.closest('[data-interactive-group], .grid, .flex, nav, ul, ol, [role="list"]');
  if (!parent) return;
  
  // Get all interactive siblings
  const siblings = Array.from(parent.querySelectorAll(INTERACTIVE_SELECTORS)).filter(
    (el) => el !== element && el.contains(element) === false && !el.closest('[data-no-dim]')
  ) as HTMLElement[];
  
  siblings.forEach((sibling) => {
    if (isActive) {
      sibling.style.setProperty('--dim-opacity', String(CONFIG.DIM_OPACITY));
      sibling.classList.add('intelligence-dimmed');
    } else {
      sibling.style.removeProperty('--dim-opacity');
      sibling.classList.remove('intelligence-dimmed');
    }
  });
}

/**
 * Create cursor halo element
 */
function createHaloElement(): HTMLElement {
  const halo = document.createElement('div');
  halo.id = 'intelligence-cursor-halo';
  halo.setAttribute('aria-hidden', 'true');
  document.body.appendChild(halo);
  return halo;
}

/**
 * Update cursor halo position and animation
 */
function updateCursorHalo(): void {
  if (!FEATURES.CURSOR_HALO || prefersReducedMotion || isTouchDevice()) {
    if (haloElement) {
      haloElement.style.display = 'none';
    }
    return;
  }
  
  if (!haloElement) {
    haloElement = createHaloElement();
  }
  
  // Position halo at cursor
  haloElement.style.left = `${cursorPos.x}px`;
  haloElement.style.top = `${cursorPos.y}px`;
  
  // Handle idle state
  if (isCursorMoving) {
    haloElement.classList.remove('intelligence-halo-breathing');
    haloElement.style.display = 'none';
  } else {
    haloElement.classList.add('intelligence-halo-breathing');
    haloElement.style.display = 'block';
  }
}

/**
 * Track cursor movement and velocity
 */
function handleMouseMove(event: MouseEvent): void {
  const now = performance.now();
  const deltaTime = Math.max(1, now - lastUpdateTime);
  
  // Update position
  cursorPos.x = event.clientX;
  cursorPos.y = event.clientY;
  
  // Calculate velocity
  const dx = cursorPos.x - lastCursorPos.x;
  const dy = cursorPos.y - lastCursorPos.y;
  const distance = Math.sqrt(dx * dx + dy * dy);
  
  cursorVelocity.x = dx / deltaTime;
  cursorVelocity.y = dy / deltaTime;
  
  // Determine if cursor is moving
  if (distance > CONFIG.HALO_MOVEMENT_THRESHOLD) {
    isCursorMoving = true;
    if (cursorIdleTimer) {
      clearTimeout(cursorIdleTimer);
      cursorIdleTimer = null;
    }
    cursorIdleTimer = setTimeout(() => {
      isCursorMoving = false;
    }, CONFIG.HALO_IDLE_DELAY);
  }
  
  lastCursorPos = { ...cursorPos };
  lastUpdateTime = now;
  
  // Update halo
  updateCursorHalo();
}

/**
 * Main animation loop
 */
function animate(): void {
  if (prefersReducedMotion) {
    animationFrameId = null;
    return;
  }
  
  // Find all interactive elements near cursor
  const interactiveElements = Array.from(
    document.querySelectorAll(INTERACTIVE_SELECTORS)
  ) as HTMLElement[];
  
  interactiveElements.forEach((element) => {
    const center = getElementCenter(element);
    const distance = getDistance(cursorPos, center);
    
    // Only process elements within reasonable distance
    if (distance < CONFIG.SNAP_PROXIMITY_THRESHOLD * 1.5) {
      applyPredictiveSnap(element);
    }
  });
  
  animationFrameId = requestAnimationFrame(animate);
}

/**
 * Find the closest interactive element by checking each selector
 */
function findClosestInteractive(element: HTMLElement | null): HTMLElement | null {
  if (!element) return null;
  
  let current: HTMLElement | null = element;
  const selectors = INTERACTIVE_SELECTORS.split(', ').map(s => s.trim());
  
  while (current) {
    // Check if current element matches any selector
    for (const selector of selectors) {
      try {
        if (current.matches(selector)) {
          return current;
        }
      } catch (e) {
        // Invalid selector, skip
        continue;
      }
    }
    current = current.parentElement;
  }
  
  return null;
}

/**
 * Handle mouse enter on interactive element
 */
function handleMouseEnter(event: MouseEvent): void {
  const target = event.target as HTMLElement;
  const element = findClosestInteractive(target);
  if (element) {
    handleFocusDimming(element, true);
  }
}

/**
 * Handle mouse leave on interactive element
 */
function handleMouseLeave(event: MouseEvent): void {
  const target = event.target as HTMLElement;
  const element = findClosestInteractive(target);
  if (element) {
    handleFocusDimming(element, false);
  }
}

/**
 * Handle focus on interactive element
 */
function handleFocus(event: FocusEvent): void {
  const target = event.target as HTMLElement;
  const element = findClosestInteractive(target);
  if (element) {
    handleFocusDimming(element, true);
  }
}

/**
 * Handle blur on interactive element
 */
function handleBlur(event: FocusEvent): void {
  const target = event.target as HTMLElement;
  const element = findClosestInteractive(target);
  if (element) {
    handleFocusDimming(element, false);
  }
}

/**
 * Initialize intelligence layer
 */
export function initIntelligenceLayer(): () => void {
  if (typeof window === 'undefined') {
    return () => {}; // No-op for SSR
  }
  
  let initTimer: ReturnType<typeof setTimeout> | null = null;
  let domContentLoadedHandler: (() => void) | null = null;
  let mediaQuery: MediaQueryList | null = null;
  let handleReducedMotionChange: ((e: MediaQueryListEvent) => void) | null = null;
  
  // Initialize function
  const init = () => {
    prefersReducedMotion = checkReducedMotion();
    
    // Skip on touch devices for cursor-based effects
    if (isTouchDevice() && FEATURES.CURSOR_HALO) {
      // Halo disabled on touch, but other features can work
    }
    
    // Add event listeners
    document.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseenter', handleMouseEnter, true);
    document.addEventListener('mouseleave', handleMouseLeave, true);
    document.addEventListener('focusin', handleFocus, true);
    document.addEventListener('focusout', handleBlur, true);
    
    // Start animation loop
    if (!prefersReducedMotion) {
      animationFrameId = requestAnimationFrame(animate);
    }
    
    // Setup media query watcher
    mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    handleReducedMotionChange = (e: MediaQueryListEvent) => {
      prefersReducedMotion = e.matches;
      if (prefersReducedMotion) {
        // Clean up animations
        if (animationFrameId) {
          cancelAnimationFrame(animationFrameId);
          animationFrameId = null;
        }
        if (haloElement) {
          haloElement.style.display = 'none';
        }
        // Reset all transforms
        document.querySelectorAll(INTERACTIVE_SELECTORS).forEach((el) => {
          (el as HTMLElement).style.removeProperty('--snap-x');
          (el as HTMLElement).style.removeProperty('--snap-y');
        });
      } else {
        animationFrameId = requestAnimationFrame(animate);
      }
    };
    mediaQuery.addEventListener('change', handleReducedMotionChange);
  };
  
  // Initialize immediately if DOM is ready, otherwise wait
  if (document.readyState === 'loading') {
    domContentLoadedHandler = init;
    document.addEventListener('DOMContentLoaded', domContentLoadedHandler);
  } else {
    // DOM is already ready, but wait a tick for React hydration
    initTimer = setTimeout(init, 0);
  }
  
  // Cleanup function
  return () => {
    if (initTimer) {
      clearTimeout(initTimer);
    }
    if (domContentLoadedHandler) {
      document.removeEventListener('DOMContentLoaded', domContentLoadedHandler);
    }
    
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseenter', handleMouseEnter, true);
    document.removeEventListener('mouseleave', handleMouseLeave, true);
    document.removeEventListener('focusin', handleFocus, true);
    document.removeEventListener('focusout', handleBlur, true);
    
    if (mediaQuery && handleReducedMotionChange) {
      mediaQuery.removeEventListener('change', handleReducedMotionChange);
    }
    
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = null;
    }
    if (cursorIdleTimer) {
      clearTimeout(cursorIdleTimer);
      cursorIdleTimer = null;
    }
    if (haloElement) {
      haloElement.remove();
      haloElement = null;
    }
  };
}
