import { Box, Button, TextareaAutosize, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { Control, FieldValues, useFieldArray, useForm, UseFormRegister } from "react-hook-form";
import DeleteIcon from '@mui/icons-material/Delete';


interface IProps {
  formData: IFormData;
  registerControl: UseFormRegister<FieldValues>;
  mainFormControl: Control<FieldValues, unknown>;
}

interface IFormData {
  title: string;
  description: string;
  items: IItem[];
}

interface IItem {
  question: string;
  answer: string;
}

function FaqPanel({formData, registerControl, mainFormControl}: IProps) {
  const { fields: items, append, remove } = useFieldArray({ name: 'items', control: mainFormControl });

  useEffect(() => {
    formData?.items?.forEach(item => setTimeout(() => append(item)))
  }, [])

  return (
    <>
      <TextField 
        label="Panel title" 
        variant="outlined" 
        size="small"
        sx={{ mb:1 }}
        {...registerControl("title", {value: formData?.title ?? ''})}
        fullWidth
      />

      <TextareaAutosize 
        placeholder="Panel description" 
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
        {...registerControl("description", {value: formData?.description ?? ''})}
      />

      {items.map((item, i) => (
        <div key={item.id} style={{display: 'flex'}}>
          <div style={{width: '100%'}}>
            <TextField 
              label="Question" 
              variant="outlined" 
              size="small"
              sx={{ mb:1 }}
              {...registerControl(`items[${i}].question`)}
              fullWidth
            />

            <TextareaAutosize 
              placeholder="Answer" 
              {...registerControl(`items[${i}].answer`)}
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
            />
          </div>

          <DeleteIcon onClick={() => remove(i)} />
        </div>
      ))}

      <Box sx={{mb: 1}}>
        <Button variant="contained" onClick={() => append({question: '', answer: ''})}>+ Add item</Button>
      </Box>
    </>
  )
}

export default FaqPanel;