import { Team } from "./Team";

export type User = {
  id: number;

  firstName: string;

  lastName: string;

  email: string;

  verified: boolean;

  application: any;

  team: Team;

  participantDetails: any;
}
