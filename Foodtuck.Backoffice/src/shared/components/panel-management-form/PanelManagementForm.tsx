import { Button, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { PanelAlias } from "../../interfaces/panel";
import PanelFormsResolver from "../../../panels/PanelFormsResolver";

interface IProps {
  data: {
    availablePanelTypes?: PanelAlias[];
    panelAlias?: PanelAlias;
    id: string;
  };
  onPanelUpdate: (data: any) => void;
}

function PanelManagementForm({ data, onPanelUpdate }: IProps) {
  const [panelAlias, setPanelAlias] = useState<PanelAlias | ''>(data?.panelAlias ?? '');

  function onSubmit(formData: any) {
    if (formData.panelAlias === PanelAlias.FaqPanel) {
      formData.items = formData.items.map((item: any) => ({question: item.question, answer: item.answer}))
    } else if (formData.panelAlias === PanelAlias.IconsExtendedPanel) {
      formData.items = formData.items.map((item: any) => ({title: item.title, subtitle: item.subtitle, description: item.description, icon: item.icon}))
    }

    onPanelUpdate(formData);
  }

	const {
		register,
    control,
		handleSubmit,
		watch,
		formState,
    setValue,
	} = useForm();

  return (
    <>
      <form onSubmit={handleSubmit((formData) => onSubmit({...formData, id: data.id, panelAlias}))}>
        {data.availablePanelTypes && (
          <FormControl fullWidth sx={{ mb: 1 }} size="small">
            <InputLabel>Panel alias</InputLabel>
            <Select
              {...register("panelAlias", {required: true})}
              value={panelAlias}
              onChange={e => setPanelAlias(e.target.value as PanelAlias)}
              label="Panel alias"
            >
              {data?.availablePanelTypes?.map((type) => (
                <MenuItem value={type} key={type}>{type}</MenuItem>
              ))}
            </Select>
          </FormControl>
        )}

        {panelAlias && <PanelFormsResolver 
          formData={{...data, panelAlias}} 
          registerControl={register} 
          mainFormControl={control}
          setValue={setValue}
        />}

        <Button type="submit" variant="contained">Save</Button>
      </form>
    </>
  )
}

export default PanelManagementForm;