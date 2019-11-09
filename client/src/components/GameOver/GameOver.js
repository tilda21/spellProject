import React from "react";
import "./GameOver.css";
import LeaderForm from "../LeaderForm/LeaderForm";
import { getLeaderboardForCurrentDifficulty } from "../../util/getLeaderboardHelper";
import { Link } from "react-router-dom";

class GameOver extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      leaderboardForCurrentDifficulty: [],
    }
    this.difficulty = {
      "newbie": 1,
      "intermediate": 2,
      "nightmare": 3
    }
  }

  async componentDidMount() {
    const leaderboardForCurrentDifficulty = await getLeaderboardForCurrentDifficulty(this.difficulty[this.props.difficulty]);
    this.setState({
      leaderboardForCurrentDifficulty: leaderboardForCurrentDifficulty
    })
  }

  render() {
    const { points, difficulty, wrongAnswersArr } = this.props;
    const { leaderboardForCurrentDifficulty } = this.state;
    const lastIdx = leaderboardForCurrentDifficulty.length - 1;
    const idToDelete = leaderboardForCurrentDifficulty.length === 5 ? leaderboardForCurrentDifficulty[lastIdx]._id : undefined;
    const renderLeaderForm = (leaderboardForCurrentDifficulty.length < 5 || points > leaderboardForCurrentDifficulty[lastIdx].points) && points > 0;
    
    return (
      <>
        <h1>Game Over</h1>

        {renderLeaderForm ?
          <LeaderForm difficulty={this.difficulty[difficulty]} points={points} idToDelete={idToDelete}/>
          :
          <h4 id="gameOverMessage" className="m-5">{points > 0 ? "Good joob!" : "Are your speakers on?!"} You made <span>{points}</span> points, keep practicing...</h4>
        }
        
        <div id="gameOverTable" className="container mt-2 py-4 pl-5 pr-5 mb-5">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Your misspellings</th>
                <th scope="col">The correct way</th>
              </tr>
            </thead>
            <tbody>
              {wrongAnswersArr.map((obj, idx) => (
                <tr key={idx}>
                  <td>{idx + 1}</td>
                  <td>{obj.userInput ? obj.userInput : `No user input`}</td>
                  <td>{obj.correctWord}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Link to="/"><button className="playAgainButton">Play Again</button></Link>
      </>
    );
  }
}

export default GameOver;  