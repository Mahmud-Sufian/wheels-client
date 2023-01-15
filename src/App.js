import { Route, Routes } from 'react-router-dom';
import './App.css';
import AddProduct from './pages/Dashboard/AddProduct';
import Dashboard from './pages/Dashboard/Dashboard';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import SignUp from './pages/Login/SignUp';
import NotFound from './pages/Shared/NotFound';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RequireAuth from './pages/Login/RequireAuth';
import AllUser from './pages/Dashboard/AllUser';
import RequireAdmin from './pages/Login/RequireAdmin';
import Products from './pages/Products/Products';
import MyBooking from './pages/Dashboard/MyBooking';
import AllBooking from './pages/Dashboard/AllBooking';
import About from './pages/About/About';
// import Payment from './pages/Products/Payment';

function App() {
  return (
    <div className="max-w-7xl mx-auto px-5">
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/about' element={<About></About>}></Route>
        <Route path='/products' element={<RequireAuth><Products></Products></RequireAuth>}></Route>
        {/* <Route path='/products/:id' element={<RequireAuth><Payment></Payment></RequireAuth>}></Route> */}
        <Route path='/dashboard' element={<RequireAuth><Dashboard></Dashboard></RequireAuth>}>
          <Route index element={<MyBooking></MyBooking>}></Route>
          <Route path='addProduct' element={<RequireAdmin><AddProduct></AddProduct></RequireAdmin>}></Route>
          <Route path='allUsers' element={<RequireAdmin><AllUser></AllUser></RequireAdmin>}></Route>
          <Route path='allBookings' element={<RequireAdmin><AllBooking></AllBooking></RequireAdmin>}></Route>
        </Route>
        <Route path='/signup' element={<SignUp></SignUp>}></Route>
        <Route path='/login' element={<Login></Login>}></Route>
        <Route path='*' element={<NotFound></NotFound>}></Route>
      </Routes>
      <ToastContainer></ToastContainer>
    </div>
  );
}

export default App;
