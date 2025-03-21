'use client'
import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import * as z from "zod"
import Link from "next/link"

import { toast } from "sonner"
import { useRouter } from "next/navigation"

import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { signInSchema } from "@/schemas/signInSchema"
import { signIn } from "next-auth/react"




export default function SignInForm() {
  const router = useRouter();

  const form = useForm<z.infer<typeof signInSchema>>({
      resolver: zodResolver(signInSchema),
      defaultValues: {
          identifier: '',
          password: '',
      },
  });


  const onSubmit = async (data: z.infer<typeof signInSchema>) => {
    console.log("🟢 Submitting Login Data:", data);

    const result = await signIn('credentials', {
        redirect: false,
        identifier: data.identifier, // ✅ Ensure this matches backend expectation
        password: data.password,
    });

    console.log("🔴 Auth Response:", result); // Log response

    if (result?.error) {
        console.error("❌ Login Failed:", result.error); // Log error

        if (result.error === 'CredentialsSignin') {
            toast('Login Failed', {
                description: 'Incorrect username or password',
            });
        } else {
            toast('Error', {
                description: result.error,
            });
        }
    }

    if (result?.url) {
        console.log("✅ Redirecting to:", result.url);
        router.replace('/dashboard');
    }
};


  return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-black via-gray-700 to-purple-400">
          <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
              <div className="text-center">
                  <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
                      Welcome Back to Mystery Message
                  </h1>
                  <p className="mb-4">Sign in to continue your secret conversations</p>
              </div>
              <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <FormField
                          name="identifier"
                          control={form.control}
                          render={({ field }) => (
                              <FormItem>
                                  <FormLabel>Email/Username</FormLabel>
                                  <Input {...field} />
                                  <FormMessage />
                              </FormItem>
                          )}
                      />
                      <FormField
                          name="password"
                          control={form.control}
                          render={({ field }) => (
                              <FormItem>
                                  <FormLabel>Password</FormLabel>
                                  <Input type="password" {...field} />
                                  <FormMessage />
                              </FormItem>
                          )}
                      />
                      <Button className='w-full' type="submit">Sign In</Button>
                  </form>
              </Form>
              <div className="text-center mt-4">
                  <p>
                      Not a member yet?{' '}
                      <Link href="/sign-up" className="text-blue-600 hover:text-blue-800">
                          Sign up
                      </Link>
                  </p>
              </div>
          </div>
      </div>
  );
}