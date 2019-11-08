import React from "react";
import { Link } from "react-router-dom";
import "./StartMenu.css";
import Leaderboard from "../Leaderboard/Leaderboard";
import { getLeaderboard } from "../../util/getLeaderboardHelper";

class StartMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      leaderboard: [],
    };
  }
  
  async componentDidMount() {
    const leaderboard = await getLeaderboard();
    this.setState({ leaderboard: leaderboard });
  }

  handleDifficultyClick = (e) => {
    this.props.handleDifficultyChange(e.target.innerHTML);
  };
  
  render() {
    const { difficulty, seconds } = this.props;
    const { leaderboard } = this.state;

    return (
      <>
        <h1>Spelling Masta</h1>
        <ul id="difficultyList">
          <li onClick={this.handleDifficultyClick} className={difficulty === "Newbie" ? "active" : ""}>Newbie</li>
          <li onClick={this.handleDifficultyClick} className={difficulty === "Intermediate" ? "active" : ""}>Intermediate</li>
          <li onClick={this.handleDifficultyClick} className={difficulty === "Nightmare" ? "active" : ""}>Nightmare</li>
        </ul>
        <Link to={{ pathname: '/board', state: { difficulty: difficulty.toLowerCase(), seconds: seconds } }}><button className="startButton">Start</button></Link>
        {leaderboard.length > 0 && <Leaderboard leaderboard={leaderboard}/>}
      </>
    );
  }
}

export default StartMenu;