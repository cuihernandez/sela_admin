import {BrowserRouter, Routes, Route} from 'react-router-dom';
import SignIn from './Pages/SignIn';
import Home from './Pages/Home';
import DeleteAccount from './Pages/DeleteAccount';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/delete-account" element={<DeleteAccount />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
