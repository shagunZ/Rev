"use client"

import React from 'react'
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button'
import { credentialsLogin } from '@/actions/login'
import {toast} from "sonner"
import { useRouter } from 'next/navigation'
const LoginForm = () => {
    const router = useRouter();
  return <form 
  action={async(formData)=>{
      const email=formData.get("email") as string;
      const password=formData.get("password") as string;
      
      if(!email || !password)
        return toast.error("please fill all fields")
  
      const toastid = toast.loading("logging in")
     const error = await credentialsLogin(email,password);

     if(!error)
        toast.success("login successfull",{
            id : toastid,
        });else{
            toast.error(String(error),{
                id:toastid,
            });
            router.refresh()
        }
  }}
    className='flex flex-col gap-4'>
<Input type='email' placeholder='email' name='email'/>
<Input type='password' placeholder='password' name='password'/>
<Button type="submit">Login</Button>
  </form>
}

export default LoginForm