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
        const { prompt } = body;
        if(!userId){
            return new NextResponse("Unauthorized", {status: 401})
        }
        if(!openai.apiKey){
            return new NextResponse("Api key is not configured.", {status: 500})
        }
        if(!prompt){
            return new NextResponse("Prompt is required.", {status: 400})
        }
        const response = await openai.images({
            prompt,
            n:1, 
            size:"1024X1024",
            response_format:"url"
        })
        return NextResponse.json(response.data.data[0].url)
    }
    catch (e){
        return new NextResponse("Internal Serval Error", { status: 500});
        console.log("Error", e)
    }
}