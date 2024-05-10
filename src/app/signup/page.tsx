import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import { Input } from "@/components/ui/input"
  import { Button } from "@/components/ui/button"
import Link from 'next/link'
import { User } from '@/models/userModel'
import { hash } from 'bcryptjs'
import { redirect } from 'next/navigation'
import { connectToDatabase } from '@/lib/utils'
const Page = () => {

  const signup = async(formData:FormData)=>{
    "use server";
    const name=formData.get("name") as string|undefined;
    const email=formData.get("email") as string|undefined;
    const password=formData.get("password") as string|undefined;
    
    if(!email || !password || !name)
      throw new Error("Please provide all fields");

    //connection with database here
  await connectToDatabase();

    const user = await User.findOne({email})

    if(user)throw new Error("User already exists");

    const hashedPassword = await hash(password,10);
    await User.create({
      name,
      email,
      password: hashedPassword,
    });
    redirect("/login")
  }

    return (
      <div className='flex justify-center items-center h-dvh'>
          <Card>
    <CardHeader>
      <CardTitle>Signup</CardTitle>
    </CardHeader>
    <CardContent>
      <form action={signup}
        className='flex flex-col gap-4'>
    <Input type='text' placeholder='name' name='name'/>
    <Input type='email' placeholder='email' name='email'/>
    <Input type='password' placeholder='password' name='password'/>
    <Button type="submit">Signup</Button>
      </form>
  
    </CardContent>
    <CardFooter className='flex flex-col gap-4'>
      <span>Or</span>
      <form action="">
    <Button type="submit" variant={'outline'}>Signup with Google</Button>
      </form>
  <Link href="/login">
      Already have an account? Login
  </Link>
    </CardFooter>
  </Card>
  
          </div>
    )
  }
  
export default Page