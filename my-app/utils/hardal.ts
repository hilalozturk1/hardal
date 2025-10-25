// ...existing code...
function onHardalReady(callback: () => void) {
  if (typeof window === "undefined") {
    console.log("Hardal is not available on the server side.");
    return;
  }

  const checkInterval = setInterval(() => {
    const h = (window as any).hardal;
    if (h && typeof h.track === 'function') {
      clearInterval(checkInterval);
      callback();
    } else {
      // Silent wait (azaltılmış log)
      // console.log("Waiting for Hardal to be ready...");
    }
  }, 300);
}
// ...existing code...
export const trackEvent = (eventName: string, eventData: Record<string, any> = {}) => {
  onHardalReady(() => {
    try {
      (window as any).hardal.track(eventName, eventData);
    } catch (e) {
      console.warn('Hardal track call failed', e);
    }
  });
};

export const identifyUser = (userData: Record<string, any>) => {
  onHardalReady(() => {
    try {
      (window as any).hardal.distinct(userData);
    } catch (e) {
      console.warn('Hardal distinct call failed', e);
    }
  });
};