import React, { Component } from 'react';
import './App.css';
import data from './data/data';

function Quiz() {
  return (
    <div>
      <h1>Questions:</h1>
      <Question />
    </div>
  );
}

class Question extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      current: 0,
      score: 0,
      questionAnswered: false,
      total: data.length,
      guesses: [],
      correctAnswer: data.map((outer) => outer.correct - 1)
      // -1 because the data.js starts counting on 1 but arrays start on 0
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.selectAnswer = this.selectAnswer.bind(this);
  }
  prevQuestion(e){
    console.log('prev');
    e.preventDefault();
  }

  nextQuestion(e){
    console.log('next');
    e.preventDefault();
  }
  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(e) {
    //console.log(this);
    console.log('Guesses:' , this.state.guesses)
    console.log('Correct:', this.state.correctAnswer)
    e.preventDefault();

    // iterate through guesses and correctAnswer and compare them
    let tmpScore = 0;
    this.state.correctAnswer.map((x, index) => {
      if (x === this.state.guesses[index]){
        tmpScore += 1;
      }
    })

    // Update total score
    this.setState({
      score: this.state.score = tmpScore
    });

    // TODO
    // Apply CSS class to correct / incorrect answers
    /*
    if (e.target.className === 'selected') {
      e.target.className = ''
    }else{
      e.target.className = 'selected'
    }
    */

  }

  selectAnswer(answerIndex, e, questionIndex) {
    //console.log(answerIndex);
    //console.log(questionIndex);
    //console.log(e);
    //console.log(this);
    //console.log(this.state.correctAnswer[questionIndex]);

    // When we click (not submit) the correct answer, if we want INSTANT valuation
    if(this.state.correctAnswer[questionIndex] === (answerIndex)){
      console.log('correct');
    }

    // Fill the guesses array.
    // In react we cannot overwrite an array, we need to copy and replace it.
    let newGuess = this.state.guesses.slice() // copy the array
    newGuess[questionIndex] = answerIndex;
    this.setState({ guesses: newGuess })

  }

  render() {

    // This will print all questions on one page
    var startQuiz = data.map((item, questionIndex) => {
      return (
        <div key={questionIndex}>
          <h3>{item.question} ({questionIndex + 1} / {this.state.total}) Correct: {item.correct} </h3>
            {
              item.answers.map((answer, i) => {
                return (
                  <div key={i} className="radio">
                    <label>
                      <input checked={this.state.guesses[questionIndex] === i} type="radio" value="{i}" onClick={(e) => this.selectAnswer(i, e, questionIndex)} />(i{i}) {answer}
                    </label>
                  </div>
                )
              })
            }
        </div>
      )
    })

    return (
      <div>
        <form onSubmit={this.handleSubmit}>

          {startQuiz}

          <br />
          <button onClick={this.prevQuestion}>Previous</button>
          <button onClick={this.nextQuestion}>Next</button> <br />

          <input type="submit" value="Show scores / Calculate" /> <br />
          Score: {this.state.score}
        </form>
      </div>
    )
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <Quiz />
      </div>
    );
  }
}

export default App;
