import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentQuestion: 1,
  answers: {},
  flaggedQuestions: [],
  timeRemaining: 59 * 60 + 33
};

const questionSlice = createSlice({
  name: "question",
  initialState,
  reducers: {
    nextQuestion: (state) => {
      state.currentQuestion += 1;
    },
    prevQuestion: (state) => {
      state.currentQuestion -= 1;
    },
    setQuestion: (state, action) => {
      state.currentQuestion = action.payload;
    },
    selectAnswer: (state, action) => {
      const { questionNumber, optionIndex } = action.payload;
      state.answers[questionNumber] = optionIndex;
    },
    toggleFlag: (state, action) => {
      const questionNumber = action.payload;
      if (state.flaggedQuestions.includes(questionNumber)) {
        state.flaggedQuestions = state.flaggedQuestions.filter(
          q => q !== questionNumber
        );
      } else {
        state.flaggedQuestions.push(questionNumber);
      }
    },
    decreaseTimer: (state) => {
      if (state.timeRemaining > 0) {
        state.timeRemaining -= 1;
      }
    }
  }
});

export const {
  nextQuestion,
  prevQuestion,
  setQuestion,
  selectAnswer,
  toggleFlag,
  decreaseTimer
} = questionSlice.actions;

export default questionSlice.reducer;
