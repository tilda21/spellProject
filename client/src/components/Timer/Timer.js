import React from "react";
import "./Timer.css";

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      seconds: this.props.seconds,
    }
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      if (this.state.seconds > 0) {
        this.setState(prevState => {
          return { seconds: prevState.seconds - 1};
        })   
      } else {
        clearInterval(this.interval);
        this.props.wordSubmit();
      }
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <div id="countdown">
        <div id="countdown-number">{this.state.seconds}</div>
        <svg>
          <circle className={this.props.difficulty} r="18" cx="20" cy="20"></circle>
        </svg>
      </div>
    );
  }
}

export default Timer;