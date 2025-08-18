"use client"

import { z } from "zod";
import { LoadingDots } from "@mdm/ui"
import { Input, Button } from "@mdm/ui"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@mdm/ui"
import { toast } from "@mdm/ui"
import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react";
import { updateUser } from "@/app/api/UsersApi";
import { getUserDataFromToken } from "@/app/lib/utils";

const resetPasswordSchema = z.object({
  password: z.string().min(6, {message: 'The password must have at least 6 characters'}),
  confirmPassword: z.string().min(1, {message: 'This field is required'}),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

const defaultValues = {
  password: "",
  confirmPassword: "",
}

export default function ResetPasswordForm() {
  const [isFormLoading, setIsFormLoading] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>('')
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get('token') ?? undefined;
  const user = getUserDataFromToken(token)
  const form = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: defaultValues,
  })

  const onSubmit = async (formData: any) => {
    setIsFormLoading(true)
    const { password } = formData
    const response = await updateUser(user?.id, { password }, token) as any

    switch(response?.statusCode) {
      case 200:
        toast({
          title: 'Your password was reset!',
          description: "You can log in with your new password",
        })
        setTimeout(() => {
          router.push('/');
        }, 3000);
        break;

      default:
        setErrorMessage('The reset password link has expired')
        setIsFormLoading(false)
        break;
    }
  }

  return (
    <div className="w-full max-w-sm md:max-w-5xl px-5 xl:px-0 mt-20">
      <div className="space-y-6">
        <h1
          className="animate-fade-up bg-gradient-to-br from-black to-stone-500 bg-clip-text text-center font-display text-4xl font-bold tracking-[-0.02em] text-transparent opacity-0 drop-shadow-sm [text-wrap:balance] md:text-5xl md:leading-[4rem]"
          style={{ animationDelay: "0.25s", animationFillMode: "forwards" }}
        >
          Réinitialiser votre mot de passe
        </h1>
        
        {user &&
          <div
            className="animate-fade-up bg-clip-text text-center font-display text-base font-bold text-black opacity-0 mt-12 flex justify-center"
            style={{ animationDelay: "0.25s", animationFillMode: "forwards" }}
          >
            <div className="grid gap-6 w-full md:w-1/2">
              {/* Reset Password Form */}
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <div className="grid gap-2 space-y-2 text-left">
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
                              autoComplete="password"
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
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              id="confirm-password"
                              placeholder="Confirmer mot de passe"
                              type="password"
                              autoCapitalize="none"
                              autoComplete="confirm-password"
                              autoCorrect="off"
                              disabled={isFormLoading}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Submit Button */}
                    <Button type="submit" disabled={isFormLoading}>
                      {isFormLoading ? (
                        <LoadingDots color="#808080" />
                      ) : (
                        <p>Réinitialiser</p>
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
          </div>
        }
      </div>
    </div>
  )
}