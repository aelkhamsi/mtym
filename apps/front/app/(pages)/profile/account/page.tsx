import { Separator } from "@mdm/ui"
import { AccountForm } from "./account-form";

export default function ProfilePage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Account</h3>
        <p className="text-sm text-muted-foreground">
          That&apos;s how others will see you on the website and application.
        </p>
      </div>
      <Separator />

      <AccountForm />
    </div>
  )
}
