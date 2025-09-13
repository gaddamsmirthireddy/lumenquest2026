import { BrowserRouter, Routes, Route } from "react-router-dom";
import Welcome from './Components/Welcome';
import Authentication from "./Components/Authentication";
import SubscriptionPage from "./pages/SubscriptionPage";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Authentication />} />
        <Route path="/signup" element={<Authentication />} />
        <Route path="/auths" element={<Authentication/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
