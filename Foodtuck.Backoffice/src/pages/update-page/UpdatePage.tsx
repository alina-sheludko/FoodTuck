import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NodeManagementForm from "../../shared/components/node-management-form/NodeManagementForm";
import { INodeManagementFormConfig, INodeManagementFormData } from "../../shared/interfaces/node";

function UpdatePage() {
  const navigate = useNavigate();
  const { pageId } = useParams();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [managementFormConfig, setManagementFormConfig] = useState<INodeManagementFormConfig>();

  useEffect(() => {
    axios.get(
      `/api/node/getUpdateFormData/${pageId}`
    ).then(({data}) => {
      setManagementFormConfig(data)
    }).finally(() => setIsLoading(false));
  }, [])

  function onSubmit(data: INodeManagementFormData) {
    axios.post(`/api/node/update/${pageId}`, {...managementFormConfig!.formData, ...data})
      .then(() => {
        navigate('/api/ui');
      })
  }

  if (isLoading) return <p>loading...</p>

  return (
    <NodeManagementForm isEditMode={true} formConfig={managementFormConfig!} onSubmit={onSubmit} />
  )
}

export default UpdatePage;