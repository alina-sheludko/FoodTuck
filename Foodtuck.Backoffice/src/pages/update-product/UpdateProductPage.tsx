import { Container } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProductManagementForm from "../../shared/components/product-management-form/ProductManagementForm";

function UpdateProductPage() {
  const navigate = useNavigate();
  const params = useParams();
  const [productCategories, setProductCategories] = useState<string[]>()
  const [formData, setFormData] = useState<any>()

  useEffect(() => {
    axios.get('/api/products/getCategories')
      .then(({data}) => {
        setProductCategories(data)
      })
  
    axios.post('/api/products/getById', {id: params.productId})
      .then(({data}) => {
        setFormData(data)
      })
  }, [])

  function onSubmit(data: any) {
    axios.post('/api/products/update', {...data, id: params.productId})
      .then(() => {
        navigate('/api/ui?tab=2')
      })
  }

  return productCategories && formData && (
    <Container maxWidth="sm" sx={{mt:2, mb: 2}}>
      <ProductManagementForm 
        formConfig={{formData, productCategories: productCategories}} 
        onSubmit={onSubmit}
        isEditMode={true}
      ></ProductManagementForm>
    </Container>
  )
}

export default UpdateProductPage;