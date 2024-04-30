"use client"
import { useState } from "react";

export default function Dashboard (){
     const [inputValue, setInputValue] = useState('');
     
     const handleInputChange =(e)=>{
        setInputValue(e.target.value)
     }

     const handleSubmit =(e)=>{
        e.preventDefault();
        console.log('input value:', inputValue)
     }

    return(
        <div className="flex flex-col items-center mt-8">
        <p>Dashboard</p>
       
       <div>
         <div className="flex gap-2 w-fit bg-yellow-100 px-5 py-4 rounded-lg justify-center items-center">
            <img src="https://i.ibb.co/SN1mFq0/noun-images-212329.png" alt="" className="md:w-[66px] md:h-[50px]" />
            <div>
                <h1 className="text-3xl font-[600]">Generate Image</h1>
                <p>Generate images with AI.</p>
            </div>
         </div>

         <div className="w-full mt-5">
            <form action="" onSubmit={handleSubmit}>
                <input 
                type="text"
                placeholder="what you want to create?"
                value={inputValue}
                onChange={handleInputChange}
                className="input w-full"
                 /> <br /><br />
                <button type="submit" className="btn w-full">Generate</button>
            </form>
         </div>
       </div>
        </div>
    )
}