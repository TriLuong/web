import React, { PureComponent } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import MyRouter from './Router';
import store from '../../redux/store';

class App extends PureComponent {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <MyRouter />
        </Router>
      </Provider>
    );
  }
}
export default App;
