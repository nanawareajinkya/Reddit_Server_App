import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
import './App.css';
import { Home, CategoryView, ViewPost, AddEditPost } from '../index';
import MdWifiTethering from 'react-icons/lib/md/wifi-tethering';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <div className="App">
            <header className="App-header">
              <div className="App-header-inner">
                <MdWifiTethering className="App-logo" size={30}/>
                <h1 className="App-title">React Reddit</h1>
                <nav className="App-nav">
                  <Link className="App-link" to="/">Home</Link>
                  <Link className="App-link" to="/post/add">Add Post</Link>
                </nav>
              </div>
            </header>
            <div className="App-body">
              <Switch>
                <Route exact path="/" component={Home}/>
                <Route exact path="/post/add" component={AddEditPost}/>
                <Route exact path="/:categoryId" component={CategoryView}/>
                <Route exact path="/:categoryId/:postId/edit" component={AddEditPost}/>
                <Route exact path="/:categoryId/:postId" component={ViewPost}/>
              </Switch>
            </div>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
