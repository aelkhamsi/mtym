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
      await sendCustomEmail(application?.user?.email, subject, content)
      await postApplicationReviewEmail(application?.id, {subject, content})

      setApplications(applications.map((application: any) =>
        application.id === application?.id
          ? {
              ...application,
              review: {
                ...application.review,
                emails: [...application.review.emails, {
                  subject,
                  content,
                  sentAt: new Date().toISOString()
                }],
              },
            }
          : application
      ))

      setOpen(false)
      resetForm()
      toast({
        title: 'Sending Email',
        description: 'An email was sent successfully to the applicant!',
        variant: 'success'
      })
    } catch(e) { 
      toast({
        title: 'Sending Email',
        description: 'An error has occured while trying to send the email!',
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
