export const onHardalReady = (callback: () => void) => {
  if (typeof window !== "undefined") {
    if ((window as any).hardal) {
      callback();
    } else {
      window.addEventListener("hardal:ready", callback, { once: true });
    }
  }
};

export const trackEvent = (eventName: string, eventData: Record<string, any> = {}) => {
  onHardalReady(() => {
    try {
      (window as any).hardal.track(eventName, eventData);
      console.log("✅ Hardal event sent:", eventName, eventData);
    } catch (e) {
      console.warn("❌ Hardal track call failed:", e);
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