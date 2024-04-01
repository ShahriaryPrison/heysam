// components/BackToTopButton.js
import { useState, useEffect } from 'react';
import { IoIosArrowUp } from "react-icons/io";

const BackToTopButton = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
      const handleScroll = () => {
        if (window.scrollY > 20) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      };
  
      window.addEventListener('scroll', handleScroll);
  
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, []);
  
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    };

  return (
    <button
      className={`w-10 h-10 relative rounded-xl back-to-top-btn ${isVisible ? 'visible' : 'hidden'}`}
      onClick={scrollToTop}
    >
      <IoIosArrowUp className='text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2' />
    </button>
  );
};

export default BackToTopButton;
