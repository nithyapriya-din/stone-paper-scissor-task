import { createSlice } from '@reduxjs/toolkit';

const winners = [
    // winners[userVal] = [compVals that make user win]
    [2, 3], [0, 4], [1, 3], [1, 4], [0, 2]
];

export const gameSlice = createSlice({
    name: 'game',
    initialState: {
      userVal: null,
      compVal: -1,
      result: null,
      score: 0
    },
    reducers: {
        setUserVal: (state, action) => {
            state.userVal = action.payload;
        },
        setCompVal: (state) => {
            // https://stackoverflow.com/a/24152886/12302691
            let res = Math.floor(Math.random() * 5);
            for (let i = 1; res === state.userVal; i++) {
                // To avoid draws
                res = Math.floor(Math.random() * 5);
                if (i > 5) {
                    alert("Something went wrong.");
                    break;
                }
            }
            state.compVal = res;
        },
        calculateResult: (state) => {
            const compVals = winners[state.userVal];

            if (compVals.includes(state.compVal)) {
                state.result = 1; // user wins
            } else {
                state.result = -1; // comp wins
            }
        },
        updateScore: (state) => {
            state.score = parseInt(state.score);
            state.score += parseInt(state.result);
            if (state.score < 0) {
                state.score = 0;
            }
            sessionStorage.setItem("score", state.score);
        },
        setScore: (state) => {
            // Getting the score after page has been refreshed
            state.score = sessionStorage.getItem("score") || 0;
        },
        resetGame: (state) => {
            state.userVal = null;
            state.compVal = -1;
            state.result = null;
        }
    },
});

export const { setUserVal, setCompVal, calculateResult, updateScore, setScore, resetGame } = gameSlice.actions;

export const selectUserVal = (state) => state.game.userVal;
export const selectCompVal = (state) => state.game.compVal;
export const selectResult = (state) => state.game.result;
export const selectScore = (state) => state.game.score;

export default gameSlice.reducer;
