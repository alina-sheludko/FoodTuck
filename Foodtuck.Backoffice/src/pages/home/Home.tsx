import { Container } from "@mui/material";
import axios from "axios"
import { useEffect, useState } from "react"
import { Navigate } from "react-router-dom";
import NodesList from "../../shared/components/nodes-list/NodesList"
import { mapNodesIntoTree } from "../../shared/helpers/map-into-tree"

function HomePage() {
  const [nodes, setNodes] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);

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
    <Container maxWidth="sm" sx={{mt:2}}>
      <NodesList nodes={nodes} />
    </Container>
  )
}

export default HomePage