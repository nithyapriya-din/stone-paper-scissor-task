
## 📜 Table of contents

-
- Your users should be able to:
  - ☑️ View the optimal layout for the game depending on their device's screen size
  - ☑️ Play Rock, Paper, Scissors against the computer
  - ☑️ Maintain the state of the score after refreshing the browser _(optional)_
  - ☑️ **Bonus**: Play Rock, Paper, Scissors, Lizard, Spock against the computer _(optional)_

### Screenshot

<img src="https://user-images.githubusercontent.com/59930625/151719996-dd1f7c3c-ba21-42f2-82f9-7629bdc40798.png" alt="Screenshot 1">
<img src="https://user-images.githubusercontent.com/59930625/151719994-f6c9d5ab-9809-41a7-b200-fb330564c6a3.png" alt="Screenshot 2">

### Links


- Live Site URL: [Link](https://scissors-paper-rock-game.netlify.app/)



### Built with

- React JS
- React Router
- Redux
- Material UI
- CSS custom properties

### What I learned

#### 😎 Proud of this CSS:

The all CSS winner animation!

```css
/* Animation On Result */
.game__side button {
  position: relative;
}

.game__side button::before,
.game__side button::after {
  content: "";
  position: absolute;
  z-index: -1;
  border-radius: 50%;
  animation: ripple 0.75s cubic-bezier(0.65, 0, 0.34, 1) 0s 1;
}

.game__side button::before {
  height: calc(332px * 1.75);
  width: calc(332px * 1.75);
  border: 84px solid hsl(223, 44%, 21%); /* Outer Ring */
}
.game__side button::after {
  height: calc(332px * 1.28);
  width: calc(332px * 1.28);
  background: hsl(224, 33%, 28%); /* Inner Ring */
  border: 78px solid hsl(223, 39%, 24%); /* Middle Ring */
}

@keyframes ripple {
  from {
    transform: scale3d(0, 0, 1);
  }
  to {
    transform: scale3d(1, 1, 1);
  }
}
```

#### 😎 Proud of this JS:

The whole Redux store structure and the actions have to be precise. The timing for calling the functions should be well thought.

`gameSlice.js :`

```js
const winners = [
  // winners[userVal] = [compVals that make user win]
  [2, 3],
  [0, 4],
  [1, 3],
  [1, 4],
  [0, 2],
];

export const gameSlice = createSlice({
  name: "game",
  initialState: {
    userVal: null,
    compVal: -1,
    result: null,
    score: 0,
  },
  reducers: {
    setUserVal: (state, action) => {
      state.userVal = action.payload;
    },
    setCompVal: (state) => {
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
    },
  },
});
```

`Main.js :`

```js
const openGame = (usersPick) => {
  dispatch(setUserVal(usersPick));

  setTimeout(() => {
    dispatch(setCompVal());

    setTimeout(() => {
      dispatch(calculateResult());
      dispatch(updateScore());
    }, 500);
  }, 1000);

  history.push("/game");
};
```

## 🔎 Useful resources

#### 🧩 Stackoverflow:

- [Generate random number between two numbers in JavaScript](https://stackoverflow.com/a/24152886/12302691)

#### 📖 mdn:

- [Web Local Storage](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API)
- [Session Storage](https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage)

#### 🧠 Inspiration for Animation:

- [Ripple Animation Button](https://codepen.io/chrisunderdown/pen/JeXNoz)

#### ⚡ Deployment Bug:

- [How to Deploy a Routed React App to GitHub Pages](https://www.freecodecamp.org/news/deploy-a-react-app-to-github-pages/)

  ##deployment:
  1.https://rockpaperscisor.netlify.app/

  ##AWS DEPLOYMENT LINK:https://main.d2xk83je4322kw.amplifyapp.com/


  
