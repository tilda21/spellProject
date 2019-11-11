require("dotenv").config();

const apiKey = process.env.REACT_APP_WORDNIK_KEY;


const getWordOfDay = async (date) => {
    try {
      const rawResponse = await fetch(`https://api.wordnik.com/v4/words.json/wordOfTheDay?date=${date}&api_key=${apiKey}`);
      const resData = await rawResponse.json();
      //console.log(resData)
      return ([resData.word, resData.definitions[0].text, resData.note]);
    }
    catch(e) {
      //console.log(e.message);
    } 
  };

export { getWordOfDay };