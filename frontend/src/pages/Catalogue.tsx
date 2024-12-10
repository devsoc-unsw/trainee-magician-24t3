import { useState, useEffect } from 'react';
import { axios } from 'axios';

export const Catalogue = () => {
  const [liveMode, SetLiveMode] = useState(true)
  const [tips, setTips] = useState([])

  const liveNdeathToggle=()=>{
    SetLiveMode((prev)=>!prev)
    console.log(liveMode)
  }
  //getting data from API
  // const fetchData = ()=>{
  //   //API call here
  //   setTips(data)
  // }

  return (
    <div className="flex h-full w-full flex-1 flex-col items-center justify-center p-10">
    <div
      className={`relative flex w-40 h-14 rounded-[24px] transition-all shadow-inner shadow-gray-500 ${
        liveMode ? "bg-lime-400 justify-end" : "bg-red-500 justify-start"
      }`}
      onClick={liveNdeathToggle}
    >
      {/* White rounded toggle */}
      <div
        className={`absolute top-2 ${
          liveMode ? "left-2" : "right-2"
        } h-10 w-14 bg-white rounded-[24px] shadow-gray-500 shadow-md transition-all`}
      ></div>

      {/* Texts */}
      <div className="absolute inset-0 flex items-center text-center justify-between px-3 text-[1.5em] font-bold">
        <span className='text-white'>{liveMode ? "" : "DEATH"}</span>
        <span className='text-black'>{liveMode ? "LIVE" : ""}</span>
      </div>
    </div>

      <div className="flex w-full flex-1 items-center justify-center">
        <div className="grid h-full w-full grid-cols-3 grid-rows-3 gap-8 p-10">
          <div className="flex items-center border bg-lime-300 p-4">item</div>
          <div className="flex items-center border bg-lime-300 p-4">item</div>
          <div className="flex items-center border bg-lime-300 p-4">item</div>
          <div className="flex items-center border bg-lime-300 p-4">item</div>
        </div>
      </div>
    </div>
  );
};
