import { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

interface IProps {
  products: IProduct[];
}

interface IProduct {
  id: string,
  name: string,
  description: string,
  price: number,
}

interface IGetAllResponse {
  items: IProduct[];
}

function ProductsList({products: productsInitial}: IProps) {
  const [products, setProducts]= useState<IProduct[]>(productsInitial ?? []);

  useEffect(() => {
    if (!products.length) {
      axios.get('/api/products/getAll').then(({data}: AxiosResponse<IGetAllResponse>) => {
        setProducts(data.items);
      })
    }
  }, [])

  function deleteProduct(e: Event, id: string) {
    e.preventDefault();

    axios.delete(`/api/products/delete/${id}`)
      .then(() => {
        setProducts(products.filter(product => product.id !== id))
      })
  }

  return (
    <List
      sx={{ width: '100%', bgcolor: 'background.paper' }}
      component="nav"
    >
      {products.map(product => (
        <ListItemButton 
          key={product.id}
          sx={{cursor: 'pointer'}}
          component="a" 
          href={`/api/ui/products/update/${product.id}`}
        >
          <ListItemText primary={product.name} />
          <ListItemIcon sx={{cursor: 'pointer'}} onClick={(e: any) => deleteProduct(e, product.id)}>
            <DeleteIcon onClick={(e: any) => deleteProduct(e, product.id)} />
          </ListItemIcon>
        </ListItemButton>
      ))}

      <ListItemButton 
        sx={{
          fontWeight: 'bold', 
          justifyContent: 'center', 
          color: '#1976d2'
        }}
        component="a" 
        href="/api/ui/products/create"
      >
        +
      </ListItemButton>
    </List>
  )
}

export default ProductsList;