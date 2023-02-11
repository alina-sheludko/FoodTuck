import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NodeManagement from "../../shared/components/node-management/NodeManagement";
import { INodeManagementFormConfig, INodeManagementFormData } from "../../shared/interfaces/node";

function CreatePage() {
  const navigate = useNavigate();
  let { pageId } = useParams();
  const [managementFormConfig, setManagementFormConfig] = useState<INodeManagementFormConfig>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    axios.get(
      `/api/node/getCreateFormData/${pageId ?? ''}`
    ).then(({data}) => {
      setManagementFormConfig(data)
    }).finally(() => setIsLoading(false));
    setIsLoading(false);
  }, [])

  function onSubmit(data: INodeManagementFormData) {
    data.parentId = pageId;
    if (data.pageAlias === 'homePage') data.url = '/';
    axios.post('/api/node/create', data)
      .then(() => {
        navigate('/api/ui');
      })
  }

  if (isLoading) {
    return <p>loading...</p>
  }

  return <NodeManagement formConfig={managementFormConfig!} onSubmit={onSubmit} />
}

export default CreatePage;