import React from 'react';

class Counter extends React.Component {
  state = {
    couter: 0
  }

  onInrease = () => {
    this.setState((oldState) => {
      return {
      couter: oldState.couter + 1
    }
    })
  };
  onDecrease = () => {
    this.setState((oldState) => {
      return {
        couter: oldState.couter - 1
      }
    })
  }

  componentDidMount = () => {
    this.my_interval = setInterval(() => {}, 2000)

    console.log('DID MOUNT')
  }
  shouldComponentUpdate = (newProps, newState) => {
    if(newState.couter !== this.state.couter){
      return true   
    } else {
      return false
    } 
  }
  componentDidUpdate = () => {
    console.log('DID UPDATE')
  }
  componentWillUnmount = () => {
    clearInterval(this.my_interval)
  }

  render() {
    return (
      <div>
        <p>{this.state.couter}</p>
        <button onClick={this.onInrease}>Increase</button>
        <button onClick={this.onDecrease}>Decrease</button>
      </div>
    );
  }
};

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state to trigger fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log error or send logging data to log management tool
    //logErrorToMyService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Render fallback UI
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children; 
  }
}

class App extends React.Component {
  state = {
    showCouter: true
  }

  onToggleCouter = () => {
    this.setState((oldState) => {
      return {
        showCouter: !oldState.showCouter
      }
    })
  }
  
  render() {
    const content = this.state.showCouter ? <Counter /> : null;
    return (
      <>
        <ErrorBoundary>
          {content}
          <button onClick={this.onToggleCouter}>Toggle counter</button>
        </ErrorBoundary>
      </>
    );
  }
};

export default App;
