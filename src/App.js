import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignIn from './Pages/SignIn';
// import Home from './Pages/Home';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<SignIn />} />
        {/* <Route path='/signin' element={<Home />} /> */}
      </Routes>
    </BrowserRouter>
  );
}
export default App;