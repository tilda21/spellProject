import React from "react";
import downArrow from "../../media/down-arrow.png";
import upArrow from "../../media/up-arrow.png";
import "./Leaderboard.css";

class Leaderboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      leaderboard: this.props.leaderboard,
      order: "desc"
    }
    this.difficulty = {
      1: "Newbie",
      2: "Intermediate",
      3: "Nightmare"
    }
  }
  
  renderLeaderboard = () => {
    return this.state.leaderboard.map(player => {
      return (
        <tr key={player._id}>
          <td>{player.name}</td>
          <td>{this.difficulty[player.difficulty]}</td>
          <td>{player.points}</td>
        </tr>
      )
    })
  };

  sortBy = (e) => {
    // get if we are sorting by difdiculty or points, and the respective sibling
    const sortTerm = e.target.parentElement.innerText.toLowerCase();
    const sibling = e.target.parentElement.innerText.toLowerCase() === "difficulty" ? 
                      document.getElementById("points") 
                      : 
                      document.getElementById("difficulty");
    // create a copy of the leaderboard
    const tempLeaderboard = [...this.state.leaderboard];
    // sort the sibling in desc order before sorting the clicked element
    tempLeaderboard.sort((a, b) => b[sibling.id] - a[sibling.id]);
    tempLeaderboard.sort((a, b) => this.state.order === "asc" ? b[sortTerm] - a[sortTerm] : a[sortTerm] - b[sortTerm]);
    // update the state with sorted array
    this.setState(prevState => {
      return {
        leaderboard: tempLeaderboard,
        order: prevState.order === "asc" ? "desc" : "asc"
      }
    })
    // change the arrow direction on both siblings
    sibling.src = downArrow;
    e.target.src = e.target.src === upArrow ? downArrow : upArrow;
  }

  render() {
    return (
     <>
        <div id="leaderTable" className="container mt-2 py-4 pl-5 pr-5">
          <table className="table table-sm table-hover">
            <thead>
              <tr><th colSpan="3"><h5>Leaderboard</h5></th></tr>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Difficulty<img id="difficulty" onClick={this.sortBy} src={downArrow} alt=""/></th>
                <th scope="col">Points<img id="points" onClick={this.sortBy} src={downArrow} alt=""/></th>
              </tr>
            </thead>
            <tbody>
              {this.renderLeaderboard()}
            </tbody>
          </table>
        </div>
        <div style={{height:"10px"}}></div>
      </>

    )
  }
};

export default Leaderboard;