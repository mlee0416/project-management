import { ERoutes } from "@/types/routes/ERoutes";
import {
  AlertCircle,
  AlertOctagon,
  AlertTriangle,
  Layers3,
  ShieldAlert,
} from "lucide-react";

export const priorityList = [
  {
    icon: AlertCircle,
    label: "Urgent",
    href: ERoutes.PRIORITY_URGENT,
  },
  {
    icon: ShieldAlert,
    label: "High",
    href: ERoutes.PRIORITY_HIGH,
  },
  {
    icon: AlertTriangle,
    label: "Medium",
    href: ERoutes.PRIORITY_MEDIUM,
  },
  {
    icon: AlertOctagon,
    label: "Low",
    href: ERoutes.PRIORITY_LOW,
  },
  {
    icon: Layers3,
    label: "Backlog",
    href: ERoutes.PRIORITY_BACKLOG,
  },
];
