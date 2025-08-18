"use client"

import ResetPasswordForm from './reset-password-form'
import { Suspense } from "react";

export default function ResetPasswordPage() {

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetPasswordForm />
    </Suspense>
  )
}