'use client'

import { useState } from "react"
import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
  Input,
  Label,
  Textarea,
  toast,
} from "@mdm/ui"
import { sendCustomEmail } from "@/app/api/SmtpApi"
import { postApplicationReviewEmail } from "@/app/api/ApplicationApi"
import { useAtom } from "jotai"
import { applicationsAtom } from "@/app/store/admin/applicationsAtom"

const EmailDialog = ({
  application,
}: {
  application: any
}) => {
  const [applications, setApplications] = useAtom(applicationsAtom)
  const [open, setOpen] = useState(false)
  const [subject, setSubject] = useState("")
  const [content, setContent] = useState("")
  const [isSending, setIsSending] = useState(false)

  const resetForm = () => {
    setSubject("")
    setContent("")
  }

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen)
    if (!nextOpen) resetForm()
  }

  const handleSend = async () => {
    if (!subject || !content) return

    setIsSending(true)

    try {
      const emailResponse = await sendCustomEmail(application?.user?.email, subject, content) as any
      if (emailResponse?.statusCode !== 200) {
        throw new Error(emailResponse?.message ?? 'Failed to send email')
      }
    } catch (e) {
      setIsSending(false)
      toast({
        title: 'Sending Email',
        description: 'An error occurred while trying to send the email. Nothing was sent.',
        variant: 'destructive'
      })
      return
    }

    try {
      await postApplicationReviewEmail(application?.id, { subject, content })

      setApplications(applications.map((app: any) =>
        app.id === application?.id
          ? {
              ...app,
              review: {
                ...app.review,
                emails: [...app.review.emails, {
                  subject,
                  content,
                  sentAt: new Date().toISOString()
                }],
              },
            }
          : app
      ))

      setOpen(false)
      resetForm()
      toast({
        title: 'Sending Email',
        description: 'An email was sent successfully to the applicant!',
        variant: 'success'
      })
    } catch (e) {
      setOpen(false)
      resetForm()
      toast({
        title: 'Sending Email',
        description: 'The email was sent, but failed to save to the history log.',
        variant: 'destructive'
      })
    } finally {
      setIsSending(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline">Send email</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Send email</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-2">
          <div className="grid gap-2">
            <Label htmlFor="email-subject">Subject</Label>
            <Input
              id="email-subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Email subject"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="email-content">Content</Label>
            <Textarea
              id="email-content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your email..."
              rows={8}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="ghost" onClick={() => handleOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSend} disabled={isSending || !subject || !content}>
            {isSending ? "Sending..." : "Send email"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default EmailDialog
