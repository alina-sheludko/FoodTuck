import { Box, Checkbox, TextField } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import FileUploader from "../../shared/controls/file-uploader/FileUploader";
import DeleteIcon from '@mui/icons-material/Delete';
import Cropper from "../../shared/controls/cropper/Cropper";
import axios from "axios";
import { Control, FieldValues, FormState, UseFormGetValues, UseFormRegister, UseFormSetValue } from "react-hook-form";
import { IPanelFormData } from "../PanelFormsResolver";
import { IProduct } from "../../shared/interfaces/product";
import { IPicture } from "../../shared/interfaces/picture";
import { mapSrcToPicture } from "../../shared/helpers/map-src-to-picture";
import RichTextEditor from 'jodit-react';

interface IProps {
  formData: IFormData;
  registerControl: UseFormRegister<FieldValues>;
  mainFormControl: Control<FieldValues, unknown>;
  setValue: UseFormSetValue<FieldValues>;
  getValues: UseFormGetValues<FieldValues>;
}

interface IFormData extends IPanelFormData {
  title?: string;
  subtitle?: string;
  description?: string;
  link?: string;
  images?: IPicture[];
}


function SpotWithMultipleImagesPanel({ formData, registerControl, setValue, getValues }: IProps) {
  const [images, setImages] = useState<IPicture[]>((formData.images ?? []));
  const [description, setDescription] = useState(formData.description ?? '');

  useEffect(() => {
    registerControl('images', {value: formData.images ?? []});
    registerControl('description', {value: formData.description ?? ''});
  }, [])

  useEffect(() => {
    setValue('images', images.filter(img => !!img));
  }, [images])

  useEffect(() => {
    setValue('description', description);
  }, [description])

  function setCroppedImg(img: IPicture) {
    const imgs: IPicture[] = [...images];
    const indexToUpdate = imgs.findIndex(image => image.src === img.src);
    if (indexToUpdate !== -1) {
      imgs.splice(indexToUpdate, 1, img)
      setImages(imgs);
    }
  }

  function onImgUploaded(src: string) {
    setImages(images.concat(mapSrcToPicture(src, 3)))
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

      <TextField 
        label="Panel subtitle" 
        variant="outlined" 
        size="small"
        sx={{ mb:1 }}
        {...registerControl("subtitle", {value: formData?.subtitle ?? ''})}
        fullWidth
      />

      <Box sx={{ mb:1 }}>
        <RichTextEditor
          config={{readonly: false}}
          value={description}
          onBlur={(val) => setDescription(val)}
        />
      </Box>

      <TextField 
        label="Link" 
        variant="outlined" 
        size="small"
        sx={{ mb:1 }}
        {...registerControl("link", {value: formData?.link ?? ''})}
        fullWidth
      />

      {images.map((image, i) => (
        <Box key={image.src}>
          <Cropper 
            data={image}
            settings={[
              {width: 660, height: 330, media: '(min-width: 1024px)'},
              {width: 984, height: 492, media: '(min-width: 768px)'},
              {width: 728, height: 364, media: '(max-width: 767px)'},
            ]} 
            isFilePickerHidden={true}
            onCropsChanged={(img) => setCroppedImg(img)}
          />
        </Box>
      ))}

      <FileUploader uploadUrl="/api/media/upload" onFileUploaded={(file, url) => onImgUploaded(url!)} />
    </>
  )
}

export default SpotWithMultipleImagesPanel