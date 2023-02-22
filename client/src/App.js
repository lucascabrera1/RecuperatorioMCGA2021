import './App.css';
import {BrowserRouter, Routes, Route, NavLink} from 'react-router-dom'
import Users from './Components/Users.js'
import Home from './Components/Home.js'
import NotFoundRoute from './Components/NotFoundRoute';
import UserForm from './Components/UserForm';

function App() {
  
  return (
    <div className="bg-zinc-900  text-white Center" >
      <header className='App-header'><h1>Recuperatorio Modelos computacionales de Gestión Administrativa</h1></header>
      <div className='items-center justify-center'>
      <BrowserRouter>
      <navbar>
        <ul>
          <li><NavLink to="/home">Home</NavLink></li>
          <li><NavLink to="/users">Users</NavLink></li>
        </ul>
      </navbar>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/home' element={<Home/>} />
          <Route path='/users' element={<Users/>} />
          <Route path='/edit-user/:id' element={<UserForm/>}/>
          <Route path='/newuser' element={<UserForm/>}/>
          <Route path='*' element= {<NotFoundRoute/>}/>
        </Routes>
      </BrowserRouter>
      </div>
      <footer className='App-footer'><h2>Realizado por Lucas Cabrera</h2></footer>
    </div>
  );
}

export default App;