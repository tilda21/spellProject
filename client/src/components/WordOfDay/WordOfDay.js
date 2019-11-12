import React from "react";
//import GetWordOfDay from "../../util/getWordOfDayHelper";
import { getWordOfDay } from "../../util/getWordOfDayHelper";
import { Link } from "react-router-dom";
import './WordOfDay.css';

class WordOfDay extends React.Component {
    constructor() {
        super();
        this.state = {
            word: '',
            text: '',
            note: '',
            date: '',
        };
    }

    getWordOfDayFn = async () => {

        let day = ("0" + new Date().getDate()).slice(-2);
        //This was done so we could get the day always with two digits
        let month = new Date().getMonth()+1;
        //console.log(month);//There's a problem with the getMonth(), it's returning 10 instead of 11 - check this
        let year = new Date().getFullYear();
        let date = `${year}-${month}-${day}`;

        let GetWordOfDay = await getWordOfDay(date);
        //console.log(GetWordOfDay[0], GetWordOfDay[1], GetWordOfDay[2]);
        let word = GetWordOfDay[0];
        let text = GetWordOfDay[1];
        let note = GetWordOfDay[2]; 
        this.setState({ word: word, text: text, note: note, date: date }); 
    }

    componentDidMount() {
        this.getWordOfDayFn();
    }

    render(){
        
        
        return (
            <>
                <h1 className="title">And the word of the day is:</h1>
                {/* <GetWordOfDay date = {date}/> */}
                <div>
                    <h1 className="word">{this.state.word}</h1>
                    <h2 className="text">{this.state.text}</h2>
                    <h2 className="origin"><i>Origin of the word:</i></h2>
                    <h2 className="originText"><i>{this.state.note}</i></h2>
                </div>
                <h3 className="date"> {this.state.date} </h3> 
                <div className="exit">
                    <Link to="/"><button>HomePage</button></Link>
                </div>
            </>
        )
        
    }

}

export default WordOfDay;