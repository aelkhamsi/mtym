'use client'

import { applicationAtom } from "@/app/store/applicationAtom"
import { teamAtom } from "@/app/store/teamAtom"
import { Team } from "@mdm/types"
import { useHydrateAtoms } from "jotai/utils"
import { ReactNode } from "react"

const ProfileHydrator = ({
  application,
  team,
  children
}:{
  application: any,
  team: Team,
  children: ReactNode
}) => {
  useHydrateAtoms([
    [applicationAtom, application],
    [teamAtom, team]
  ])
  return children;
}

export default ProfileHydrator
