import PhonebookBox from "./components/PhonebookBox";
import { Component } from "react";
import rootReducer from './reducers';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

const store = createStore(rootReducer, applyMiddleware(thunk))

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <PhonebookBox />
      </Provider>
    );
  }
}

export default App;