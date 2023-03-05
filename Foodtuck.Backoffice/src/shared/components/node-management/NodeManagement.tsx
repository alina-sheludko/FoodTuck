import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useState } from 'react';
import Container from '@mui/material/Container';
import NodeManagementForm from "../node-management-form/NodeManagementForm";
import PanelsManagement from "../panels-management/PanelsManagement";
import { INodeManagementFormConfig } from '../../interfaces/node';

interface IProps {
  formConfig: INodeManagementFormConfig;
  onSubmit: (data: any) => void;
  isEditMode?: boolean;
}

export function NodeManagement({ formConfig, onSubmit, isEditMode = false }: IProps) {
  const [tab, setTab] = useState(0);

  return formConfig && (
    <>
      <Tabs value={tab} onChange={(e, val) => setTab(val)} sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tab label="Page data" sx={{ml: 'auto'}} />
        <Tab label="Panels" sx={{mr: 'auto'}} />
      </Tabs>
      <TabPanel value={tab} index={0}>
        <NodeManagementForm isEditMode={isEditMode} formConfig={formConfig} onSubmit={onSubmit} />
      </TabPanel>
      <TabPanel value={tab} index={1}>
        <PanelsManagement panels={formConfig.formData?.panels ?? []} onSubmit={onSubmit} />
      </TabPanel>
    </>
  )
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Container maxWidth="sm" sx={{mt: 2}}>
          {children}
        </Container>
      )}
    </div>
  );
}

export default NodeManagement;