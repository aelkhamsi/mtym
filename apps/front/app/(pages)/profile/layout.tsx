import { Separator } from "@mdm/ui"
import { SidebarNav } from "./sidebar-nav"

interface ProfileLayoutProps {
  children: React.ReactNode
}

export default function ProfileLayout({ children }: ProfileLayoutProps) {
  return (
    <div className="pt-24 w-full lg:w-3/4 px-5 lg:px-0 mb-10">
      <div className="space-y-6 py-10">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Profil</h2>
          <div className="text-muted-foreground">
            Gérez votre candidature et les informations relatives à votre compte.
          </div>
        </div>
        <Separator className="my-6" />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="-mx-4 lg:w-1/5">
            <SidebarNav />
          </aside>
          <div className="flex-1 lg:max-w-3xl">{children}</div>
        </div>
      </div>
    </div>
  )
}
