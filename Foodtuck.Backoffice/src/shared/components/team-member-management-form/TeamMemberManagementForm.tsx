import { ITeamMember } from "../team-management/TeamManagement";

interface IProps {
  member: ITeamMember, 
  onMemberUpdate: (member: ITeamMember) => void,
}

function TeamMemberManagementForm({ member, onMemberUpdate }) {
  return (
    <p>TeamMemberManagementForm</p>
  )
}

export default TeamMemberManagementForm;