export type Team = {
  id: number;
  name: string;
  slogan: string;
  quadrigram: string;
  status: "APPROVED" | "NEW" | "DECLINED" | "INCOMPLETE";
  leader: any;
  users?: any[],
  reports?: TeamReport[];
}

export type TeamReport = {
  id: number;
  reportType: "INTERMEDIATE" | "FINAL";
  problemNumber: number;
  fileUrl: string;
  createdAt: string;
  updatedAt: string;
}
