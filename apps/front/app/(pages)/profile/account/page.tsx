import { Separator } from "@mdm/ui"
import { AccountForm } from "./account-form";

export default function ProfilePage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Compte</h3>
        <p className="text-sm text-muted-foreground">
          C&apos;est ainsi que les autres vous verront sur votre candidature.
        </p>
      </div>
      <Separator />

      <AccountForm />
    </div>
  )
}
