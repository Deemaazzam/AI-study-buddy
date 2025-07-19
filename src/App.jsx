import Header from "./components/Header"
import Hero from "./components/Hero"
import AOS from 'aos';
import 'aos/dist/aos.css';
import Showcase from "./components/Showcase";
import LogoShowCase from "./components/logoSection";
import FeatureCards from "./components/FeatureCards";
import Experience from "./components/Experience";
import TechStack from "./components/techStack"; 
import Testimonials from "./components/testimonials";
import Footer from "./components/Footer";
import { useEffect } from "react";
import Contact from "./components/Contact";
export default function App() {
  useEffect(()=>{
    AOS.init({
      duration:1500,
      once:true
    });
  })
  return (
   <main>
    <img  src="/gradient.png" className="absolute top-0 right-0 opacity-60 -z-1" alt="GradientImage"/>
    <div className="h-0 w-[40rem] absolute top-[20%] right-[-5%] shadow-[0_0_900px_20px_#e99b63] -rotate-[30deg] -z-10" ></div>
    <Header/>
    <Hero/>
    <Showcase/>
    <LogoShowCase/>
    <FeatureCards/>
    <Experience/>
    <TechStack/>
    <Testimonials/>
    <Contact/>
    <Footer/>
   </main>
  )
}