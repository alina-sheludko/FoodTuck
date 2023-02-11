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

	const {
		register,
		handleSubmit,
		watch,
		formState,
	} = useForm();

  return (
    <>
      <form onSubmit={handleSubmit((formData) => onPanelUpdate({...formData, id: data.id, panelAlias}))}>
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

        {panelAlias && <PanelFormsResolver formData={{...data, panelAlias}} registerControl={register} />}

        <Button type="submit" variant="contained">Save</Button>
      </form>
    </>
  )
}

export default PanelManagementForm;