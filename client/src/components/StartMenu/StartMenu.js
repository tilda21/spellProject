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
  handleColorOnClick = (e) => {
    this.props.handleClick(e.target.value);
    //console.log(e.target)
  };

  renderButtons = () => {
    const createButtons = Object.keys(this.props.gradients).map ( (key) => {
      //console.log(this.props.gradients[key])
      let backgroundVal = {
        background: this.props.gradients[key],
      };
      //console.log(<li key= {value} className='colorbutton' onClick={this.handleColorOnClick}><button value={ value } style={ backgroundVal }  className= 'buttonstyle' ></button></li>) 
      return (
          <li key= {key} className='colorbutton' onClick={this.handleColorOnClick}>
            <button value={ this.props.gradients[key] } style={ backgroundVal }  className= 'buttonstyle' >{ key }</button>
          </li>
      );
    })

    return  createButtons
  };
  
  render() {
    const { difficulty, seconds } = this.props;
    const { leaderboard } = this.state;

    return (
      <>
        
        <ul className='colorlist'>
          { this.renderButtons() }
        </ul>
        
        <div className='mainMenu'>

          <div className='titleWord'>
            <div  className='ghost'></div>
            <div className='title'>
              <h1>Spelling Masta</h1>
            </div>  
            <div className='ghost2'>
              <div className='wordofday'>
                <Link to= '/wordofday' className='noUnderline DayWord' ><h3 className='DayWord'>word•of•the•day</h3></Link>
              </div> 
            </div>
          </div>
          
          <ul id="difficultyList">
            <li onClick={this.handleDifficultyClick} className={difficulty === "Newbie" ? "active" : ""}>Newbie</li>
            <li onClick={this.handleDifficultyClick} className={difficulty === "Intermediate" ? "active" : ""}>Intermediate</li>
            <li onClick={this.handleDifficultyClick} className={difficulty === "Nightmare" ? "active" : ""}>Nightmare</li>
          </ul>
          <Link to={{ pathname: '/board', state: { difficulty: difficulty.toLowerCase(), seconds: seconds } }}><button className="startButton">Start</button></Link>
          {leaderboard.length > 0 && <Leaderboard leaderboard={leaderboard}/>}
        </div>
       
      </>
    );
  }
}

export default StartMenu;