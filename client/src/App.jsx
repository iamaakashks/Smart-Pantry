import React from 'react'
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App(){
  return (
    <Router>
      <div className='App'>
        <Routes>
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
        </Routes>
      </div>
    </Router>
  )
}
export default App;