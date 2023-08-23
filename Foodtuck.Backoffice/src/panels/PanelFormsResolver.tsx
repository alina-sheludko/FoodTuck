import { PanelAlias } from "../shared/interfaces/panel";
import OurTeamPanel from "./our-team-panel/OurTeamPanel";
import FaqPanel from "./faq-panel/FaqPanel";
import HomeHeroPanel from "./home-hero-panel/HomeHeroPanel";
import IconsPanel from "./icons-panel/IconsPanel";
import IconsExtendedPanel from "./icons-extended-panel/IconsExtendedPanel";
import ImagePanel from "./image-panel/ImagePanel";
import VideoPanel from "./video-panel/VideoPanel";
import MenuPanel from "./menu-panel/MenuPanel";
import { Control, FieldValues, UseFormRegister, UseFormSetValue } from "react-hook-form";
import { Box } from "@mui/material";
import QuickPickPanel from "./quick-pick-panel/QuickPickPanel";

interface IProps {
  formData: IPanelFormData;
  registerControl: UseFormRegister<FieldValues>;
  mainFormControl: Control<FieldValues, unknown>;
  setValue: UseFormSetValue<FieldValues>;
}

export interface IPanelFormData {
  panelAlias: PanelAlias;
  [key: string]: any;
}

function PanelFormsResolver({ formData, registerControl, mainFormControl, setValue }: IProps) {
  switch(formData.panelAlias) {
    case PanelAlias.OurTeamPanel:
      return <OurTeamPanel formData={formData} registerControl={registerControl} mainFormControl={mainFormControl} setValue={setValue} />
    case PanelAlias.FaqPanel:
      return <FaqPanel formData={formData} registerControl={registerControl} mainFormControl={mainFormControl} setValue={setValue} />
    case PanelAlias.HomeHeroPanel:
      return <HomeHeroPanel formData={formData} registerControl={registerControl} mainFormControl={mainFormControl} setValue={setValue} />
    case PanelAlias.IconsPanel:
      return <IconsPanel formData={formData} registerControl={registerControl} mainFormControl={mainFormControl} setValue={setValue} />
    case PanelAlias.IconsExtendedPanel:
      return <IconsExtendedPanel formData={formData} registerControl={registerControl} mainFormControl={mainFormControl} setValue={setValue} />
    case PanelAlias.ImagePanel:
      return <ImagePanel formData={formData} registerControl={registerControl} mainFormControl={mainFormControl} setValue={setValue} />
    case PanelAlias.VideoPanel:
      return <VideoPanel formData={formData} registerControl={registerControl} mainFormControl={mainFormControl} setValue={setValue} />
    case PanelAlias.MenuPanel:
      return <MenuPanel formData={formData} registerControl={registerControl} mainFormControl={mainFormControl} setValue={setValue} />
    case PanelAlias.QuickPickPanel:
      return <QuickPickPanel formData={formData} registerControl={registerControl} mainFormControl={mainFormControl} setValue={setValue} />
    default:
      return <Box sx={{mb: 1}}>this panel is not avalialable yet</Box>
  }
}

export default PanelFormsResolver;