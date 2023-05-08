import { Container } from "@mui/material";
import ProductManagementForm from "../../shared/components/product-management-form/ProductManagementForm";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function CreateProductPage() {
  const navigate = useNavigate();
  const [productCategories, setProductCategories] = useState<string[]>()

  useEffect(() => {
    axios.get('/api/products/getCategories')
      .then(({data}) => {
        setProductCategories(data)
      })
  }, [])

  function onSubmit(data: any) {
    axios.post('/api/products/create', data)
      .then(() => {
        navigate('/api/ui?tab=2')
      })
  }

  if (productCategories) {
    return (
      <Container maxWidth="sm" sx={{mt:2, mb: 2}}>
        <ProductManagementForm 
          formConfig={{productCategories: productCategories}} 
          onSubmit={onSubmit}
        ></ProductManagementForm>
      </Container>
    )
  }

  return <></>;
}

export default CreateProductPage;