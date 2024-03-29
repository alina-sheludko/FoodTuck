import { TextField } from "@mui/material";
import { Control, FieldValues, UseFormSetValue, useForm } from "react-hook-form";
import { IPanelFormData } from "../PanelFormsResolver";

interface IProps {
  formData: IFormData;
  registerControl: Function;
  mainFormControl: Control<FieldValues, unknown>;
  setValue: UseFormSetValue<FieldValues>;
}

interface IFormData extends IPanelFormData {
  title?: string;
  subtitle?: string;
}

function OurTeamPanel({ formData, registerControl }: IProps) {
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

      <TextField 
        label="Panel subtitle" 
        variant="outlined" 
        size="small"
        sx={{ mb:1 }}
        {...registerControl("subtitle", {value: formData?.subtitle ?? ''})}
        fullWidth
      />
    </>
  )
}

export default OurTeamPanel;