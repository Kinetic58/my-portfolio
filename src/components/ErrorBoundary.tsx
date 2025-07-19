import React from 'react';

interface ErrorBoundaryState {
  hasError: boolean;
}

export class ErrorBoundary extends React.Component<
  React.PropsWithChildren<{}>,
  ErrorBoundaryState
> {
  constructor(props: React.PropsWithChildren<{}>) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('3D Scene Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 cyber-grid opacity-30"></div>
          <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-cyber rounded-full opacity-20 animate-pulse-glow"></div>
          <div className="absolute bottom-20 right-20 w-24 h-24 bg-gradient-neon rounded-full opacity-30 animate-float"></div>
          <div className="absolute top-1/2 left-10 w-16 h-16 bg-cyber-purple/30 rounded-full animate-float-delayed"></div>
          <div className="absolute bottom-1/2 right-10 w-20 h-20 bg-cyber-blue/20 rounded-full animate-pulse-glow"></div>
        </div>
      );
    }

    return this.props.children;
  }
}