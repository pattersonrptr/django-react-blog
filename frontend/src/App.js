import React from 'react';
import './App.css';
import {Title} from './components/Title';
import {SideNav} from './components/SideNav';
import PostList from './components/PostList';


function App() {
  return (
    <div className="App">
        <Title />
        <div className="container">
            <SideNav />
            <PostList />
        </div>
    </div>
  );
}

export default App;
