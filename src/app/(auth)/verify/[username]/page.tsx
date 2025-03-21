'use client'

import { verifySchema } from '@/schemas/verifySchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useParams, useRouter } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from "sonner"
import * as z from "zod"
import axios, { AxiosError } from 'axios'
import { ApiResponse } from '@/types/ApiResponse'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel} from "@/components/ui/form"
import { Input } from '@/components/ui/input'



const VerifyAccount = () => {
  const router = useRouter()
  const params = useParams<{username: string}>()
 
  const form = useForm<z.infer<typeof verifySchema>>({
      resolver: zodResolver(verifySchema),
      defaultValues: {
          code: ''
      }
  })

  const onSubmit = async (data: z.infer<typeof verifySchema>) => {
      try {
          const response = await axios.post<ApiResponse>('/api/verify-code', { username: params.username, code: data.code })
          console.log(response.data.message);
          toast('Success',{
             
              description: response.data.message
          })
          router.replace('/sign-in')
      } catch (error) {
          const axiosError = error as AxiosError<ApiResponse>
          const errorMessage = axiosError.response?.data.message || axiosError.message;
          toast('Verification failed',{
           
              description: errorMessage,
            
          })
      }
  }
  return (
      <div className='flex justify-center items-center min-h-screen bg-gradient-to-br from-black via-gray-900 to-purple-800'>
          <div className='w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md'>
              <div className="text-center">
                  <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">Verify Your Account</h1>
                  <p className="mb-4">Enter the verification code sent to your email</p>
              </div>
              <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <FormField
                          name="code"
                          control={form.control}
                          render={({ field }) => (
                              <FormItem>
                                  <FormLabel>Verification Code</FormLabel>
                                  <FormControl>
                                      <Input placeholder="Code"
                                          {...field}
                                      />
                                  </FormControl>
                              </FormItem>
                          )}
                      />
                      <Button type='submit'>Submit</Button>
                  </form>
              </Form>
          </div>
      </div>
  )
}

export default VerifyAccount