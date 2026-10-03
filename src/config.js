// JAMB & WAEC CBT Platform configuration
const currentHost = typeof window !== 'undefined' ? window.location.host : 'cbtmasters.guru';
const currentOrigin = typeof window !== 'undefined' ? window.location.origin : 'https://cbtmasters.guru';

export const APP_CONFIG = {
  appName: "JAMB & WAEC CBT Master",
  domain: currentHost || "cbtmasters.guru",
  appUrl: currentOrigin || "https://cbtmasters.guru",
  version: "1.0.0"
};
