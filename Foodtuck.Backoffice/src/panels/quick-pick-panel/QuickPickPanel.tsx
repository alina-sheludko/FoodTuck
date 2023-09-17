import { Box, Checkbox, TextField } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import FileUploader from "../../shared/controls/file-uploader/FileUploader";
import DeleteIcon from '@mui/icons-material/Delete';
import Cropper from "../../shared/controls/cropper/Cropper";
import axios from "axios";
import { Control, FieldValues, UseFormRegister, UseFormSetValue } from "react-hook-form";
import { IPanelFormData } from "../PanelFormsResolver";
import { IProduct } from "../../shared/interfaces/product";
import { IPicture } from "../../shared/interfaces/picture";
import { mapSrcToPicture } from "../../shared/helpers/map-src-to-picture";

interface IProps {
  formData: IFormData;
  registerControl: UseFormRegister<FieldValues>;
  mainFormControl: Control<FieldValues, unknown>;
  setValue: UseFormSetValue<FieldValues>;
}

interface IFormData extends IPanelFormData {
  title?: string;
  subtitle?: string;
  items?: IItem[];
}

interface IItem {
  id: string;
  category: string;
  image: IPicture;
  discount?: number;
}

interface IMappedProduct extends IProduct {
  isChecked?: boolean;
  image: IPicture;
}


function QuickPickPanel({ formData, registerControl, setValue }: IProps) {
  const [items, setItems] = useState<IItem[]>(formData.items ?? []);
  const [allItems, setAllItems] = useState<IMappedProduct[]>([]);
  const croppedImgs = useRef<{itemId: String, image: IPicture}[]>(
    formData.items?.map(item => ({itemId: item.id, image: item.image})) ?? []
  );

  useEffect(() => {
    registerControl('items', {value: items});

    axios.get('/api/products/getAll')
      .then(({data}) => {
        data.items.forEach((item: IMappedProduct) => {
          item.isChecked = !!items.find(i => i.id === item.id);
        })
        setAllItems(data.items)
      })
  }, [])

  useEffect(() => {
    croppedImgs.current = croppedImgs.current.filter(img => items.find(item => item.id === img.itemId));
    setValue(
      'items', 
      items.map((item, i) => ({...item, image: croppedImgs.current.find(img => item.id === img.itemId)})
    ).filter(s => !!s))
  }, [items])

  function toggleItem(val: boolean, item: IMappedProduct) {
    item.isChecked = val;
    setItems(
      val 
        ? items.concat({
          id: item.id,
          category: item.category, 
          discount: item.discount,
          image: mapSrcToPicture(item.images?.[0], 3),
        })
        : items.filter(i => i.id !== item.id)
    )
  }

  function setCroppedImg(img: IPicture, id: string) {
    if (items.find(item => item.id === id)) {
      croppedImgs.current = croppedImgs.current.map(
        item => item.itemId === id ? {itemId: id, image: img} : item
      )
      setValue(`items[${items.findIndex(item => item.id === id)}].image`, img)
    } else {
      croppedImgs.current = croppedImgs.current.filter(image => image.itemId !== id)
    }
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

      {allItems.map(item => (
        <Box key={item.id}>
          <Checkbox checked={item.isChecked} onChange={(e) => toggleItem(e.target.checked, item)} />
          {item.name}
        </Box>
      ))}

      {items.map((item, i) => (
        <Box key={item.id}>
          <Cropper 
            data={item.image as IPicture}
            isFilePickerHidden={true}
            settings={[
              {width: 260, height: 260, media: '(min-width: 1024px)'},
              {width: 315, height: 315, media: '(min-width: 768px)'},
              {width: 354, height: 354, media: '(max-width: 767px)'},
            ]} 
            onCropsChanged={(img) => setCroppedImg(img, item.id)}
          />
        </Box>
      ))}
    </>
  )
}

export default QuickPickPanel