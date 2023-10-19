import { createContext, useEffect, useState } from 'react';
import axios from 'axios';

import './App.scss';
import Header from './main-layout-components/header/Header';
import Footer from './main-layout-components/footer/Footer';
import PageResolver from './shared/components/page-resolver/PageResolver';

interface ISetSettings {
  workingHours: string,
  nonWorkingHours: string,
  footerLinks: any[],
  learnMoreLinks: any[],
  id: string
}

export const Localizations = createContext<{[key: string]: string}>({});
export const SiteSettings = createContext<{[key: string]: any}>({})

function App() {
  const [localizations, setLocalizations] = useState({});

  useEffect(() => {
    axios.get('/api/localizations/getAll')
      .then(({data}) => {
        return setLocalizations(data);
      })
  }, []);
  
  const [siteSettings, setSiteSettings] = useState<ISetSettings | null>(null);
  
  useEffect(() => {
    axios.get('/api/site-settings/get')
      .then(({data}) => {
        return setSiteSettings(data);
      })
  }, []);
    
  return (
    <Localizations.Provider value={localizations}>
      <SiteSettings.Provider value={siteSettings}>
        <Header/>
        <PageResolver/>
        <Footer/>
      </SiteSettings.Provider>
    </Localizations.Provider>
  )
}

export default App;
