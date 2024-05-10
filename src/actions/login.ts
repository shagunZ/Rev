"use server";

import { CredentialsSignin } from "next-auth";
import { signIn } from "next-auth/webauthn";


const credentialsLogin = async(email:string,password:string)=>{
    try{
        await signIn("credentials",{
            email,
            password,
        });
    }catch(error){
        const err = error as CredentialsSignin;
        return err.cause;
    }
  }
export {credentialsLogin}