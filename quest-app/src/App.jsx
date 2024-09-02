import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.js'
import {BrowserRouter, Routes, Route } from'react-router-dom';
import Home from './components/Home/Home.jsx';
import User from './components/User/User.jsx';
import Navbar from './components/Navbar/Navbar.jsx';


function App() {
  return (
    <>
    <div className="App">
     <BrowserRouter>
      <Navbar></Navbar>
        <Routes>
          <Route exact path="/" element={ <Home/> }></Route>
          <Route exact path="/users/:userId" element={ <User/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
    </>
  );
}

export default App;
