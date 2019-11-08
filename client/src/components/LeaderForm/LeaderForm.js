import React from "react";
import { postToLeaderboard } from "../../util/getLeaderboardHelper";
import { withRouter } from "react-router-dom";
import "./LeaderForm.css";

class LeaderForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "",
      submited: false
    }
  }

  onChange = (e) => {
    this.setState({ input: e.target.value });
  }
  
  onSubmit = (e) => {
    e.preventDefault();
    postToLeaderboard(this.state.input.toUpperCase(), this.props.points, this.props.difficulty, this.props.idToDelete)
      .then(res => this.props.history.push("/"));
  }
  

  render() {
    return (
      <div className="leaderFormContainer">
        <form className="leaderForm" onSubmit={this.onSubmit}>
          <h4 id="gameOverMessageLeader">Congratulations on your <span>{this.props.points}</span> points! You made it into the leaderboard...</h4>
          <input onChange={this.onChange} type="text" value={this.state.input} minLength="3" maxLength="8" required autoFocus/>
          <button type="submit">Add me</button>
        </form>
      </div>
    )
  }
}

export default withRouter(LeaderForm);