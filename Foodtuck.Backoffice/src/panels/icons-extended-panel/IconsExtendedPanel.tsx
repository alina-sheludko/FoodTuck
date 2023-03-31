import { Accordion, AccordionDetails, AccordionSummary, Button, TextareaAutosize, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useRef, useState } from "react";
import { Control, FieldValues, useFieldArray, UseFormRegister, UseFormSetValue } from "react-hook-form";
import FileUploader from "../../shared/controls/file-uploader/FileUploader";
import { IPanelFormData } from "../PanelFormsResolver";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';
import Cropper from "../../shared/controls/cropper/Cropper";
import { IPicture } from "../../shared/interfaces/picture";

interface IProps {
  formData: IFormData;
  registerControl: UseFormRegister<FieldValues>;
  mainFormControl: Control<FieldValues, unknown>;
  setValue: UseFormSetValue<FieldValues>;
}

interface IFormData extends IPanelFormData {
  items: IItem[];
  backgroundImg: IPicture;
}

interface IItem {
  icon: string;
  title: string;
  subtitle: string;
  description: string;
}

function IconsPanel({ formData, registerControl, mainFormControl, setValue }: IProps) {
  const [rerenderVal, triggerRerender] = useState(false);
  const { fields: items, append, remove, update } = useFieldArray({ name: 'items', control: mainFormControl });

  useEffect(() => {
    formData?.items?.forEach(item => setTimeout(() => append(item)));
    registerControl('backgroundImg', {value: formData?.backgroundImg ?? ''});

    setTimeout(() => console.log(mainFormControl), 3000)
  }, [])
  
  function updateIcon(iconUrl: string, i: number) {
    setValue(`items.${i}.icon`, iconUrl);
    triggerRerender(!rerenderVal);
  }

  return (
    <>
      {items.map((item: any, i: number) => (
        <Accordion key={item.id}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>{(item.title || item.subtitle) ?? 'New item'}</Typography>

            <DeleteIcon sx={{ml: 'auto'}} onClick={() => remove(i)} />

            {/* <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', width: '24px', height: '24px'}}>
              <button 
                style={{width: '12px', height: '12px', padding: 0, fontSize: '12px', lineHeight: 0, transform: 'rotate(-90deg)'}}
                onClick={(e) => changeOrder(e, panel.id, -1)}
              >➤</button>
              <button 
                style={{width: '12px', height: '12px', padding: 0, fontSize: '12px', lineHeight: 0, transform: 'rotate(90deg)'}}
                onClick={(e) => changeOrder(e, panel.id, 1)}
              >➤</button>
            </div> */}
          </AccordionSummary>
          <AccordionDetails>
            <TextField 
              label="Item title" 
              variant="outlined" 
              size="small"
              sx={{ mb:1 }}
              {...registerControl(`items[${i}].title`)}
              fullWidth
            />

            <TextField 
              label="Item subtitle" 
              variant="outlined" 
              size="small"
              sx={{ mb:1 }}
              {...registerControl(`items[${i}].subtitle`)}
              fullWidth
            />

            <TextareaAutosize 
              placeholder="Item description" 
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
              {...registerControl(`items[${i}].description`)}
            />

            <Box sx={{mb: 1}}>
              <img src={(mainFormControl._formValues.items as any)[i].icon} alt="" />
            </Box>

            <Box sx={{mb: 1}}>
              <FileUploader uploadUrl="/api/media/upload" onFileUploaded={(file, url) => url && updateIcon(url, i)} />
            </Box>
          </AccordionDetails>
        </Accordion>
      ))}

      <Button 
        sx={{mb: 2, mt: 1}}
        size="small" 
        variant="contained" 
        onClick={append}
      >
        + Add item
      </Button>

      <Cropper 
        data={formData?.backgroundImg}
        settings={[
          {width: 878, height: 670, media: '(min-width: 1024px)'},
          {width: 878, height: 670, media: '(min-width: 768px)'},
          {width: 767, height: 585, media: '(max-width: 767px)'},
        ]} 
        onCropsChanged={val => setValue("backgroundImg", val)} 
      />
    </>
  )
}

export default IconsPanel;