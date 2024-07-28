import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Appbar from './components/Appbar';
import Student from './pages/Student';
import AllStudents from './pages/AllStudents';
import StudentInfo from './components/StudentInfo';

function App() {
  return (
    <div className="App">
      <Router>
        <Appbar />
        <Routes>
          <Route path="/all" element={<AllStudents />} />
          <Route path="/" element={<Student />} />
          <Route path="/students/:id" element={<StudentInfo />} />
        </Routes>

      </Router>
      
      


    </div>
  );
}

export default App;
