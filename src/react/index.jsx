import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App.jsx';

let rootInstance = null;

export function mountReactApp(container, bridgeCallbacks = {}) {
  const target = typeof container === 'string' ? document.getElementById(container) : container;
  if (!target) return null;

  if (!rootInstance) {
    rootInstance = ReactDOM.createRoot(target);
  }

  rootInstance.render(
    <App bridgeCallbacks={bridgeCallbacks} />
  );

  return rootInstance;
}

export function unmountReactApp() {
  if (rootInstance) {
    rootInstance.unmount();
    rootInstance = null;
  }
}

if (typeof window !== 'undefined') {
  window.mountCbtReactApp = mountReactApp;
  window.unmountCbtReactApp = unmountReactApp;
}
