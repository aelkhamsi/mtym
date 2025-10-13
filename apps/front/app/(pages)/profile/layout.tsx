import { cookies } from 'next/headers'
import { Separator } from "@mdm/ui"
import { SidebarNav } from "./sidebar-nav"
import SectionContainer from "@/app/components/section-container"
import { getUser } from "@/app/api/UsersApi"
import { getApplicationById } from '@/app/api/ApplicationApi'
import { getTeamById } from '@/app/api/TeamApi'
import ProfileHydrator from './profile-hydrator'
import { Team, User } from '@mdm/types'

interface ProfileLayoutProps {
  children: React.ReactNode
}

export default async function ProfileLayout({ children }: ProfileLayoutProps) {
  const cookieStore = cookies().toString()
  const authUser = await getUser(cookieStore) as User
  const application = await getApplicationById(authUser?.applicationId, cookieStore) as any
  const team = await getTeamById(authUser?.teamId, cookieStore) as Team

  return (
    <ProfileHydrator application={application} team={team}>
      <SectionContainer className="pt-24 pb-20 z-0">
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
      </SectionContainer>
    </ProfileHydrator>
  )
}
