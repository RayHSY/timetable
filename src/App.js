import React, { Component } from 'react';
import TimeTable from './components/Table';
import {courses} from './contants/text';

class App extends Component {
  render() {
    return (
      <div className="App">

        <TimeTable width={600} height={400} data={courses} />
      </div>
    );
  }
}

export default App;
