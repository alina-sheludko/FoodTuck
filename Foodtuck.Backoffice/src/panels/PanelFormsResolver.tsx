import { PanelAlias } from "../shared/interfaces/panel";
import OurTeamPanel from "./our-team-panel/OurTeamPanel";
import FaqPanel from "./faq-panel/FaqPanel";
import { Control, FieldValues, UseFormRegister } from "react-hook-form";

interface IProps {
  formData: IPanelFormData;
  registerControl: UseFormRegister<FieldValues>;
  mainFormControl: Control<FieldValues, unknown>;
}

export interface IPanelFormData {
  panelAlias: PanelAlias;
  [key: string]: any;
}

function PanelFormsResolver({ formData, registerControl, mainFormControl }: IProps) {
  switch(formData.panelAlias) {
    case PanelAlias.OurTeamPanel:
      return <OurTeamPanel formData={formData} registerControl={registerControl} mainFormControl={mainFormControl} />
    case PanelAlias.FaqPanel:
      return <FaqPanel formData={formData} registerControl={registerControl} mainFormControl={mainFormControl} />
    default:
      return <p>this panel is not avalialable yet</p>
  }
}

export default PanelFormsResolver;