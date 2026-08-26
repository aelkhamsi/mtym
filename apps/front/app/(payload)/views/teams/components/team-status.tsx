import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@mdm/ui";
import { useAtom } from "jotai";
import { teamsAtom } from "@/app/store/admin/teamsAtom";
import { toast } from "@mdm/ui";
import { updateTeam } from "@/app/api/TeamApi";

export type Status =
  | "APPROVED"
  | "NEW"
  | "DECLINED"
  | "INCOMPLETE";

export const getStatusClassname = (status: Status, size: "sm" | "md") => {
  const baseClassname = `rounded-xl text-center ${size === "md" ? "px-4 py-1 w-[8rem]" : "px-2"}`;
  let colorClassname;

  switch(status) {
    case "APPROVED":
      colorClassname = "bg-[#41D997] text-black";
      break;
    case "NEW":
      colorClassname = "bg-[#EFFF99] text-black";
      break;
    case "DECLINED":
      colorClassname = "bg-[#BF2600] text-white";
      break;
    case "INCOMPLETE":
      colorClassname = "bg-[#FFE380] text-black";
      break;
  }

  return `${baseClassname} ${colorClassname}`;
}

const StatusCard = ({
  value,
}:{
  value: Status,
}) => {
  return (
    <div className={getStatusClassname(value, "md")}>
      {value}
    </div>
  )
}

const TeamStatus = ({
  teamId,
  status,
}:{
  teamId: number,
  status: string,
}) => {
  const [teams, setTeams] = useAtom(teamsAtom);
  const handleStatusChange = async (value: Status) => {
    const response = await updateTeam(teamId, {
      status: value,
    }) as any;

    if (response?.statusCode === 200) {
      setTeams(
        teams.map((entry: any) => {
          if (entry?.id === teamId) {
            return {...entry, status: value}
          }
          return entry;
        }),
      )

      toast({
        title: "Status update",
        description: "The status is updated with success",
      })
    } else {
      toast({
        title: "Status update failed",
        description: "The status update have failed. Please try later.",
        variant: "destructive",
      })
    }
  }

  return (
    <div>
      <Select value={status} onValueChange={handleStatusChange}>
        <SelectTrigger className="w-[11rem]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent
          style={{
            backgroundColor: "var(--theme-input-bg)",
            borderColor: "var(--theme-elevation-150)",
            color: "var(--theme-text)",
          }}
        >
          <SelectItem value="APPROVED"><StatusCard value="APPROVED" /></SelectItem>
          <SelectItem value="NEW"><StatusCard value="NEW" /></SelectItem>
          <SelectItem value="DECLINED"><StatusCard value="DECLINED" /></SelectItem>
          <SelectItem value="INCOMPLETE"><StatusCard value="INCOMPLETE" /></SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}

export default TeamStatus
