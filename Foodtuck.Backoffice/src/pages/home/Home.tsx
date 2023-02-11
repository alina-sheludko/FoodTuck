import { Container, Tab, Tabs } from "@mui/material";
import axios from "axios"
import { useEffect, useState } from "react"
import { Navigate } from "react-router-dom";
import NodesList from "../../shared/components/nodes-list/NodesList"
import { mapNodesIntoTree } from "../../shared/helpers/map-into-tree"
import TeamManagement from "../../shared/components/team-management/TeamManagement";

function HomePage() {
  const [nodes, setNodes] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [tab, setTab] = useState(0);

  useEffect(() => {
    axios.get('/api/node/getAll')
      .then(({data}) => {
        if (data?.length) setNodes([mapNodesIntoTree(data)])
      })
      .finally(() => setIsLoading(false));
  }, [])

  if (isLoading) return <p>loading...</p>

  if (!nodes?.length) {
    return <Navigate to="/api/ui/create" />
  }

  return (
    <>
      <Tabs value={tab} onChange={(e, val) => setTab(val)} sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tab label="Pages list" sx={{ml: 'auto'}} />
        <Tab label="Team members" sx={{mr: 'auto'}} />
      </Tabs>
      
      {tab === 0 && (
        <Container maxWidth="sm" sx={{mt:2}}>
          <NodesList nodes={nodes} />
        </Container>
      )}

      {tab === 1 && (
        <Container maxWidth="sm" sx={{mt:2}}>
          <TeamManagement />
        </Container>
      )}
    </>
  )
}

export default HomePage