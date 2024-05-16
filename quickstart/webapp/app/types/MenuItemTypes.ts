export interface MenuItem {
  name: string;
  href: string;
  icon: any;
  disableable: boolean;
  subItems?: MenuItem[];
}
