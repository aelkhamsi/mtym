"use client"

import { z } from "zod"
import { cn } from "@mdm/utils"
import { LoadingDots } from "@mdm/ui"
import { Input, Button } from "@mdm/ui"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@mdm/ui"
import { emailVerificationSchema, emailVerificationDefaultValues } from "@/app/schemas/email-verification.schema"
import { useState } from "react"
import { checkEmailVerificationCode, sendEmailVerificationCode } from "@/app/api/AuthApi"

export function EmailVerificationForm({ 
  className, 
  email,
  login,
}:{
  className?: string,
  email: string,
  login: () => void
}) {
  const form = useForm<z.infer<typeof emailVerificationSchema>>({
    resolver: zodResolver(emailVerificationSchema),
    defaultValues: emailVerificationDefaultValues,
  })
  const [formStep, setFormStep] = useState<number>(1)
  const [isFormLoading, setIsFormLoading] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [successMessage, setSuccessMessage] = useState<string>('')

  const onSendingVerificationCode = async () => {
    setIsFormLoading(true)    
    const response = await sendEmailVerificationCode(email) as any;

    switch(response?.statusCode) {
      case 200:
        setIsFormLoading(false)
        setFormStep(formStep + 1)
        break;
      default:
        setErrorMessage('Server error. Please try later.')
        setIsFormLoading(false)
    }
  }

  const onCheckingVerificationCode = async (formData: any) => {
    const { verificationCode } = formData;
    setIsFormLoading(true)
    const response = await checkEmailVerificationCode(email, verificationCode) as any;

    switch(response?.statusCode) {
      case 200:
        setSuccessMessage('Account verified!')
        setErrorMessage('')
        setIsFormLoading(false)
        login()
        break;
      case 403:
        setErrorMessage('The verification code is incorrect')
        setIsFormLoading(false)
        break;
      default:
        setErrorMessage('Server error. Please try later.')
        setIsFormLoading(false)
    }
  }

  return (
    <div className={cn("grid gap-6", className)}>
      
      {/* Sending email verification code */}
      {formStep === 1 &&
        <>
          <p>Nous allons vous envoyer un code de vérification à votre adresse email</p>
          <Button type="submit" disabled={isFormLoading} onClick={onSendingVerificationCode}>
            {isFormLoading ? (
              <LoadingDots color="#808080" />
            ) : (
              <p>Envoyer le code</p>
            )}
          </Button>
          {errorMessage
            ? <p className="w-full text-red-600 text-sm">
              {errorMessage}
            </p>
            : null
          }
        </>
      }
      
      {/* Checking email verification code */}
      {formStep === 2 &&
        <>
          <p className="w-full text-green-800 text-sm font-bold">
            Un code de vérification a été envoyé à votre boite mail<br/>
            N'oubliez pas de vérifier votre dossier spam si nécessaire
          </p>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onCheckingVerificationCode)}>
              <div className="grid gap-2 space-y-2 text-left">
                <FormField
                  control={form.control}
                  name="verificationCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          id="verificationCode"
                          placeholder="Code de vérification"
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
                    <p>Vérifier mon compte </p>
                  )}
                </Button>
                
                {errorMessage
                  ? <p className="w-full text-red-600 text-sm">
                    {errorMessage}
                  </p>
                  : null
                }
                {successMessage
                  ? <p className="w-full text-green-700 text-sm font-medium">
                    {successMessage}
                  </p>
                  : null
                }
              </div>
            </form>
          </Form>
        </>
      }
    </div>
  )
}