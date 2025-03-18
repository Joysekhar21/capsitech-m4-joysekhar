import './App.css'
import Home from './pages/Home/Home'
import {BrowserRouter as Router,Routes,Route, Navigate} from "react-router-dom"
import Login from './pages/Login/Login'
import SignUp from './pages/SignUp/SignUp'

const ProtectedRoute = ({ children }) => {
  // Check if user is authenticated
  const isAuthenticated = localStorage.getItem('token') !== null; // Or however you track authentication
  
  if (!isAuthenticated) {
    // Redirect to login page if not authenticated
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

const routes = (
  <Router>
    <Routes>
      <Route path='/' exact element={<Login/>}/>
      <Route path='/dashboard' exact element={
        <ProtectedRoute>
          <Home/>
        </ProtectedRoute>
        }/>
      <Route path='/login' exact element={<Login/>}/>
      <Route path='/signUp' exact element={<SignUp/>}/>
    </Routes>
  </Router>
)

function App() {
  return (
    <>
    <div>{routes}</div>
  </>
  )
}

export default App
