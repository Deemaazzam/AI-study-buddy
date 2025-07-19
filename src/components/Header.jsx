import React from 'react'
import 'boxicons/css/boxicons.min.css';
import { useNavigate } from "react-router-dom";
const Header = () => {
  const navigate = useNavigate();
  const toggleMobileMenu=()=> {
        const mobileMenu=document.getElementById('mobileMenu');
        if(mobileMenu.classList.contains('hidden'))
            mobileMenu.classList.remove('hidden');
        else 
            mobileMenu.classList.add('hidden');
  }
  
  return (
    <header className="flex justify-between items-center py-x px-4 lg:px-20">
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-light m-0" data-aos="fade-right"
     data-aos-easing="linear"
     data-aos-duration="1500"> AI STUDY BUDDY</h1>
      <nav className="hidden md:flex items-center gap-12">
        <a className="text-base tracking-wider transition-colors hover:text-gray-300 z-50" href="#hero" data-aos="fade-down"
     data-aos-easing="linear"
     data-aos-duration="1000">
            HOME
        </a>
        <a className="text-base tracking-wider transition-colors hover:text-gray-300 z-50" href="#counter" data-aos="fade-down"
     data-aos-easing="linear"
     data-aos-duration="1500">
            FEATURES
        </a>
         <a className="text-base tracking-wider transition-colors hover:text-gray-300 z-50" href="/chatbot"data-aos="fade-down"
     data-aos-easing="linear"
     data-aos-duration="2000">
            AI CHATBOT
        </a>
        <a className="text-base tracking-wider transition-colors hover:text-gray-300 z-50" href="#contact" data-aos="fade-down"
     data-aos-easing="linear"
     data-aos-duration="2500">
            CONTACT
        </a>
      </nav>
      <button className="hidden md:block bg-[#a7a7a7] text-black py-3 px-8 rounded-full border-none font-medium transition-all duration-500 hover:bg-white cursor-pointer z-50" onClick={() => {
        // You could do extra logic here
        navigate("/signin");
      }}>
        SIGN IN
      </button>
      <button className="md:hidden text-3xl p-2 z-50" onClick={toggleMobileMenu}>
              <i class="bxr bx-menu-select"></i>
      </button>
      <div className="hidden fixed top-16 bottom-0 right-0 left-0 p-5 md:hidden z-40 bg-black bg-opacity-70 backdrop-blur- md" id="mobileMenu">
        <nav className='flex flex-col gap-6 items-center'>
              <a className="text-base tracking-wider transition-colors hover:text-gray-300 z-50" href="#hero">
                  HOME
              </a>
              <a className="text-base tracking-wider transition-colors hover:text-gray-300 z-50" href="#counter">
                  FEATURES
              </a>
              <a className="text-base tracking-wider transition-colors hover:text-gray-300 z-50" href="/chatbot">
                  AI CHATBOT
              </a>
              <a className="text-base tracking-wider transition-colors hover:text-gray-300 z-50" href="#contact">
                  CONTACT
              </a>
        </nav>
      </div>
    </header>
  )
}

export default Header
