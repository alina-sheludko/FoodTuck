import { Button, Checkbox, Container, FormControl, FormControlLabel, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { H1 } from "../../elements/h1/h1";
import { INodeManagementFormConfig } from "../../interfaces/node";

interface IProps {
  formConfig: INodeManagementFormConfig;
  onSubmit: (data: any) => void;
  isEditMode?: boolean;
}

function NodeManagementForm({ formConfig, onSubmit, isEditMode = false }: IProps) {
  const [pageAlias, setPageAlias] = useState(formConfig?.formData?.pageAlias ?? '');

	const {
		register,
		handleSubmit,
		watch,
		formState,
	} = useForm();

	return (
    <Container maxWidth="sm" sx={{mt:2}}>
      <H1 style={{marginBottom: '20px'}}>{isEditMode ? 'Update page' : 'Create page'}</H1>

			<form onSubmit={handleSubmit(onSubmit)}>
        <FormControl fullWidth sx={{ mb: 1 }} size="small">
          <InputLabel>Page alias</InputLabel>
          <Select
            {...register("pageAlias", {required: true})}
            value={pageAlias}
            onChange={e => setPageAlias(e.target.value)}
            label="Page alias"
          >
            {formConfig?.availablePageTypes?.map((type) => (
              <MenuItem value={type} key={type}>{type}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField 
          label="Page title" 
          variant="outlined" 
          size="small"
          sx={{ mb:1 }}
          {...register("pageTitle", {value: formConfig?.formData?.pageTitle ?? ''})}
          fullWidth
        />

        <TextField 
          label="Node url string" 
          variant="outlined" 
          size="small"
          sx={{ mb:1 }}
          {...register("url", {value: formConfig?.formData?.url ?? ''})}
          fullWidth
        />

        <FormControlLabel 
          control={<Checkbox defaultChecked={formConfig?.formData?.addToTopNavigation ?? false} {...register("addToTopNavigation")}/>} 
          label="Add to top navigation"
          sx={{display: "block", w: "fit-content"}}
        />

				<Button type="submit" variant="contained">{isEditMode ? 'Update' : 'Create'}</Button>
			</form>
    </Container>
	);
}

export default NodeManagementForm;
