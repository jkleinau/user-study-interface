import MobileDetect from "mobile-detect";
import { NextRequest, NextResponse } from "next/server";
export function middleware(request: NextRequest){
    const md = new MobileDetect(request.headers.get("user-agent") ?? "");
    if(md.mobile()){
        return NextResponse.redirect(new URL("/mobile",request.url));
    }
    return NextResponse.next();
}