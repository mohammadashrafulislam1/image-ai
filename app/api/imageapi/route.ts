import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPEN_API_KEY,
})

export const POST = async(req: Request) =>{
    try{
        const {userId} = auth();
        const body = await req.json();
        console.log(body)
        const { prompt, amount ="1", resolution ="1024x1024" } = body;
        // if(!userId){
        //     return new NextResponse("Unauthorized", {status: 401})
        // }
        if(!openai.apiKey){
            return new NextResponse("Api key is not configured.", {status: 500})
        }
        if(!prompt){
            return new NextResponse("Prompt is required.", {status: 400})
        }
        if(!amount){
            return new NextResponse("amount is required.", {status: 400})
        }
        if(!resolution){
            return new NextResponse("resolution is required.", {status: 400})
        }
        const response = await openai.images.generate({
            model: "dall-e-3",
            prompt,
            n: parseInt(amount, 10), 
            size:resolution
        })
        console.log(response)
        return NextResponse.json(response.data[0].url);

    }
    catch (e){
        return new NextResponse("Internal Serval Error", { status: 500});
        console.log("Error", e)
    }
}