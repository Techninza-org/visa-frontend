import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import Cookies from 'js-cookie';

 


const Middleware = (req:NextRequest) => {
    const authToken = Cookies.get('token') || req.cookies.get('token')?.value;
  const loggedInUserNotAccessPaths= req.nextUrl.pathname==="/login";

  if (loggedInUserNotAccessPaths){
    if(authToken){
      return NextResponse.redirect(new URL('/', req.url))
    }
    

  }else{
    if(!authToken){
      return NextResponse.redirect(new URL('/login', req.url))
    }
  }

 
} 
export const config = {
  matcher: ['/pages/dashboard/client/docs','/pages/dashboard/client/visa-applications', '/pages/dashboard', '/login', '/pages/dashboard/client/kyc-profile', '/pages/dashboard/client/passport-applications',"/pages/dashboard/client/support", "/pages/dashboard/client/visatrack", "/pages/dashboard/client/visa-check", "/pages/dashboard/client/visa-application-form", "/pages/dashboard/client/visa-application-form/[id]", "/pages/dashboard/client/visa-application-form/new", "/pages/dashboard/client/visa-application-form/edit/[id]"],
}

export default Middleware;