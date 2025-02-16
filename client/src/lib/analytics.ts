/** Event types that can be tracked in the application */
type EventNames = 'page_view' | 'button_click' | 'form_submit' | 'calculation' |
  'select_currency' | 'share' | 'theme_change' | 'external_link_click';

/** Parameters that can be passed with any event */
type EventParams = {
  [key: string]: string | number | boolean | null | undefined;
};

/**
 * Analytics service for tracking user interactions and events
 * Implements the Singleton pattern to ensure only one instance exists
 */
class AnalyticsService {
  private static instance: AnalyticsService;

  private constructor() { }

  /**
   * Gets the singleton instance of the AnalyticsService
   * @returns {AnalyticsService} The singleton instance
   */
  public static getInstance(): AnalyticsService {
    if (!AnalyticsService.instance) {
      AnalyticsService.instance = new AnalyticsService();
    }
    return AnalyticsService.instance;
  }

  /**
   * Tracks a custom event with optional parameters
   * @param {EventNames} eventName - The name of the event to track
   * @param {EventParams} [eventParams] - Optional parameters to include with the event
   */
  public trackEvent(eventName: EventNames, eventParams?: EventParams): void {
    if (typeof window === 'undefined' || !window.gtag) {
      console.warn('Google Analytics not initialized');
      return;
    }

    try {
      window.gtag('event', eventName, {
        ...eventParams,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      console.error('Error tracking event:', error);
    }
  }

  /**
   * Tracks a page view event
   * @param {string} pageName - The name of the page being viewed
   */
  public pageView(pageName: string): void {
    this.trackEvent('page_view', { page_name: pageName });
  }

  /**
   * Tracks a button click event
   * @param {string} buttonName - The name of the button clicked
   * @param {EventParams} [additionalParams] - Optional additional parameters
   */
  public trackButtonClick(buttonName: string, additionalParams?: EventParams): void {
    this.trackEvent('button_click', {
      button_name: buttonName,
      ...additionalParams,
    });
  }

  /**
   * Tracks a form submission event
   * @param {string} formName - The name of the form submitted
   * @param {EventParams} [additionalParams] - Optional additional parameters
   */
  public trackFormSubmit(formName: string, additionalParams?: EventParams): void {
    this.trackEvent('form_submit', {
      form_name: formName,
      ...additionalParams,
    });
  }

  /**
   * Tracks a calculation event
   * @param {string} calculationType - The type of calculation performed
   * @param {EventParams} [additionalParams] - Optional additional parameters
   */
  public trackCalculation(calculationType: string, additionalParams?: EventParams): void {
    this.trackEvent('calculation', {
      calculation_type: calculationType,
      ...additionalParams,
    });
  }

  /**
   * Tracks a share event
   * @param {string} shareMethod - The method used to share (e.g., 'whatsapp', 'email')
   * @param {string} contentType - The type of content being shared
   */
  public trackShare(shareMethod: string, contentType: string): void {
    this.trackEvent('share', {
      share_method: shareMethod,
      content_type: contentType,
    });
  }

  // Añadir antes del cierre de la clase AnalyticsService

  /**
   * Tracks a theme change event
   * @param {string} newTheme - The new theme selected ('dark' | 'light' | 'system')
   * @param {string} previousTheme - The previous theme
   */
  public trackThemeChange(newTheme: string, previousTheme: string): void {
    this.trackEvent('theme_change', {
      new_theme: newTheme,
      previous_theme: previousTheme,
      timestamp: new Date().toISOString()
    });
  }

  /**
 * Tracks when a user clicks on an external link
 * @param {string} linkName - The name or identifier of the link (e.g., 'linkedin', 'github')
 * @param {string} url - The URL of the external link
 */
  public trackExternalLinkClick(linkName: string, url: string): void {
    this.trackEvent('external_link_click', {
      link_name: linkName,
      url: url,
      timestamp: new Date().toISOString()
    });
  }
}

// Add type declaration for window.gtag
declare global {
  interface Window {
    gtag: (command: string, eventName: string, params?: any) => void;
    dataLayer: any[];
  }
}

// Export a singleton instance
export const analytics = AnalyticsService.getInstance();