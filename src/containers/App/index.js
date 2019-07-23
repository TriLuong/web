import React, { PureComponent } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import MyRouter from './Router';

class App extends PureComponent {
  render() {
    return (
      <Router>
        <MyRouter />
      </Router>
    );
  }
}
export default App;
