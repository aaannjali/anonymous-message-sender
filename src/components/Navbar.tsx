"use client"

import React from 'react'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { User } from 'next-auth'
import { Button } from './ui/button'

const Navbar = () => {
        const {data: session} = useSession()
        const user: User = session?.user as User
        console.log(user);
        
        return (
                <nav className="p-4 md:p-6 shadow-md bg-gray-900 text-white">
                  <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
                    <a href="#" className="text-xl font-bold mb-4 md:mb-0">
                    Anonymous message
                    </a>
                    {session ? (
                      <>
                        <span className="mr-4">
                          Hey Send Anonymous message to your friend!
                        </span>
                        <Button onClick={() => signOut()} className="w-full md:w-auto bg-slate-100 text-black cursor-pointer" variant='outline'>
                          Logout
                        </Button>
                      </>
                    ) : (
                      <Link href="/sign-in">
                        <Button className="w-full md:w-auto bg-slate-100 text-black cursor-pointer" variant={'outline'}>Login</Button>
                      </Link>
                    )}
                  </div>
                </nav>
              );
            }
            
            export default Navbar;