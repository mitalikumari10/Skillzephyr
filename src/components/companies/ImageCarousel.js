import React from 'react';
import './ImageCarousel.css';

import adobe from './assets/adobe.png';
import infosys from './assets/Infosys.png';
import oracle from './assets/oracle.png';
import paytm from './assets/paytm.png';
import uber from './assets/Uber.png';
import walmart from './assets/walmart.png';
import wipro from './assets/Wipro.png';
import yahoo from './assets/yahoo.webp';
import mic from './assets/mic.webp';
import google from './assets/google.png';
import zomato from './assets/zomato.png';
import accenture from './assets/accenture.png';
import amazon from './assets/amazon.png';
import atlassian from './assets/atlassian.png';
import cisco from './assets/cisco.png';
import flipkart from './assets/flipkart.png';
import meta from './assets/meta.png';
import PhonePe from './assets/PhonePe.png';




const images = [
  adobe,
  infosys,
  oracle,
  paytm,
  uber,
  walmart,
  wipro,
  yahoo,
  mic,
  google,
  zomato,
  accenture,
  amazon,
  atlassian,
  cisco,
  flipkart,
  meta,
  PhonePe,
];

const ImageCarousel = () => {
  return (
    <div className="image-carousel-container">
      <div className="image-carousel-track">
        {images.map((img, index) => (
          <img key={index} src={img} alt={`img-${index}`} className="image-carousel-image" />
        ))}
        {images.map((img, index) => (
          <img key={index + images.length} src={img} alt={`img-${index}`} className="image-carousel-image" />
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;
