import Homepage from "./components/homepage/Homepage";
import  Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import Login from "./components/login/Login";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Profile from "./components/profile/Profile";
import CourseContent from "./components/coursecontent/CourseContent";


function App() {
  return (
    <div className="App">
      <Router>
        <Header/>
       
        <Routes>
         <Route path="/" element={<Homepage/> }/>;
         <Route path="/login" element={<Login/>}/>;
         <Route path="/profile" element={<Profile/>}/>;
         <Route path="/coursecontent/:courseId" element={<CourseContent />} />
         </Routes>
        <Footer/>
      </Router>
    </div>
  );
}

export default App;
