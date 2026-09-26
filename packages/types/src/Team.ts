export type Team = {
  id: number;
  name: string;
  slogan: string;
  quadrigram: string;
  qualifCenter: string;
  status: "APPROVED" | "NEW" | "DECLINED" | "INCOMPLETE";
  leader: any;
  users?: any[],
  review: any;
  reports?: TeamReport[];
  finalReportRanking?: number[] | null;
}

export type TeamReport = {
  id: number;
  reportType: "INTERMEDIATE" | "FINAL";
  problemNumber: number;
  fileUrl: string;
  createdAt: string;
  updatedAt: string;
}
