import { Component } from "react";

class ErrorBoundary extends Component {
  state = {
    hasError: false,
  };
  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <h2>Uh oh!</h2>
          <p>
            We're sorry — something's gone wrong.{" "}
            <Link to="/">Go back to the home page</Link>
          </p>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
