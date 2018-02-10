import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { processResults } from './app/processResults';

const searchURL = 'https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=';
const pageURL = 'https://en.wikipedia.org/?curid=';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: '',
      searchResults: []
    };

    this.onSearchUpdate = this.onSearchUpdate.bind(this);
    this.onSearch = this.onSearch.bind(this);
  }

  onSearchUpdate(event) {
    this.setState({
      searchValue: event.target.value
    });
  }

  onSearch() {
    const searchString = this.state.searchValue;

    fetch(`https://cors-anywhere.herokuapp.com/${searchURL}${searchString}`, {
      headers: {
        'Access-Control-Allow-Origin':'*',
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })
      .then(result => result.json())
      .then(result => {
          this.setState((prevState) => {
            return Object.assign({}, prevState, {
                searchResults: processResults(result),
            });
          });
      })
    ;
  }

  render() {
      console.log(this.state);
    const resultElements = this.state.searchResults.map((result, i) => {
      return (
        <li key={i}>
          <a href={pageURL + result.pageId}>
            {result.title}
          </a>
        </li>
      );
    });

    return (
      <div className="App">
        <h1>Wikipedia Viewer</h1>
        <a href="https://en.wikipedia.org/wiki/Special:Random">Random article</a>
        <p>
          <input type="text" placeholder="Search wikipedia" value={this.state.searchValue} onChange={this.onSearchUpdate}/>
          <a onClick={this.onSearch}>search</a>
        </p>
        <ul>
            {resultElements}
        </ul>
      </div>
    );
  }
}

export default App;

