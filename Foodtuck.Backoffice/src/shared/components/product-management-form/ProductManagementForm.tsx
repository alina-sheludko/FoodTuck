import { useForm } from "react-hook-form";
import { H1 } from "../../elements/h1/h1";
import { IProductFormConfig } from "../../interfaces/product";
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, TextareaAutosize } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { IPicture } from "../../interfaces/picture";
import axios from "axios";
import FileUploader from "../../controls/file-uploader/FileUploader";
import DeleteIcon from '@mui/icons-material/Delete';

interface IProps {
  formConfig: IProductFormConfig;
  onSubmit: (data: any) => void;
  isEditMode?: boolean;
}

function ProductManagementForm({ formConfig, isEditMode = false, onSubmit }: IProps) {
	const {
		register,
		handleSubmit,
		watch,
		formState,
    setValue,
	} = useForm();
  const [productCategories, setProductCategories] = useState<string[]>([]);
  const [images, setImages] = useState<string[]>(formConfig?.formData?.images || []);
  const [category, setCategory] = useState<string>(formConfig?.formData?.category || '');

  useEffect(() => {
    axios.get('/api/products/getCategories')
      .then(({data}) => {
        setProductCategories(data ?? [])
      })
  }, [])

  return (
    <>
      <H1 style={{marginBottom: '20px'}}>{isEditMode ? 'Update product' : 'Create product'}</H1>

      <form 
        onSubmit={
          handleSubmit(
            (data) => onSubmit({
              ...data, 
              images, 
              price: Number(data.price), 
              discount: Number(data.discount),
              category,
            })
          )
        }
      >
        <TextField 
          label="Name" 
          variant="outlined" 
          size="small"
          sx={{ mb:1 }}
          {...register("name", {value: formConfig?.formData?.name ?? '', required: true})}
          fullWidth
        />

        <TextareaAutosize 
          placeholder="Short description" 
          minRows={3}
          style={{ 
            marginBottom: '8px', 
            width: '100%', 
            display: 'block', 
            resize: 'none', 
            border: '1px solid rgba(0, 0, 0, 0.23)',
            borderRadius: '4px',
            padding: '8.5px 14px'
          }}
          {...register("shortDescription", {value: formConfig?.formData?.shortDescription ?? ''})}
        />

        <TextareaAutosize 
          placeholder="Description" 
          minRows={3}
          style={{ 
            marginBottom: '8px', 
            width: '100%', 
            display: 'block', 
            resize: 'none', 
            border: '1px solid rgba(0, 0, 0, 0.23)',
            borderRadius: '4px',
            padding: '8.5px 14px'
          }}
          {...register("description", {value: formConfig?.formData?.description ?? ''})}
        />

        <TextField 
          label="Price" 
          type="number"
          variant="outlined" 
          size="small"
          sx={{ mb:1 }}
          {...register("price", {value: formConfig?.formData ? formConfig.formData.price + formConfig.formData.discount : 0, required: true})}
          fullWidth
        />

        <TextField 
          label="Discount" 
          type="number"
          variant="outlined" 
          size="small"
          sx={{ mb:1 }}
          {...register("discount", {value: formConfig?.formData?.discount, required: true})}
          fullWidth
        />

        <TextField 
          label="Ingredients" 
          type="text"
          variant="outlined" 
          size="small"
          sx={{ mb:1 }}
          {...register("ingredients", {value: formConfig?.formData?.ingredients})}
          fullWidth
        />

        <TextField 
          label="Calories" 
          type="number"
          variant="outlined" 
          size="small"
          sx={{ mb:1 }}
          {...register("calories", {value: formConfig?.formData?.calories})}
          fullWidth
        />

        <FormControl fullWidth sx={{ mb: 1 }} size="small">
          <InputLabel>Category</InputLabel>
          <Select
            label="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {productCategories?.map((category) => (
              <MenuItem value={category} key={category}>{category}</MenuItem>
            ))}
          </Select>
        </FormControl>

        {images.map((img, i) => (
          <Box sx={{display: 'flex', mb: 1}}>
            <img src={img} alt="" />
            <DeleteIcon onClick={() => setImages(images.filter((im, idx) => i !== idx))}></DeleteIcon>
          </Box>
        ))}
        
        <Box sx={{mb: 2}}>
          <FileUploader uploadUrl="/api/media/upload" onFileUploaded={(file, url) => setImages(images.concat(url!))} />
        </Box>

        <Button type="submit" variant="contained">{isEditMode ? 'Update' : 'Create'}</Button>
      </form>
    </>
	)
}

export default ProductManagementForm;