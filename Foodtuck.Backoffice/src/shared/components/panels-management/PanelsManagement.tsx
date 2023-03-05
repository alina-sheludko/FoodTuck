import { Accordion, AccordionDetails, AccordionSummary, Button, Typography, Box } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect, useState } from "react";
import PanelManagementForm from "../panel-management-form/PanelManagementForm";
import axios from "axios";
import { PanelAlias } from "../../interfaces/panel";

interface IProps {
  panels: any[];
  onSubmit: (data: {panels: any[]}) => void; 
}

const availablePanelAliases = Object.values(PanelAlias);

function PanelsManagement({ panels: panelsInitial, onSubmit }: IProps) {
  const [panels, setPanels] = useState(panelsInitial?.map(p => ({...p, id: crypto.randomUUID()})) ?? []);
  const [error, setError] = useState('');

  useEffect(() => {
    setError('');
  }, [panels])

  function submit() {
    if (validate()) {
      onSubmit({ panels })
    }
  }

  function validate() {
    const hasEmptyPanels = !!panels.find(panel => !panel.panelAlias);
    if (hasEmptyPanels) setError("There shouldn't be any empty panel");
    return !hasEmptyPanels;
  }

  function addPanel() {
    setPanels([...panels, {availablePanelTypes: availablePanelAliases, id: crypto.randomUUID()}])
  }

  function onPanelUpdate(panelData: any) {
    const newPanels = [...panels];
    const panelIndex = panels.findIndex(({id}) => id === panelData.id);
    newPanels.splice(panelIndex, 1, panelData);
    setPanels(newPanels);
  }

  function onPanelDelete(panelId: string) {
    const newPanels = [...panels];
    const panelIndex = panels.findIndex(({id}) => id === panelId);
    newPanels.splice(panelIndex, 1);
    setPanels(newPanels);
  }

  function changeOrder(e: MouseEvent, panelId: string, diffWithCurrentIndex: number) {
    e.preventDefault();
    e.stopPropagation();

    const newPanels = [...panels];
    const panelIndex = panels.findIndex(({id}) => id === panelId);

    if (panelIndex + diffWithCurrentIndex < 0 || panelIndex + diffWithCurrentIndex > panels.length-1) return;

    const [currentPanel] = newPanels.splice(panelIndex, 1);
    newPanels.splice(panelIndex + diffWithCurrentIndex, 0, currentPanel)
    setPanels(newPanels);
  }

  return (
    <>
      {panels?.map(panel => (
        <Accordion key={panel.id}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>{panel.panelAlias ?? 'New panel'}</Typography>

            <DeleteIcon sx={{ml: 'auto'}} onClick={onPanelDelete as any} />

            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', width: '24px', height: '24px'}}>
              <button 
                style={{width: '12px', height: '12px', padding: 0, fontSize: '12px', lineHeight: 0, transform: 'rotate(-90deg)'}}
                onClick={(e) => changeOrder(e, panel.id, -1)}
              >➤</button>
              <button 
                style={{width: '12px', height: '12px', padding: 0, fontSize: '12px', lineHeight: 0, transform: 'rotate(90deg)'}}
                onClick={(e) => changeOrder(e, panel.id, 1)}
              >➤</button>
            </div>
          </AccordionSummary>
          <AccordionDetails>
            <PanelManagementForm data={panel} onPanelUpdate={onPanelUpdate} />
          </AccordionDetails>
        </Accordion>
      ))}

      <Box sx={{mt: 2}}>
        <Button variant="contained" onClick={submit}>Update</Button>
        <Button variant="outlined" sx={{ml: 2}} onClick={addPanel}>+ Add Panel</Button>
      </Box>

      {error && <Typography sx={{mt: 1}}>{error}</Typography>}
    </>
  )
}

export default PanelsManagement;