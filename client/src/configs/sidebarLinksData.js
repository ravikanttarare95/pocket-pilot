import {
  LayoutDashboard,
  ArrowRightLeft,
  ChartPie,
  Wallet,
} from "lucide-react";
const SIDEBAR_LINKS = [
  { title: "overview", icon: LayoutDashboard },
  {
    title: "transactions",
    icon: ArrowRightLeft,
  },
  {
    title: "charts",
    icon: ChartPie,
  },
  {
    title: "budgets",
    icon: Wallet,
  },
];

export { SIDEBAR_LINKS };
