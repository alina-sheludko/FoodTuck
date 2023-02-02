export interface INode {
  pageTitle: string;
  id: string;
  pageAlias: PageAlias;
  childNodes: INode[];
  url: string;
}

export type PageAlias = "homePage" | "menuPage" | "shopOverviewPage" | "shopDetailsPage" | "contactPage" | "aboutUsPage" | "basketPage";

export interface INodeManagementFormConfig {
  availablePageTypes: PageAlias[];
  formData?: INodeManagementFormData;
}

export interface INodeManagementFormData {
  pageTitle: string;
  url: string,
  pageAlias: PageAlias,
  addToTopNavigation: boolean,
  panels?: any[],
  parentId?: string;
}