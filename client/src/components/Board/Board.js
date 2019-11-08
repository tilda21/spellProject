import React from "react";
import "./Board.css";
import { getAudioAlternative, getWord } from "../../util/getWordHelper";
import GameOver from "../GameOver/GameOver";
import BoardFrame from "../BoardFrame/BoardFrame";
import { withRouter } from "react-router-dom";

const randomWord = require("random-words");

// const wordArr = ["test", "wild", "code", "school", "programming", "dentist", "expect", "nice", "life", "great"]; 

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInput: "",
      audioUrl: "",
      word: "",
      points: 0,
      lifes: 3,
      animatePoints: "",
      animateLifes: "",
      wrongAnswersArr: [],
    }
  } 

  componentDidMount() { 
    this.getWordFn();
  }
  
  inputChange = async (e) => {
    this.setState({ userInput: e.target.value })
  };

  wordSubmit = async () => {
    const { userInput, word } = this.state;
    // if the user spelled the word correctly
    if (userInput.toLocaleLowerCase() === word.toLocaleLowerCase()) {
      this.setState(prevState => {
        return {
          points: prevState.points + 100,
          userInput: "",
          audioUrl: "",
          word: "",
          animatePoints: "animate",

        }
      }, () => {
        this.getWordFn();
      });
    // if the input is wrong  
    } else {
      this.setState(prevState => {
        return {
          userInput: "",
          audioUrl: "",
          word: "",
          lifes: prevState.lifes - 1,
          animateLifes: "animate",
          wrongAnswersArr: [...prevState.wrongAnswersArr, { userInput: userInput, correctWord: word }]
        }
      }, () => {
        this.getWordFn();
      });
    }    
  }

  getWordFn = async () => {
    if (this.state.lifes > 0) {
      let word = randomWord();
      console.log(word);
      let audioUrl = await getAudioAlternative(word);
      // if there's no audio for the given word, query api for word and audio
      while (!audioUrl) {
        console.log("Requesting API for alternative word");
        word = await getWord();
        audioUrl = await getAudioAlternative(word);
      }

      // const word = wordArr[Math.floor(Math.random() * wordArr.length)];
      // const audioUrl = await getAudioAlternative(word);
      
      this.setState({
        audioUrl: audioUrl, 
        word: word,
      });
    }
  }

  turnAnimationOff = () => {
    this.setState({ 
      animatePoints: "", 
      animateLifes: "",
    });
  }

  render() {
    const { difficulty, seconds } = this.props.location.state;
    const { userInput, lifes, points, audioUrl, wrongAnswersArr } = this.state;
    return (
      <>
        {lifes > 0 ? 
          <BoardFrame key={lifes + points}
            inputChange={this.inputChange} 
            wordSubmit={this.wordSubmit} 
            lifes={lifes} 
            points={points} 
            audioUrl={audioUrl} 
            userInput={userInput}
            // to animate points
            animatePoints={this.state.animatePoints}
            animateLifes={this.state.animateLifes} 
            turnAnimationOff={this.turnAnimationOff}
            // to set difficulty
            difficulty={difficulty}
            seconds={seconds} />
        :
          <GameOver points={points} 
            difficulty={difficulty} 
            wrongAnswersArr={wrongAnswersArr} />
        }
      </>
    );
  }
}

export default withRouter(Board);