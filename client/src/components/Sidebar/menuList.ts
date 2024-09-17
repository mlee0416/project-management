import { ERoutes } from "@/enums/routes/ERoutes";
import { Briefcase, Home, Search, Settings, User, Users } from "lucide-react";

export const menuList = [
  {
    icon: Home,
    label: "Home",
    href: ERoutes.HOME,
  },
  {
    icon: Briefcase,
    label: "Timeline",
    href: ERoutes.TIMELINE,
  },
  {
    icon: Search,
    label: "Search",
    href: ERoutes.SEARCH,
  },
  {
    icon: Settings,
    label: "Home",
    href: ERoutes.SETTINGS,
  },
  {
    icon: User,
    label: "Home",
    href: ERoutes.USER,
  },
  {
    icon: Users,
    label: "Teams",
    href: ERoutes.USERS,
  },
];
