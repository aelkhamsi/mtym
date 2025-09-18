"use client"

import { useEffect, useRef } from "react";

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
  team,
  className
}:{
  team: any,
  className?: string
}) => {
  return (
    <div className={`flex flex-col gap-y-4 md:flex-row md:gap-y-0 md:gap-x-4 bg-gray-50 rounded-md p-4 border ${className}`}>
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
