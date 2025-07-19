import React, { useState } from 'react'
import './SideBar.css'
import {assets} from 'C:/Users/CompuTop/OneDrive/Documents/miniProject/public/images/assets/assets'
const SideBar = () => {

    const [extended,setExtended]=useState(false);
  return (
    <div className="sidebar">
      <div className="top">
        <img onClick={()=>setExtended(prev=>!prev)}src={assets.menu_icon} className='menu'/>
        <div className="new-chat">
            <img src={assets.plus_icon}/>
             {extended?<p>New Chat</p>:null}
        </div>
        {extended? <div className="recent">
            <p className="recent-title">Recent</p>
            <div className="recent-entry">
                <img src={assets.message_icon}/>
                <p>What is react...</p>
            </div>
        </div>:null}
       
      </div>
      <div className="bottom">
        <div className="bottom-item recent-entry">
            <img src={assets.question_icon}/>
           {extended?<p>Help</p>:null} 
        </div>
        <div className="bottom-item recent-entry">
            <img src={assets.history_icon}/>
            {extended?<p>Acrivity</p>:null} 
        </div>
        <div className="bottom-item recent-entry">
            <img src={assets.setting_icon}/>
            {extended?<p>Settings</p>:null} 
        </div>
      </div>
    </div>
  )
}

export default SideBar
