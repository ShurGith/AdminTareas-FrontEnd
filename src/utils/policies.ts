import { Project, TeamMember } from "@/types"


export const isManager = (mangerId: Project['manager'], userId: TeamMember['_id']) => {
  return mangerId === userId;
}    