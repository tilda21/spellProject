require("dotenv").config();

const wordnikKey = process.env.REACT_APP_WORDNIK_KEY;
const merriamKey = process.env.REACT_APP_MERRIAM_KEY;

const getWord = async () => {
  try {
    const url = `https://api.wordnik.com/v4/words.json/randomWord?hasDictionaryDef=true&&minDictionaryCount=10&&api_key=${wordnikKey}`;
    const rawResponse = await fetch(url);
    const response = await rawResponse.json();
    return response.word;
  } catch(e) {
    console.log(e.message);
  } 
};

const getAudioAlternative = async (word) => {
  try {
    const rawResponse = await fetch(`https://www.dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=${merriamKey}`);
    const response = await rawResponse.json();
    const audioUrl = "https://media.merriam-webster.com/soundc11/";
    // get the word as written in the API 
    const wordFromApi = response[0].hwi.hw.replace(/\*/g, "");
    // check if the properties exit and random word equals word from API
    if (!response[0].hwi || !response[0].hwi.prs || wordFromApi !== word) {
      return undefined;
    }
    const audioStr = response[0].hwi.prs[0].sound.audio;
    let folder;
    if (audioStr.substring(0, 3) === "bix") {
      folder = "bix/";
    } else if (audioStr.substring(0, 2) === "gg") {
      folder = "gg/";
    } else if (!isNaN(audioStr[0]) || audioStr[0] === /[ !?_-]/g) {
      folder = "number/";
    } else {
      folder = `${audioStr[0]}/`;
    }
    const finalAudioUrl = `${audioUrl}${folder}${audioStr}.wav`;
    return finalAudioUrl;
  } catch(e) {
    console.log(e.message);
  }
}

export { getWord, getAudioAlternative };