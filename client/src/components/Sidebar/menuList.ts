import { ERoutes } from "@/types/routes/ERoutes";
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
    label: "Settings",
    href: ERoutes.SETTINGS,
  },
  {
    icon: User,
    label: "User",
    href: ERoutes.USER,
  },
];
