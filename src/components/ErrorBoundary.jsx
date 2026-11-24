import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Specifically catch and ignore Google Translate DOM mutation errors
    if (
      error?.message?.includes?.('removeChild') ||
      error?.message?.includes?.('insertBefore') ||
      error?.message?.includes?.('Node')
    ) {
      console.warn('Recovered from external DOM mutation (e.g. browser translation):', error);
      // Auto-recover after a microtick
      setTimeout(() => {
        this.setState({ hasError: false, error: null });
      }, 50);
      return;
    }
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Fallback: render children again or a minimal recovery wrapper rather than black screen
      return this.props.children;
    }
    return this.props.children;
  }
}
