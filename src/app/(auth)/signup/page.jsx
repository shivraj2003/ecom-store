"use client";
import FormInput from "@/components/FormInput";
import FormSubmit from "@/components/FormSubmit";
import { toast } from "@/components/ui/use-toast";
import { UploadButton } from "@/lib/uploadthing";
import { register } from "@/utils/actions";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const Signup = () => {
  const [image, setImage] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
    };
    const res = await register(data, image);
    if (res?.error) {
      toast({ title: res.error });
    } else {
      toast({ title: res.message });
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2">
      <div className="h-screen   bg-[#cbe3e9] ">
    <Image src="/signup.png"
        
        width={1080}
        height={1920}
         
         alt=""
        />
      </div>
      <div className="p-[15%] bg-white">
        <h1 className="text-2xl font-medium">Create an account</h1>
        <form onSubmit={onSubmit}>
          <FormInput
            id="name"
            label="Full Name"
            name="name"
            placeholder="Enter your name"
            type="text"
            className="h-10"
          />
          <FormInput
            id="email"
            label="Email"
            name="email"
            placeholder="Enter your email"
            type="email"
            className="h-10"
          />
          <FormInput
            id="password"
            label="Password"
            name="password"
            placeholder="Enter the password"
            type="password"
            className="h-10 mb-10"
          />
          <UploadButton
            endpoint="imageUploader"
            appearance={{
              button:
                "ut-uploading:cursor-not-allowed bg-slate-600 w-full text-xl after:bg-orange-400 max-w-[700px]",
              allowedContent: "hidden",
            }}
            onClientUploadComplete={(res) => {
              setImage(res[0].url);
            }}
            onUploadError={(error) => {
              alert(`ERROR ${error.message}`);
            }}
          />
          <FormSubmit type="submit" className="w-full bg-red-500 text-white h-12 hover:bg-red-400 mt-10">
            Create
          </FormSubmit>
          <Link href="/login">
            <div className="text-red-500 text-sm justify-center py-5  ">Already have an account? LOGIN</div>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Signup;
