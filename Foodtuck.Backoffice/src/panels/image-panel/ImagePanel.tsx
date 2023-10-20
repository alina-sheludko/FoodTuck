import { TextareaAutosize, TextField } from "@mui/material";
import { useEffect, useRef } from "react";
import { Control, FieldValues, UseFormRegister, UseFormSetValue } from "react-hook-form";
import Cropper from "../../shared/controls/cropper/Cropper";
import { IPicture } from "../../shared/interfaces/picture";
import { IPanelFormData } from "../PanelFormsResolver";

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

function ImagePanel({ formData, registerControl, setValue }: IProps) {
  const croppedImg = useRef<IPicture | null>(formData.img?.src ? formData.img : null);
  
  useEffect(() => {
    registerControl('img', {value: croppedImg.current});
  }, [])

  function setImg(data: IPicture) {
    croppedImg.current = data;
    setValue("img", data)
  }

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

      <Cropper 
        data={croppedImg.current}
        settings={[
          {width: 1320, height: 386, media: '(min-width: 1024px)'},
          {width: 1024, height: 300, media: '(min-width: 768px)'},
          {width: 767, height: 225, media: '(max-width: 767px)'},
        ]} 
        onCropsChanged={setImg}
      />
    </>
  )
}

export default ImagePanel;