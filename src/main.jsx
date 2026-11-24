import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import ErrorBoundary from './components/ErrorBoundary';
import { LanguageProvider } from './context/LanguageContext';
import './index.css';

// ─── Google Translate DOM Mutation Safety Patch ───────────────────
// Google Chrome Translate modifies the DOM directly by replacing/wrapping
// text nodes with <font> tags. When React subsequently reconciles, calls to
// removeChild, insertBefore, or replaceChild fail with "NotFoundError: The node
// to be removed is not a child of this node" and crashes the entire React root,
// resulting in a black screen. This patch handles reparented nodes gracefully.
if (typeof Node === 'function' && Node.prototype) {
  const originalRemoveChild = Node.prototype.removeChild;
  Node.prototype.removeChild = function (child) {
    if (child.parentNode !== this) {
      if (child.parentNode) {
        try {
          return child.parentNode.removeChild(child);
        } catch {
          return child;
        }
      }
      return child;
    }
    return originalRemoveChild.apply(this, arguments);
  };

  const originalInsertBefore = Node.prototype.insertBefore;
  Node.prototype.insertBefore = function (newNode, referenceNode) {
    if (referenceNode && referenceNode.parentNode !== this) {
      if (referenceNode.parentNode) {
        try {
          return referenceNode.parentNode.insertBefore(newNode, referenceNode);
        } catch {
          return this.appendChild(newNode);
        }
      }
      return this.appendChild(newNode);
    }
    return originalInsertBefore.apply(this, arguments);
  };

  const originalReplaceChild = Node.prototype.replaceChild;
  Node.prototype.replaceChild = function (newChild, oldChild) {
    if (oldChild.parentNode !== this) {
      if (oldChild.parentNode) {
        try {
          return oldChild.parentNode.replaceChild(newChild, oldChild);
        } catch {
          return this.appendChild(newChild);
        }
      }
      return this.appendChild(newChild);
    }
    return originalReplaceChild.apply(this, arguments);
  };
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <LanguageProvider>
        <App />
      </LanguageProvider>
    </ErrorBoundary>
  </React.StrictMode>
);
