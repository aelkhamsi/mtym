"use client"

import { PencilIcon } from "lucide-react";
import { useEffect, useRef } from "react";
import EditButton from "./edit-button";

const TeamAvatar = ({
  team,
}:{
  team: any
}) => {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!team?.id || !ref.current) return;

    import("jdenticon").then((jdenticon) => {
      jdenticon.update(ref.current!, team.id, { backColor: "#ffffff" });
    });
  }, [team?.id]);

  return <svg 
    ref={ref} 
    data-jdenticon-value={team?.id} 
    width="80" 
    height="80" 
  >
    Team Avatar
  </svg>
}

const TeamBanner = ({
  user,
  team,
  className
}:{
  user: any,
  team: any,
  className?: string
}) => {
  const isTeamLeader = user?.team?.leader?.id === user?.id 

  return (
    <div className={`relative flex flex-col gap-y-4 md:flex-row md:gap-y-0 md:gap-x-4 bg-gray-50 rounded-md p-4 border ${className}`}>
      {isTeamLeader && <EditButton className="absolute top-2 right-2" />}
      
      <TeamAvatar team={team} />

      <div>
        <p>
          <span className="text-2xl font-semibold">{team?.name}</span>
          <span className="text-2xl font-base"> | {team?.quadrigram}</span>
        </p>
        <p className="text-sm text-gray-500">{team?.slogan}</p>
      </div>
      
      
    </div>
  )
}

export default TeamBanner
