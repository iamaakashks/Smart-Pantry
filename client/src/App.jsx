import React from 'react'
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PantryPage from './pages/PantryPage.jsx'
import ProtectedRoute from './components/ProtectedRoute';

function App(){
  return (
    <Router>
      <Routes>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />

        <Route element={<ProtectedRoute />} >
          <Route path='/pantry' element={<PantryPage />} />
        </Route>
      </Routes>
    </Router>
  )
}
export default App;