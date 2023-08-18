import './App.css';
import NavBar from './components/NavBar';

import React, { Component } from 'react'
import News from './components/News';
import LoadingBar from 'react-top-loading-bar';

import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";


export default class App extends Component {
  pagesize = 5;
  apikey = process.env.REACT_APP_NEWS_API;
  

  state = {
    progress:0
  }

  setProgress = (progress) =>{
    this.setState({progress:progress});

  }

componentDidMount() {
    console.log(process.env.REACT_APP_NEWS_API);
  }

  
  render() {
    return (
      <div>
      



        <Router>
            <NavBar />
                <LoadingBar
                  color='#f11946'
                  progress={this.state.progress}
                  height = {4}
                  
                />
            <Routes>
                <Route exact path="/" element={<News setProgress = {this.setProgress} apikey = {this.apikey} key="general" pagesize={this.pagesize} country="in" category="general" />} />
                <Route exact path="/business" element={<News setProgress = {this.setProgress} apikey = {this.apikey} key="business" pagesize={this.pagesize} country="in" category="business" />} />
                <Route exact path="/entertainment" element={<News setProgress = {this.setProgress} apikey = {this.apikey} key="entertainment" pagesize={this.pagesize} country="in" category="entertainment" />} />
                <Route exact path="/health" element={<News  setProgress = {this.setProgress} apikey = {this.apikey} key="health" pagesize={this.pagesize} country="in" category="health" />} />
                <Route exact path="/science" element={<News setProgress = {this.setProgress} apikey = {this.apikey} key="science" pagesize={this.pagesize} country="in" category="science" />} />
                <Route exact path="/sports" element={<News setProgress = {this.setProgress} apikey = {this.apikey} key="sports" pagesize={this.pagesize} country="in" category="sports" />} />
                <Route exact path="/technology" element={<News setProgress = {this.setProgress} apikey = {this.apikey} key="technology" pagesize={this.pagesize} country="in" category="technology" />} />
            </Routes>
        </Router>



      </div>
    )
  }
}


