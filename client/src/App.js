import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Users from './Components/Users.js'
import Home from './Components/Home.js'
import NotFoundRoute from './Components/NotFoundRoute';
import UserForm from './Components/UserForm';

function App() {
  
  return (
    <div className="bg-zinc-900 h-screen text-white">
      <div className='flex items-center justify-center h-full'>
      <BrowserRouter>
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
    </div>
  );
}

export default App;