import {
  LayoutDashboard,
  ArrowRightLeft,
  ChartPie,
  Wallet,
} from "lucide-react";
const SIDEBAR_LINKS = [
  { title: "overview", icon: LayoutDashboard, path: "/dashboard" },
  {
    title: "transactions",
    icon: ArrowRightLeft,
    path: "/dashboard/transactions",
  },
  {
    title: "charts",
    icon: ChartPie,
    path: "/dashboard/charts",
  },
  {
    title: "budgets",
    icon: Wallet,
    path: "/dashboard/budgets",
  },
];

export { SIDEBAR_LINKS };
