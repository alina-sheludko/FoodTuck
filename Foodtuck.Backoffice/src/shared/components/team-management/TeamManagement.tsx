import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';
import TeamMemberManagementForm from "../team-member-management-form/TeamMemberManagementForm";
import { IPicture } from "../../interfaces/picture";


export interface ITeamMember {
  img: IPicture | null, 
  name: string;
  surname: string;
  jobTitle: string;
  id?: string;
}

function TeamManagement() {
  const [teamMembers, setTeamMembers] = useState<ITeamMember[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    setError('');
  }, [teamMembers])

  useEffect(() => {
    axios.get('/api/team-member/getAll').then(({data}) => {
      setTeamMembers(data)
    })
  }, [])

  function submit() {
    if (validate()) {
      axios.post('/api/team-member/update', { teamMembers })
    }
  }

  function validate() {
    const hasInvalidMembers = !teamMembers.every(member => member.name && member.surname && member.jobTitle);
    if (hasInvalidMembers) setError("There are invalid members");
    return !hasInvalidMembers;
  }

  function addMember() {
    setTeamMembers([...teamMembers, {img: null, name: '', surname: '', jobTitle: ''}])
  }

  function onMemberUpdate(memberData: any) {
    const newTeamMembers = [...teamMembers];
    const memberIndex = newTeamMembers.findIndex(({id}) => id === memberData.id);
    newTeamMembers.splice(memberIndex, 1, memberData);
    setTeamMembers(newTeamMembers);
  }

  function onMemberDelete(e: MouseEvent, memberId: string) {
    e.preventDefault();
    e.stopPropagation();

    const newTeamMembers = [...teamMembers];
    const memberIndex = newTeamMembers.findIndex(({id}) => id === memberId);
    newTeamMembers.splice(memberIndex, 1);
    setTeamMembers(newTeamMembers);
  }

  return (
    <>
      {teamMembers?.map(teamMember => (
        <Accordion key={teamMember.id}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>
              {teamMember.surname && teamMember.name ? `${teamMember.surname} ${teamMember.name}` : 'New team member'}
            </Typography>

            <DeleteIcon sx={{ml: 'auto'}} onClick={(e) => onMemberDelete(e as any, teamMember.id!)} />
          </AccordionSummary>
          <AccordionDetails>
            <TeamMemberManagementForm member={teamMember} onMemberUpdate={onMemberUpdate} />
          </AccordionDetails>
        </Accordion>
      ))}

      <Box sx={{mt: 2}}>
        <Button variant="contained" onClick={submit}>Update members</Button>
        <Button variant="outlined" sx={{ml: 2}} onClick={addMember}>+ Add Team Member</Button>
      </Box>

      {error && <Typography sx={{mt: 1}}>{error}</Typography>}
    </>
  )
}

export default TeamManagement;