import React from 'react';
import './Homepage.css';
import banner1 from './images/banner1.jpg';
import banner2 from './images/banner2.jpg';


function Homepage() {


  return (
    <div className='homepage'>

    <div className='slide1'>
        <div className='textt'>
          <h1>Welcome To Streamify</h1>
          <h2>Join Streamify To Watch Latest Movies</h2>
          <button className='sign-in'>Sign In To Join Streamify</button>
        </div>

        <div className='banner'>
          <img src={banner1} alt='Banner 1'/>
        </div>
      </div>

      <div className='slide2'>
        <div className='textt2'>
          <h1>Movie Rentals On Streamify</h1>
          <h2>Early Access to new movies, before digital subscription</h2>
          <button className='sign-in'>Rent Now</button>
        </div>

        <div className='banner2'>
          <img src={banner2} alt='Banner 2'/>
        </div>
      </div>

      <div className='slide3'>
        <div className="faq">Frequently Asked Questions</div>
        <ul className="ques">
          <li>
            <input type="radio" name="ques" id="first"/>
            <label htmlFor="first">What is Netflix?</label>
            <div className="content">
              <p>Netflix is a streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries and more – on thousands of internet-connected devices. You can watch as much as you want, whenever you want, without a single ad – all for one low monthly price. There's always something new to discover, and new TV shows and movies are added every week!</p>
            </div>
          </li>

          <li>
            <input type="radio" name="ques" id="second"/>
            <label htmlFor="second">How much does Netflix cost?</label>
            <div className="content">
              <p>Watch Netflix on your smartphone, tablet, Smart TV, laptop, or streaming device, all for one fixed monthly fee. Plans range from ₹ 649 to ₹ 149 a month. No extra costs, no contracts.</p>
            </div>
          </li>

          <li>
            <input type="radio" name="ques" id="third"/>
            <label htmlFor="third">Where can I watch?</label>
            <div className="content">
              <p>Watch anywhere, anytime. Sign in with your Netflix account to watch instantly on the web at netflix.com from your personal computer or on any internet-connected device that offers the Netflix app, including smart TVs, smartphones, tablets, streaming media players and game consoles. You can also download your favourite shows with the iOS, Android, or Windows 10 app. Use downloads to watch while you're on the go and without an internet connection. Take Netflix with you anywhere.</p>
            </div>
          </li>

          <li>
            <input type="radio" name="ques" id="fourth"/>
            <label htmlFor="fourth">How do I cancel?</label>
            <div className="content">
              <p>Netflix is flexible. There are no annoying contracts and no commitments. You can easily cancel your account online in two clicks. There are no cancellation fees – start or stop your account anytime.</p>
            </div>
          </li>

          <li>
            <input type="radio" name="ques" id="fifth"/>
            <label htmlFor="fifth">What can I watch on Netflix?</label>
            <div className="content">
              <p>Netflix has an extensive library of feature films, documentaries, TV shows, anime, award-winning Netflix originals, and more. Watch as much as you want, anytime you want.</p>
            </div>
          </li>

          <li>
            <input type="radio" name="ques" id="sixth"/>
            <label htmlFor="sixth">Is Netflix good for kids?</label>
            <div className="content">
              <p>The Netflix Kids experience is included in your membership to give parents control while kids enjoy family-friendly TV shows and films in their own space. Kids profiles come with PIN-protected parental controls that let you restrict the maturity rating of content kids can watch and block specific titles you don’t want kids to see.</p>
            </div>
          </li>
        </ul>
      </div>

    </div>
  );
}

export default Homepage;
