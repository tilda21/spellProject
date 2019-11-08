const getLeaderboard = async () => {
  try {
    const rawResponse = await fetch("/leaderboard");
    const response = await rawResponse.json();
    return response.leaderboard;
  } catch(e) {
    console.log(e.message);
  }
};

const getLeaderboardForCurrentDifficulty = async (difficulty) => {
  try {
    const rawResponse = await fetch(`/leaderboard/${difficulty}`);
    const response = await rawResponse.json();
    return response.leaderboard;
  } catch(e) {
    console.log(e.message);
  }
};

const postToLeaderboard = async (name, points, difficulty, idToDelete) => {
  const options = {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json"
    },
    method: "POST",
    body: JSON.stringify({
      name: name,
      points: points,
      difficulty: difficulty, 
      idToDelete: idToDelete
    })
  };
  try {
    const rawResponse = await fetch("/leaderboard", options);
    const response = await rawResponse.json();
    return response;
  } catch(e) {
    console.log(e.message);
  }

};

export { getLeaderboard, getLeaderboardForCurrentDifficulty, postToLeaderboard };