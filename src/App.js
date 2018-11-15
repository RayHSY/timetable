import React, { Component } from 'react';
import TimeTable from './components/Table';

class App extends Component {
  render() {
    return (
      <div className="App">

        <TimeTable width={600} height={400} />
      </div>
    );
  }
}

export default App;
