import React from 'react'
import 'boxicons/css/boxicons.min.css';
import Spline from '@splinetool/react-spline';
import { words } from '../constants';
import AnimatedCounter from './AnimatedCounter';
const Hero = () => {
  return (
    <>
    <main className="flex lg:mt-20 flex-col lg:flex-row items-center justify-between min-h-[calc(90vh-6rem)]" id="hero">
        <div className="max-w-xl ml-[5%] z-10 mt-[90%] md:mt-[60%] lg:mt-0">
            <div className="relative w-[95%] sm:w-48 h-10 bg-gradient-to-r from-[#656565] to-[#e99b63] shadow-[0_0_15px_rgba(255,255,255,0.4)] rounded-full">
                <div className="absolute inset-[3px] bg-black rounded-full flex items-center justify-center gap-1">
                        <i class="bxr bx-diamond-alt"> </i>
                        INTRODUCING
                </div>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-wider my-8">
            AI STUDY
            <br/>
           BUDDY
        </h1>
        <div className="flex flex-col gap-7">
            <div className="hero-text">
              <h1>
                Empowering
                <span className="slide">
                  <span className="wrapper">
                    {words.map((word, index) => (
                      <span
                        key={index}
                        className="flex items-center md:gap-3 gap-1 pb-2"
                      >
                        <img
                          src={word.imgPath}
                          alt="person"
                          className="xl:size-12 md:size-10 size-7 md:p-2 p-1 rounded-full bg-white "
                        />
                        <span>{word.text}</span>
                      </span>
                    ))}
                  </span>
                </span>
              </h1>
              <h1>to Learn Smarter</h1>
              <h1>with AI-Powered Summaries & Quizzes</h1>
            </div>
        </div>
        <div className="flex gap-4 mt-12">
            <a href="#" className='border border-[#2a2a2a] py-2 sm:py-3 px-4 sm:px-5 rounded-full sm:text-lg text-sm font-semibold transition-all duration-300 hover:bg-[#1a1a1a]'>
                Documentation 
                <i class='bxr  bx-link'  ></i> 
            </a>
            <a href="/chatbot" className='border border-[#2a2a2a] py-2 sm:py-3 px-8 sm:px-10 rounded-full sm:text-lg text-sm font-semibold transition-all duration-300 hover:bg-[#1a1a1a] bg-gray-300 text-black hover:text-white'>
                Get Started
                <i class='bxr  bx-link'  ></i> 
            </a>
        </div>
        </div>
          <Spline scene="https://prod.spline.design/gHpDBiCEYOCszj3u/scene.splinecode" className="absolute lg:top-0 top-[20%] bottom-0 lg:left-[25%] sm:left-[-2%] h-full"/>
        
    </main>
    <AnimatedCounter className="p-10"/>
    </>                
  )
}

export default Hero
