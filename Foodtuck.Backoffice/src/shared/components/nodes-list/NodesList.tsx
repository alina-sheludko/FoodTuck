import { INode } from "../../interfaces/node";
import { Collapse, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import ExpandMore from '@mui/icons-material/ExpandMore';
import ExpandLess from '@mui/icons-material/ExpandLess';
import AddBoxIcon from '@mui/icons-material/AddBox';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useReducer } from "react";

interface INodeMapped extends INode {
  isOpened: boolean;
}

function NodesList({nodes}: {nodes: INodeMapped[]}) {
  const [, forceUpdate] = useReducer(x => x + 1, 0);
  const navigate = useNavigate();

  function goToUpdateForm(id: string) {
    navigate(`/api/ui/update/${id}`)
  }

  function goToCreate(e: MouseEvent, id: string) {
    e.stopPropagation();
    navigate(`/api/ui/create/${id}`)
  }

  async function deleteNode(e: MouseEvent, id: string) {
    e.stopPropagation();
    await axios.delete(`/api/node/delete/${id}`);
    window.location.reload();
  }

  function toggleItem(e: MouseEvent, node: INodeMapped) {
    e.stopPropagation();
    node.isOpened = !node.isOpened;
    forceUpdate();
  }

  return (
    <List
      sx={{ width: '100%', bgcolor: 'background.paper' }}
      component="nav"
    >
      {nodes.map(node => (
        <div key={node.url}>
          <ListItem onClick={() => goToUpdateForm(node.id)}>
            <ListItemText primary={node.pageTitle} sx={{cursor: 'pointer'}} />
            <ListItemIcon sx={{cursor: 'pointer'}} onClick={(e: any) => goToCreate(e, node.id)}>
              <AddBoxIcon />
            </ListItemIcon>
            <ListItemIcon sx={{cursor: 'pointer'}} onClick={(e: any) => deleteNode(e, node.id)}>
              <DeleteIcon />
            </ListItemIcon>
            {node.childNodes?.length && (
              <>
                {node.isOpened 
                  ? <ExpandLess sx={{cursor: 'pointer'}} onClick={(e: any) => toggleItem(e, node)} /> 
                  : <ExpandMore sx={{cursor: 'pointer'}} onClick={(e: any) => toggleItem(e, node)} />
                }
              </>
            )}
          </ListItem>
          {node.childNodes?.length && (
            <Collapse in={node.isOpened} timeout="auto" unmountOnExit sx={{ pl: 4 }}>
               <NodesList nodes={node.childNodes as INodeMapped[]} />
            </Collapse>
          )}
        </div>
      ))}
    </List>
  )
}

export default NodesList;