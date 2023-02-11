import { PanelAlias } from "../shared/interfaces/panel";
import OurTeamPanel from "./our-team-panel/OurTeamPanel";

interface IProps {
  formData: IPanelFormData;
  registerControl: Function;
}

export interface IPanelFormData {
  panelAlias: PanelAlias;
}

function PanelFormsResolver({ formData, registerControl }: IProps) {
  switch(formData.panelAlias) {
    case PanelAlias.OurTeamPanel:
      return <OurTeamPanel formData={formData} registerControl={registerControl} />
    default:
      return <p>this panel is not avalialable yet</p>
  }
}

export default PanelFormsResolver;