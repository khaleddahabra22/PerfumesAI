import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
    // Fail gracefully — never crash the request
    try {
        let supabaseResponse = NextResponse.next({
            request,
        })

        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
        const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

        if (!supabaseUrl || !supabaseAnonKey) {
            return supabaseResponse
        }

        const supabase = createServerClient(
            supabaseUrl,
            supabaseAnonKey,
            {
                cookies: {
                    getAll() {
                        return request.cookies.getAll()
                    },
                    setAll(cookiesToSet) {
                        cookiesToSet.forEach(({ name, value }) => {
                            try { request.cookies.set(name, value) } catch { /* ignore */ }
                        })
                        supabaseResponse = NextResponse.next({
                            request,
                        })
                        cookiesToSet.forEach(({ name, value, options }) => {
                            try { supabaseResponse.cookies.set(name, value, options) } catch { /* ignore */ }
                        })
                    },
                },
            }
        )

        // Refresh session
        const {
            data: { user },
        } = await supabase.auth.getUser()

        // Protected routes
        if (!user && request.nextUrl.pathname.startsWith('/account')) {
            const url = request.nextUrl.clone()
            url.pathname = '/login'
            url.searchParams.set('redirectedFrom', request.nextUrl.pathname)
            return NextResponse.redirect(url)
        }

        // Redirect logged-in users away from auth pages
        if (user && (
            request.nextUrl.pathname.startsWith('/login') ||
            request.nextUrl.pathname.startsWith('/register') ||
            request.nextUrl.pathname.startsWith('/forgot-password')
        )) {
            return NextResponse.redirect(new URL('/account', request.url))
        }

        return supabaseResponse
    } catch (error) {
        // If anything fails, don't block the request
        console.error('Middleware error (non-blocking):', error)
        return NextResponse.next({
            request,
        })
    }
}
