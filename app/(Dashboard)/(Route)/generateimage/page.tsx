"use client"
import { useState } from "react";

export default function Dashboard (){
     const [inputValue, setInputValue] = useState('');
     const [isLoading, setIsLoading] =useState(false);
     const [amount, setAmount] = useState("1");
     const [resolution, setResolution] = useState("500x500");
     const [images, setImages] = useState([]);

     const values = {
         inputValue,
         amount,
         resolution
     }

     const handleInputChange = async(e)=>{
        setInputValue(e.target.value)
     }

     const handleSubmit =(e)=>{
        e.preventDefault();
        try{
           setImages([])
        }
        catch(error){
            console.log(error)
        }
     }

    return(
        <div className="flex flex-col items-center mt-8">
        <p>Dashboard</p>
       
       <div>
         <div className="flex gap-2  bg-yellow-100 px-5 py-4 rounded-lg justify-center items-center">
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
                disabled={isLoading}
                className="input w-full border-0 focus-visible:ring-transparent focus-visible:right-0 outline-none"
                 /> <br /><br />
                <button 
                type="submit" 
                className="btn w-full" 
                disabled={isLoading}
                >Generate Image</button>
            </form>

            <div className="my-5">
                {
                    isLoading && (<span className="loading loading-ring loading-lg"></span>)
                }
                {
                    images.length ===0 && !isLoading && (
                        <p>No Images...</p>
                    )
                }
                <p>images will load here</p>
            </div>
         </div>
       </div>
        </div>
    )
}