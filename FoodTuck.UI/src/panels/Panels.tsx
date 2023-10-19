import FAQPanel from "./faq/FAQPanel";
import OurTeamPanel from './ourTeam/OurTeamPanel';
import HomeHeroPanel from '../panels/homeHero/HomeHeroPanel';
import IconsPanel from "./icons/IconsPanel";
import ClientsPanel from "./clients/ClientsPanel";
import ImagePanel from "./image/ImagePanel";
import VideoPanel from './video/VideoPanel';
import MenuPanel from "./menu/MenuPanel";
import FoodCategory from "./food-category/FoodCategory";
import SpotPanel from "./spot/SpotPanel";

interface IProps {
  panels: IPanel[]
}

interface IPanel {
  panelAlias: string;
}
const Panels = ({panels}: IProps) => {
  return (
    <main>
      {
        panels.map((el: any) => {
          switch (el.panelAlias){
            case "faqPanel":
              return <FAQPanel data={el} key={el.id}/>
            case 'ourTeamPanel':
              return <OurTeamPanel data={el} key={el.id}/>
            case 'homeHeroPanel':
              return <HomeHeroPanel data={el} key={el.id}/>
            case 'iconsPanel':
              return <IconsPanel data={el} key={el.id}/>
            case 'iconsExtendedPanel':
              return <ClientsPanel data={el} key={el.id}/>
            case 'imagePanel':
              return <ImagePanel data={el} key={el.id}/>
            case 'videoPanel':
              return <VideoPanel data={el} key={el.id}/>
            case 'menuPanel':
              return <MenuPanel data={el} key={el.id} />
            case 'quickPickPanel':
              return <FoodCategory data={el} key={el.id} />
            case 'spotWithMultipleImagesPanel': 
            return <SpotPanel data={el} key={el.id} />
          }
        })        
      }
    </main>
  )
}

export default Panels;