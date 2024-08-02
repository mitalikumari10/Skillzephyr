import Homepage from "./components/homepage/Homepage";
import Movies from "./components/movies/Movies";
import  Footer from "./components/footer/Footer";
import movie1 from "./components/movies/moviesbanner/movie1.avif";
import movie2 from "./components/movies/moviesbanner/movie2.avif";
import movie3 from"./components/movies/moviesbanner/movie3.jpg";
import movie4 from "./components/movies/moviesbanner/movie4.avif";
import movie5 from "./components/movies/moviesbanner/movie5.webp";
import sitaramam from './components/movies/trailors/sitaramam.mp4';
import aazam from'./components/movies/trailors/aazam.mp4';
import avtaar from'./components/movies/trailors/avtaar.mp4';
import Header from "./components/header/Header";
import Login from "./components/login/Login";

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Profile from "./components/profile/Profile";


const movies = [
  {
    name: 'Sitaramam',
    ageRating: 'PG-13',
    banner:movie1,
    trailer:sitaramam ,
  },
  {
    name: 'Aazam',
    ageRating: 'PG-13',
    banner: movie2,
    trailer: aazam,
  },
  {
    name: 'Avtaar 3',
    ageRating: 'PG-10',
    banner: movie3,
    trailer:avtaar,
  },
  {
    name: 'Fast And Furious',
    ageRating: 'PG-12',
    banner: movie4,
    trailer: 'path/to/movie2-trailer.mp4',
  },
  {
    name: 'InterStellar',
    ageRating: 'PG-10',
    banner: movie5,
    trailer: 'path/to/movie2-trailer.mp4',
  },
  // Add more movie objects as needed
];

function App() {
  return (
    <div className="App">
      <Router>
        <Header/>
        <Routes>
         <Route path="/" element={<Homepage/>}/>;
         <Route path="/movies" element={<Movies movies={movies}/>}/>;
         <Route path="/rent" element={<Movies movies={movies}/>}/>;
         <Route path="/login" element={<Login/>}/>;
         <Route path="/profile" element={<Profile/>}/>;
        </Routes>
        <Footer/>
      </Router>
    </div>
  );
}

export default App;
