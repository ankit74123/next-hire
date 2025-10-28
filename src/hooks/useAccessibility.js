import { useEffect } from 'react';

/**
 * Custom hook for keyboard navigation
 * @param {Object} callbacks - Object containing keyboard event handlers
 * @param {Array} deps - Dependencies array for useEffect
 */
export const useKeyboardNavigation = (callbacks, deps = []) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      const { key, keyCode, shiftKey, ctrlKey, altKey } = event;

      // ESC key - typically closes modals/dropdowns
      if (key === 'Escape' || keyCode === 27) {
        callbacks.onEscape?.();
      }

      // ENTER key - typically submits forms or selects items
      if (key === 'Enter' || keyCode === 13) {
        callbacks.onEnter?.(event);
      }

      // SPACE key - typically toggles checkboxes or buttons
      if (key === ' ' || keyCode === 32) {
        callbacks.onSpace?.(event);
      }

      // ARROW keys - typically for navigation
      if (key === 'ArrowUp' || keyCode === 38) {
        callbacks.onArrowUp?.(event);
      }

      if (key === 'ArrowDown' || keyCode === 40) {
        callbacks.onArrowDown?.(event);
      }

      if (key === 'ArrowLeft' || keyCode === 37) {
        callbacks.onArrowLeft?.(event);
      }

      if (key === 'ArrowRight' || keyCode === 39) {
        callbacks.onArrowRight?.(event);
      }

      // TAB key - typically for focus management
      if (key === 'Tab' || keyCode === 9) {
        if (shiftKey) {
          callbacks.onShiftTab?.(event);
        } else {
          callbacks.onTab?.(event);
        }
      }

      // Keyboard shortcuts with modifiers
      if (ctrlKey || altKey) {
        callbacks.onShortcut?.(event, { key, ctrlKey, altKey, shiftKey });
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, deps);
};

/**
 * Custom hook for managing focus trap within a modal/dialog
 * @param {React.RefObject} containerRef - Reference to the container element
 * @param {boolean} isActive - Whether the focus trap is active
 */
export const useFocusTrap = (containerRef, isActive = true) => {
  useEffect(() => {
    if (!isActive || !containerRef.current) return;

    const container = containerRef.current;
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    // Focus first element when modal opens
    firstElement?.focus();

    const handleTabKey = (e) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        }
      } else {
        // Tab
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };

    container.addEventListener('keydown', handleTabKey);

    return () => {
      container.removeEventListener('keydown', handleTabKey);
    };
  }, [containerRef, isActive]);
};

/**
 * Custom hook to announce messages to screen readers
 * @returns {Function} announce - Function to announce a message
 */
export const useScreenReader = () => {
  const announce = (message, priority = 'polite') => {
    const announcement = document.createElement('div');
    announcement.setAttribute('role', 'status');
    announcement.setAttribute('aria-live', priority); // 'polite' or 'assertive'
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only'; // Visually hidden but readable by screen readers
    announcement.textContent = message;

    document.body.appendChild(announcement);

    // Remove after announcement
    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  };

  return announce;
};

/**
 * Custom hook for managing skip links
 * @param {string} mainContentId - ID of the main content element
 */
export const useSkipLink = (mainContentId = 'main-content') => {
  useEffect(() => {
    const skipLink = document.createElement('a');
    skipLink.href = `#${mainContentId}`;
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-primary-600 focus:text-white focus:px-4 focus:py-2 focus:rounded';
    
    // Insert at the beginning of body
    document.body.insertBefore(skipLink, document.body.firstChild);

    return () => {
      if (document.body.contains(skipLink)) {
        document.body.removeChild(skipLink);
      }
    };
  }, [mainContentId]);
};

export default {
  useKeyboardNavigation,
  useFocusTrap,
  useScreenReader,
  useSkipLink
};
