
import './App.css';
import { Route, Routes } from "react-router-dom";
import SleepQuestions from './pages/Sleep-Questions';
import SleepTime from './pages/Sleep-time';
import SleepDuration from './pages/Sleep-duration';
import SleepResult from './pages/Sleep-Result';
import Home from './pages/Home';

function App() {
  return (
    <div>
    <Routes>
    <Route path="/" element={<Home />} />
     <Route path="/sleep/questions" element={<SleepQuestions />} />
     <Route path="/sleep/time" element={<SleepTime/>} />
     <Route path="/sleep/duration" element={<SleepDuration/>} />
     <Route path="/sleep/result" element={<SleepResult/>} />
   </Routes>
  </div>
  );
}

export default App;
