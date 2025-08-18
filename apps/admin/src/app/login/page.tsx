"use client"

import { z } from "zod"
import * as React from "react"
import { cn } from "@/lib/utils"
import { LoadingDots } from "@/components/shared/icons"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/shared/form"
import { Input } from "@/components/shared/input"
import { Button } from "@/components/shared/button"
import { logIn } from "@/api/AuthApi"

const signInSchema = z.object({
  username: z.string().min(1, {message: 'A username is required'}),
  password: z.string().min(1, {message: 'A password is required'}),
})

const defaultValues = {
  username: "",
  password: "",
}

export default function LoginPage() {
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: defaultValues,
  })
  const [isFormLoading, setIsFormLoading] = React.useState<boolean>(false)
  const [errorMessage, setErrorMessage] = React.useState<string>('')
  const router = useRouter()

  const onSubmit = async (formData: any) => {
    const { username, password } = formData;
    setIsFormLoading(true)
    const response = await logIn(username, password) as any;

    switch(response?.statusCode) {
      case 200:
        localStorage.setItem('access_token', response?.access_token);
        setTimeout(() => {
          window.location.reload()
        }, 500);
        router.push('/')
        break;
      case 400:
      case 401:
        setErrorMessage('The username or password are incorrect')
        setIsFormLoading(false)
        break
      default:
        setErrorMessage('Server error. Please try later.')
        setIsFormLoading(false)
    }
  }

  return (
    <div className={cn("grid gap-6 p-2 pb-4")}>
      {/* Email Sign In */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-2 space-y-2 text-left">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      id="username"
                      placeholder="Username"
                      autoCapitalize="none"
                      autoCorrect="on"
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
                      placeholder="Password"
                      type="password"
                      autoCapitalize="none"
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
                <p>Sign In</p>
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
