import { Control, FieldValues, UseFormRegister, UseFormSetValue } from "react-hook-form";
import { IPanelFormData } from "../PanelFormsResolver";
import { useEffect, useState } from "react";
import { Box, Checkbox, TextField } from "@mui/material";
import FileUploader from "../../shared/controls/file-uploader/FileUploader";
import DeleteIcon from '@mui/icons-material/Delete';
import axios from "axios";
import { IProduct } from "../../shared/interfaces/product";

interface IProps {
  formData: IFormData;
  registerControl: UseFormRegister<FieldValues>;
  mainFormControl: Control<FieldValues, unknown>;
  setValue: UseFormSetValue<FieldValues>;
}

interface IFormData extends IPanelFormData {
  title?: string;
  topIcon?: string;
  items?: IItem[];
}

interface IItem {
  id: string;
  price: number;
  name: string;
  ingridients?: string;
  calories?: number;
  isChecked?: boolean;
}

function MenuPanel({ formData, registerControl, setValue }: IProps) {
  const [items, setItems] = useState<IItem[]>(formData.items ?? []);
  const [topIcon, setTopIcon] = useState<string>(formData.topIcon ?? '');
  const [allItems, setAllItems] = useState<IItem[]>([]);

  useEffect(() => {
    registerControl('items', {value: items});
    registerControl('topIcon', {value: topIcon});

    axios.get('/api/products/getAll')
      .then(({data}) => {
        data.items.forEach((item: IItem) => {
          item.isChecked = !!items.find(i => i.id === item.id);
        })
        setAllItems(data.items)
      })
  }, [])

  useEffect(() => {
    setValue('items', items.filter(s => !!s))
  }, [items])

  useEffect(() => {
    setValue('topIcon', topIcon)
  }, [topIcon])

  function toggleItem(val: boolean, item: IProduct) {
    (item as IItem).isChecked = val;
    setItems(
      val 
        ? items.concat({
          id: item.id,
          name: item.name, 
          ingridients: item.ingridients, 
          calories: item.calories, 
          price: item.price - item.discount,
        })
        : items.filter(i => i.id !== item.id)
    )
  }

  return (
    <>
      {topIcon && (
        <Box sx={{mb: 1, display: 'flex', alignItems: 'center'}}>
          <img style={{maxWidth: 300, maxHeight: 300}} src={topIcon} />
          <DeleteIcon sx={{ml: 2}} onClick={() => setTopIcon('')} />
        </Box>
      )}

      <Box sx={{mb: 1}}>
        <FileUploader uploadUrl="/api/media/upload" onFileUploaded={(file, url) => url && setTopIcon(url)} />
      </Box>

      <TextField 
        label="Panel title" 
        variant="outlined" 
        size="small"
        sx={{ mb:1 }}
        {...registerControl("title", {value: formData?.title ?? ''})}
        fullWidth
      />

      {allItems.map(item => (
        <Box key={item.id}>
          <Checkbox checked={item.isChecked} onChange={(e) => toggleItem(e.target.checked, item)} />
          {item.name}
        </Box>
      ))}
    </>
  )
}

export default MenuPanel;