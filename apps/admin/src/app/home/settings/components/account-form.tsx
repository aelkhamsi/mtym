"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/shared/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/shared/form"
import { Input } from "@/components/shared/input"
import { toast } from "@/components/hooks/use-toast"
import ProfileSkeleton from "@/components/shared/profile-skeleton"
import { useRecoilValue } from "recoil"
import { useAuthGuard } from "@/components/hooks/use-auth-guard"
import { adminState } from "@/store/adminState"
import { updateAdmin } from "@/api/AdminApi"

const accountFormSchema = z.object({
  username: z.string().min(1, {message: 'This field is required'}),
  password: z.string().min(1, {message: 'This field is required'}),
  confirmPassword: z.string().min(1, {message: 'This field is required'}),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

type AccountFormValues = z.infer<typeof accountFormSchema>

const defaultValues: Partial<AccountFormValues> = {
  username: '',
  password: '',
  confirmPassword: '',
}

export function AccountForm() {
  const adminData = useRecoilValue(adminState);
  const form = useForm<AccountFormValues>({
    resolver: zodResolver(accountFormSchema),
    defaultValues,
    mode: "onChange",
    values: adminData,
  })

  const onSubmit = async (formData: AccountFormValues) => {
    const adminId = adminData?.id;
    const updateAdminDto = {
      username: formData?.username,
      password: formData?.password,
    }

    const response = await updateAdmin(adminId, updateAdminDto) as any;
    
    if (response?.statusCode === 200) {
      toast({
        title: "You changed your password with success",
        description: "Your modifications were taken into account",
      })
      form.reset();
    } else {
      toast({
        title: "You submitted a profile update",
        description: "We've had a server error. Please try later",
        variant: 'destructive',
      })
    }
  }

  useAuthGuard();

  if (!adminData) return <ProfileSkeleton />;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input disabled placeholder="Username" {...field} />
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
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="Password" type='password' {...field} />
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
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input placeholder="Confirm Password" type='password' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Change Password</Button>
      </form>
    </Form>
  )
}
