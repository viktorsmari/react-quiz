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

class Answer extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      //key: props.mykey,
      //answer: props.answer,
    }
    console.log(this.props.mykey, this.state)
  }
  render() {
    return(
      <li className={'correct' } onClick={(e) => this.selectAnswer(this.props.key, e)}>(i{this.props.key}) {this.props.answer}</li>
    )

  }
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
    console.log('submitting..');
    console.log(this);
    e.preventDefault();
  }

  selectAnswer(index, e) {
    //console.log(index);
    //console.log(e);
    //console.log(this);

    // Apply CSS class
    if (e.target.className === 'selected') {
      e.target.className = ''
    }else{
      e.target.className = 'selected'
    }

    this.setState({
      score : this.state.score + 1
    })
  }

  render() {

    // This will print all questions on one page
    var startQuiz = data.map((item, index) => {
      return (
        <div key={index}>
          <h3>{item.question} ({index + 1} / {this.state.total}) Correct: {item.correct} </h3>
          <ul>
            {
              item.answers.map((answer, i) => {
                return (
                  <li key={i} className={'correct' } onClick={(e) => this.selectAnswer(i, e)}>(i{i}) {answer}</li>
                  //<Answer key={i}  answer={answer}/>
                )
              })
            }
          </ul>
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

          <input type="submit" value="Submit / Calculate" /> <br />
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
