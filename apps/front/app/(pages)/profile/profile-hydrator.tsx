'use client'

import { applicationAtom } from "@/app/store/applicationAtom"
import { participantDetailsAtom } from "@/app/store/participantDetailsAtom"
import { teamAtom } from "@/app/store/teamAtom"
import { Team } from "@mdm/types"
import { useHydrateAtoms } from "jotai/utils"
import { ReactNode } from "react"

const ProfileHydrator = ({
  application,
  team,
  participantDetails,
  children
}:{
  application: any,
  team: Team,
  participantDetails: any,
  children: ReactNode
}) => {
  useHydrateAtoms([
    [applicationAtom, application],
    [teamAtom, team],
    [participantDetailsAtom, participantDetails]
  ])
  return children;
}

export default ProfileHydrator
