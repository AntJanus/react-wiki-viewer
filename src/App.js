import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const searchURL = 'https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=';

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

    fetch(`${searchURL}${searchString}`, {
      mode: 'cors',
      headers: {
        'Access-Control-Allow-Origin':'*'
      },
      credentials: 'same-origin',
    })
      .then(result => result.toJson())
      .then(result => {
          this.setState({
            searchResults: result,
          });
      })
    ;
  }

  render() {
    return (
      <div className="App">
        <h1>Wikipedia Viewer</h1>
        <a href="https://en.wikipedia.org/wiki/Special:Random">Random article</a>
        <p>
          <input type="text" placeholder="Search wikipedia" value={this.state.searchValue} onChange={this.onSearchUpdate}/>
          <a onClick={this.onSearch}>search</a>
        </p>
      </div>
    );
  }
}

export default App;
