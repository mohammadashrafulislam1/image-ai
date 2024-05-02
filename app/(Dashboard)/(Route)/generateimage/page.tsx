"use client"
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Dashboard (){
    const router = useRouter();
     const [prompt, setPrompt] = useState('');
     const [error, setError] =useState('');
     const [isLoading, setIsLoading] =useState(false);
     const [amount, setAmount] = useState("1");
     const [resolution, setResolution] = useState("");
     const [images, setImages] = useState([]);

     const values = {
         prompt,
         amount,
         resolution
     }
     console.log(values)

     const handleInputChange = (e)=>{
        setPrompt(e.target.value)
     }
    //  const handleSelectRes = (e) =>{
    //     setResolution(e.target.value)
    //  }
    //  const handleSelectAmount = (e) =>{
    //     setAmount(e.target.value)
    //  }

     const handleSubmit = async(e)=>{
        e.preventDefault();
         try{
            setPrompt(e.target.prompt.value)
            setResolution(e.target.resolution.value)
            setAmount(e.target.amount.value)
            setImages([])
            setIsLoading(true)
            setError('')
            const response = await axios.post("/api/imageapi", values);
            console.log(error.response);
 
            const imgUrls = response.data.map((image: {url: string}) =>image.url);
 
            setImages(imgUrls);
            setPrompt('')
            setAmount('')
            setResolution('')
            setError('')
         }
         catch(error){
             console.log(error)
             setError(error.response.data)
             setIsLoading(false)
         }
         finally{ router.refresh()
            setIsLoading(false)
          }
     }

     console.log(images)
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
                onChange={handleInputChange}
                value={prompt}
                disabled={isLoading}
                name="prompt"
                className="input w-full border-0 focus-visible:ring-transparent focus-visible:right-0 outline-none"
                 /> <br /><br />
        <div className="flex gap-4 items-center justify-center">
        <div className="flex flex-col w-1/2">
        <label htmlFor="">Amount of Image</label>
       <select className="select select-bordered select-xs max-w-xs mb-3" value={amount} name="amount">
       <option selected disabled>select</option>
       <option value="1">1</option>
       <option value="2">2</option>
       <option value="3">3</option>
       <option value="4">4</option>
       <option value="5">5</option>
             </select>
        </div>
       <div className="flex flex-col w-1/2">
       <label htmlFor="">Resolution of Image</label>
       <select className="select select-bordered select-xs max-w-xs mb-3" value={resolution} name="resolution">
       <option selected disabled>Select</option>
       <option value="256x256">256x256</option>
       <option value="512x512">512x512</option>
       <option value="1024x1024">1024x1024</option>
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
                {
                    error && (
                        <p className="bg-red-500 rounded-full pl-5 text-white mt-5">{error}</p>
                    )
                }
                <div className="grid md:grid-cols-2 grid-cols-1 gap-5 mt-10"
                >
          {
            images.map((src)=> 
            <div className="card">
                <img src={src} alt="AI GENERATED IMAGES"/>
                <button className="btn btn-sm btn-success" onClick={()=> window.open(src)}>Download</button>
            </div>
            )
          }
                </div>
            </div>
         </div>
       </div>
        </div>
    )
}