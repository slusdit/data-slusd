import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { auth } from '@/auth';
import adminCheck from './lib/adminCheck';

// Middleware function to protect routes
export async function middleware(request: NextRequest) {
    const currentUser = request.cookies.get('authjs.session-token')?.value 
    console.log(currentUser)
    console.log(currentUser)
    const admin = await adminCheck()
    if (!admin) {
        // Redirect to home page if user is not authenticated
        const url = request.nextUrl.clone();
        url.pathname = '/';
        return NextResponse.redirect(url);
    }

    // Continue to the requested route if user is authenticated
    return NextResponse.next();
}

// Define the paths that require authentication
export const config = {
    matcher: [
        '/admin',
        
    ],
};
