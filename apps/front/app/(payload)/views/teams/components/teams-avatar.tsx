"use client"

import { useEffect, useRef } from "react";

const TeamAvatar = ({
  id,
}:{
  id: string
}) => {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!id || !ref.current) return;

    import("jdenticon").then((jdenticon) => {
      jdenticon.update(ref.current!, id, { backColor: "#ffffff" });
    });
  }, [id]);

  return <svg 
    ref={ref} 
    data-jdenticon-value={id} 
    width="40" 
    height="40" 
  >
    Team Avatar
  </svg>
}

export default TeamAvatar
