import React from 'react'
import { counterItems } from '../constants'
import CountUp from 'react-countup'
const AnimatedCounter = () => {
  return (
    <div id='counter' className="lg:mt-4 mt-32">
        <div className="mx-auto grid-4-cols">
            {counterItems.map(item=>(
                <div className="bg-zinc-900 rounded-lg p-10 flex flex-col justify-center">
                <div key={counterItems.label} className="text-white text-5xl font-bold mb-2 counter-number">
                    <CountUp suffix={item.suffix} end={item.value}/>
                </div>
                <div className="text-white-50 text-lg">{item.label}</div>
                </div>
            ))}
        </div>
    </div>
  )
}

export default AnimatedCounter
