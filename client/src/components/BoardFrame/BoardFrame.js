import React from "react";
import Timer from "../Timer/Timer";
import Loading from "../Loading/Loading";
import play from "../../media/play.png";
import { Link } from "react-router-dom";
import "./BoardFrame.css";

class BoardFrame extends React.Component {

  componentDidMount() {
    setTimeout(() => {
      this.props.turnAnimationOff();
    }, 1000)
  }

  // handle user input
  handleInputChange = async (e) => {
    this.props.inputChange(e);
  };

  handleWordSubmit = (e) => {
    e.preventDefault();
    // submit word only if audioUrl exists in the parent state
    if (this.props.audioUrl.length) {
      this.props.wordSubmit();
    }
  }

  playSoundAgain = () => {
    // play only if audioUrl exists in the parent state
    if (this.props.audioUrl.length) {
      const audio = new Audio(this.props.audioUrl);
      audio.play();
    }
  }

  render() {
    const { userInput, audioUrl, wordSubmit, difficulty, seconds, lifes, points, animateLifes, animatePoints } = this.props;

    return (
      <>
        {/* Avoid "Uncaught (in promise) DOMException" error */}
        {audioUrl && audioUrl.length > 0 && <audio src={audioUrl} autoPlay/>}
        <h1>Spelling Masta</h1>
        <div className="topbar">
          {/* only render Timer if audioUrl exists */}
          {audioUrl && audioUrl.length > 0 
            ?
            <Timer wordSubmit={wordSubmit} 
              audioUrl={audioUrl} 
              difficulty={difficulty} 
              seconds={seconds} />
            :
            // empty div to keep .topbar-right in place
            <div></div>
          }
          <div className="topbar-right">
            <div className="lifes-points-container">
              <p>Lifes:</p> 
              <p id="lifes" className={animateLifes === "animate" ? "scale-up-center animateLifes" : ""}>
                {lifes}
              </p>
            </div>
            <div className="lifes-points-container">
              <p>Points:</p> 
              <p id="points" className={animatePoints === "animate" ? "scale-up-center animatePoints" : ""}>
                {points}
              </p>
            </div>
          </div>
        </div>
        <main>
          {audioUrl ?
            <figure onClick={this.playSoundAgain}>
              <img height="61" width="61" src={play} alt="Play audio"/>
              <figcaption>Play sound again</figcaption>
            </figure>
            :
            <Loading />
          }
          <form className="wordForm" onSubmit={this.handleWordSubmit}>
            <input type="text" value={userInput} onChange={this.handleInputChange} autoFocus/>
            <button type="submit">Submit</button> 
          </form>
        </main>
        <div className="exit">
          <Link to="/"><button>Quit</button></Link>
        </div>
      </>
    );
  }
}

export default BoardFrame;  