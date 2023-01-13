import React from 'react'
import { Link } from "react-router-dom";
import './noMatch.module.css';

export default function NoMatch() {
  return (
    <div className='App'>
      <h1>Oops! You seem to be lost.</h1>
        <p>Here are some helpful links:</p>
        <div className='row'>
          <Link to='/'>Home</Link>
          <Link to='/about'>About</Link>
          <Link to='/exams'>Exams</Link>
          <Link to='/profile'>Profile</Link>
        </div>
    </div>
  )
}
