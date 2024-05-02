"use client"
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Dashboard (){
    const router = useRouter();
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

     const handleInputChange = (e)=>{
        setInputValue(e.target.value)
     }
     const handleSelectRes = (e) =>{
        setResolution(e.target.value)
     }
     const handleSelectAmount = (e) =>{
        setAmount(e.target.value)
     }

     const handleSubmit = async(e)=>{
        e.preventDefault();
        try{
           setImages([])

           const response = await axios.post("/api/image", values);

           const imgUrls = response.data.map((image: {url: string}) =>image.url);

           setImages(imgUrls);
           setInputValue('')
        }
        catch(error){
            console.log(error)
        }
        finally{ router.refresh() }
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
        <div className="flex gap-4">
        <div className="flex flex-col w-1/2">
        <label htmlFor="">Amount of Image</label>
       <select className="select select-bordered select-xs max-w-xs mb-3" onChange={handleSelectAmount}>
       <option selected value="1">1</option>
       <option value="2">2</option>
       <option value="3">3</option>
       <option value="4">4</option>
       <option value="5">5</option>
             </select>
        </div>
       <div className="flex flex-col w-1/2">
       <label htmlFor="">Resolution of Image</label>
       <select className="select select-bordered select-xs max-w-xs mb-3" onChange={handleSelectRes}>
       <option selected value="200x200">200x200</option>
       <option value="500x500">500x500</option>
       <option value="1080x1080">1080x1080</option>
             </select>
       </div>
        </div>
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