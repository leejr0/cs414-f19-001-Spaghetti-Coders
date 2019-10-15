import React, {Component} from 'react';
import './App.css';
import Application from  './Game/Application'
import { HashRouter as Router, Route, Switch} from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

class App extends Component {
  constructor (props) {
    super(props);
  }

  render() {
    return (
        <div>
          <Router>
              <div className="App">
                  <Route render={({ location }) => (
                      <div>
                        <header></header>

                        <TransitionGroup>
                          <CSSTransition
                              key={location.pathname}
                              appear
                              timeout={{enter:900, exit:0}}
                              classNames='pagefade'>
                            <Switch location={location}>
                              [<Route exact path={'/'} key="route_home" render={() => <Application page={'home'}/>} />]
                            </Switch>
                          </CSSTransition>
                        </TransitionGroup>

                        <footer></footer>
                      </div>
                  )}/>
              </div>
          </Router>
        </div>
    );
  }
}

export default App;
