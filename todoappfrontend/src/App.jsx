// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
//import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import ToDoView from './components/ToDoView';
import CreateEditPage from './components/CreateEditPage'
function App() {
   return (
    <Router>
      <Routes>
        <Route path="/" element={ <HomePage />} />
        <Route path="/table" element={ <ToDoView />} />
        <Route path='/createedit' element={ <CreateEditPage ></CreateEditPage>}></Route>
      </Routes>
    </Router>
   
  )
}

export default App
