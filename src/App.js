import {BrowserRouter, Routes, Route} from 'react-router-dom';
import SignIn from './Pages/SignIn';
import Home from './Pages/Home';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
