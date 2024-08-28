import {
  AccountIcon,
  CreditcardIcon,
  HomeIcon,
  InvestmentsIcon,
  LoansIcon,
  ServicesIcon,
  SettingsIcon,
  TransactionIcon,
} from "@/assets/icons";
import { linkEnum } from "../enums/link";
import { menuLinkType } from "../link";

// Definir enlaces para usuarios regulares (USER)
export const userMenuLinks: menuLinkType[] = [
  {
    id: 1,
    title: linkEnum.Dashboard,
    link: "/home",
    icon: <HomeIcon />,
  },
  {
    id: 2,
    title: linkEnum.Referidos,
    link: "/referidos",
    icon: <AccountIcon />,
  },
  {
    id: 3,
    title: linkEnum.Paquetes,
    link: "/paquetes",
    icon: <TransactionIcon />,
  },
  {
    id: 4,
    title: linkEnum.Setting,
    link: "/setting",
    icon: <SettingsIcon />,
  },
];

// Definir enlaces para administradores (ADMIN)
export const adminMenuLinks: menuLinkType[] = [
  {
    id: 1,
    title: linkEnum.Dashboard,
    link: "/home",
    icon: <HomeIcon />,
  },
  {
    id: 3,
    title: 'Planes',
    link: "/planes",
    icon: <InvestmentsIcon />,
  },
  // {
  //   id: 3,
  //   title: 'Planes Crear',
  //   link: "/planes/crear",
  //   icon: <InvestmentsIcon />,
  // }
];
