import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Appbar from './components/Appbar';
import Student from './pages/Student';
import AllStudents from './pages/AllStudents';
import StudentInfo from './components/StudentInfo';
import Home from './pages/Home';

function App() {
  return (
    <div className="App">
      <Router>
        <Appbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/all" element={<AllStudents />} />
          <Route path="/add" element={<Student />} />
          <Route path="/student/:id" element={<StudentInfo />} />
        </Routes>

      </Router>
      
      


    </div>
  );
}

export default App;
