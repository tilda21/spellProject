import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import StartMenu from "../StartMenu/StartMenu";
import Board from "../Board/Board";
import "./App.css";
import WordOfDay from "../WordOfDay/WordOfDay";


class App extends React.Component {
  constructor(props) {
    super(props);
    this.seconds = {
      "Newbie": 10,
      "Intermediate": 5,
      "Nightmare": 3 
    }
    this.state = {
      difficulty: "Newbie",
      bgColor: 'linear-gradient(0deg, rgba(175,66,8,0.8498787183440133) 28%, rgba(226,156,37,1) 64%, rgba(60,114,30,0.5296539992428897) 98%)',
    };
  }
  
  handleDifficultyChange = (difficulty) => {
    this.setState({ difficulty: difficulty });
  };
  handleClick = (bgColor) => {
    //console.log('handleClick was called')
		this.setState({
			bgColor: bgColor,
    })
    //console.log(bgColor)
	};

  render() {
    const { difficulty, leaderboard, bgColor } = this.state;
    
    const gradients = {
      Rastafari: "linear-gradient(to right, #FF0000, #FFF200, #1E9600)",
      //ShadesGrey: "linear-gradient(180deg, #2c3e50, #bdc3c7)",
      Christmas: "linear-gradient(45deg, #2f7336, #aa3a38)",
      //Netflix: "linear-gradient(180deg, #8e0e00, #1f1c18)",
      Instagram: "linear-gradient(to right, #833ab4, #fd1d1d, #fcb045)",
      //Midnight: "radial-gradient(circle at center, #232526, #414345, grey)",
      Hypnotize: "repeating-radial-gradient(circle, #7DD279, #7DD279 5px, #7984D2 5px, #7984D2 10px)", 
    }

    return (
      <BrowserRouter>
        <div className="App" style={{background: bgColor}}>
          <Switch>
            
            <Route exact path="/" render={() => 
              <StartMenu 
                handleDifficultyChange={this.handleDifficultyChange} 
                seconds={this.seconds[difficulty]}
                difficulty={difficulty} 
                leaderboard={leaderboard}
                handleClick={this.handleClick}
                bgColor={bgColor}
                gradients={gradients}/>
            }/>

            <Route exact path="/board" render={() => 
              <Board />
            }/>

            <Route exact path="/wordofday" render={() => 
              <WordOfDay />
            }/>
            
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
