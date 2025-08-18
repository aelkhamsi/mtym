"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button, ProfileSkeleton } from "@mdm/ui"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@mdm/ui"
import { Input } from "@mdm/ui"
import { toast } from "@mdm/ui"
import { useAtom } from "jotai"
import { userAtom } from "@/app/store/userAtom"
import { updateUser } from "@/app/api/UsersApi"
import { User } from "@mdm/types"

const profileFormSchema = z.object({
  firstName: z.string().min(1).max(50),
  lastName: z.string().min(1).max(50),
  email: z.string({ required_error: "Please select an email to display." }).email(),
})

type AccountFormValues = z.infer<typeof profileFormSchema>

const defaultValues: Partial<AccountFormValues> = {
  firstName: '',
  lastName: '',
  email: '',
}

export function AccountForm() {
  const [user, setUser] = useAtom(userAtom)
  const form = useForm<AccountFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
    values: user,
  })

  const onSubmit = async (formData: AccountFormValues) => {
    const userId = user?.id;
    const response = await updateUser(userId as number, formData) as any;
    
    if (response?.statusCode === 200) {
      setUser({...user, firstName: formData?.firstName, lastName: formData?.lastName} as User);
      toast({
        title: "You submitted a profile update",
        description: "Your modifications were taken into account",
      })
    } else {
      toast({
        title: "You submitted a profile update",
        description: "We've had a server error. Please try later",
        variant: 'destructive',
      })
    }
  }

  if (!user) return <ProfileSkeleton />;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input placeholder="First Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input placeholder="Last Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input disabled placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Update informations</Button>
      </form>
    </Form>
  )
}
