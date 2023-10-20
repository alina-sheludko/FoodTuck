import { Image } from "@mui/icons-material";
import { Button, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useRef, useState } from "react";
import { Control, FieldValues, UseFormRegister, UseFormSetValue } from "react-hook-form";
import Cropper from "../../shared/controls/cropper/Cropper";
import FileUploader from "../../shared/controls/file-uploader/FileUploader";
import { IPicture } from "../../shared/interfaces/picture";
import { IPanelFormData } from "../PanelFormsResolver";
import DeleteIcon from '@mui/icons-material/Delete';

interface IProps {
  formData: IFormData;
  registerControl: UseFormRegister<FieldValues>;
  mainFormControl: Control<FieldValues, unknown>;
  setValue: UseFormSetValue<FieldValues>;
}

interface IFormData extends IPanelFormData {
  title?: string;
  subtitle?: string;
  items?: string[];
}

function IconsPanel({ formData, registerControl, setValue }: IProps) {
  const [items, setItems] = useState<string[]>(formData.items ?? []);

  useEffect(() => {
    registerControl('items', {value: items});
  }, [])

  useEffect(() => {
    setValue('items', items.filter(s => !!s))
  }, [items])

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

      {items.map((item, i) => (
        <Box sx={{mb: 1, display: 'flex', alignItems: 'center'}} key={item+i}>
          <img style={{maxWidth: 300, maxHeight: 300}} src={item} />
          <DeleteIcon sx={{ml: 2}} onClick={() => setItems(items.filter((item, idx) => idx !== i))} />
        </Box>
      ))}

      <Box sx={{mb: 1}}>
        <FileUploader uploadUrl="/api/media/upload" onFileUploaded={(file, url) => url && setItems(items.concat(url))} />
      </Box>
    </>
  )
}

export default IconsPanel;