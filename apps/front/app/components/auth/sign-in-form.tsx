"use client"

import { z } from "zod"
import { cn } from "@mdm/utils"
import { LoadingDots } from "@mdm/ui"
import { Input, Button } from "@mdm/ui"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@mdm/ui"
import { useState } from "react"
import { signInDefaultValues, signInSchema } from "@/app/schemas/signin.schema"
import { logIn } from "@/app/api/AuthApi"


export function SignInForm({ 
  className, 
  verifyEmail 
}:{
  className?: string,
  verifyEmail: (email: string, accessToken: string) => void
}) {
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: signInDefaultValues,
  })
  const router = useRouter()
  const [isFormLoading, setIsFormLoading] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>('')

  const onSubmit = async (formData: any) => {
    setIsFormLoading(true)
    const { email, password } = formData;
    const response = await logIn(email, password) as any;

    switch(response?.statusCode) {
      case 200:
        if (response?.verified) {
          localStorage.setItem('access_token', response?.access_token);
          document.cookie = `access_token=${response?.access_token}`;
          router.push('/')
          window.location.reload()
        } else {
          verifyEmail(email, response?.access_token)
        }
        break;
      case 400:
      case 401:
      case 404:
        setErrorMessage('The email or password are incorrect')
        setIsFormLoading(false)
        break
      default:
        setErrorMessage('Server error. Please try later.')
        setIsFormLoading(false)
    }
  }

  return (
    <div className={cn("grid gap-6", className)}>
      {/* Email Sign In */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-2 space-y-2 text-left">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      id="email"
                      placeholder="Email"
                      autoCapitalize="none"
                      autoComplete="email"
                      autoCorrect="off"
                      disabled={isFormLoading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      id="password"
                      placeholder="Mot de passe"
                      type="password"
                      autoCapitalize="none"
                      autoComplete="email"
                      autoCorrect="off"
                      disabled={isFormLoading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button type="submit" disabled={isFormLoading}>
              {isFormLoading ? (
                <LoadingDots color="#808080" />
              ) : (
                <p>Se connecter</p>
              )}
            </Button>
            
            {errorMessage
              ? <p className="w-full text-red-600 text-sm">
                {errorMessage}
              </p>
              : null
            }
          </div>
        </form>
      </Form>
    </div>
  )
}