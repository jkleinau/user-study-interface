import { NextResponse } from "next/server";
import { study } from "../interfaces/study";
import fs from 'fs';

export async function GET(request:Request) {
    const filePath = process.env.JSON_PATH || 'data.json'
    const jsonData: study[] = JSON.parse(fs.readFileSync(filePath).toString());
    
    return  NextResponse.json(jsonData);
    
}

export async function POST(request:Request) {
    const filePath = process.env.JSON_PATH || 'data.json'
    const data: study = await request.json();

    console.log(data);

    const jsonData: study[] = JSON.parse(fs.readFileSync(filePath).toString());

    jsonData.push(data)

    // write data to json file
    fs.writeFileSync(filePath, JSON.stringify(jsonData));

    return  NextResponse.json({success: true});

    
}