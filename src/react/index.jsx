import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App.jsx';

let rootInstance = null;

export function mountReactApp(container, bridgeCallbacks = {}) {
  const target = typeof container === 'string' ? document.getElementById(container) : container;
  if (!target) return null;

  // If a root already existed on this target, safely unmount or reset
  try {
    if (rootInstance) {
      rootInstance.unmount();
      rootInstance = null;
    }
  } catch (err) {
    // If the DOM container was cleared by CBT or Result view (vanilla JS), ignore the unmount warning
    rootInstance = null;
  }

  target.innerHTML = '';
  rootInstance = ReactDOM.createRoot(target);

  rootInstance.render(
    <App bridgeCallbacks={bridgeCallbacks} />
  );

  return rootInstance;
}

export function unmountReactApp() {
  if (rootInstance) {
    try {
      rootInstance.unmount();
    } catch (e) {
      // ignore
    }
    rootInstance = null;
  }
}

if (typeof window !== 'undefined') {
  window.mountCbtReactApp = mountReactApp;
  window.unmountCbtReactApp = unmountReactApp;
}
