import { Wallet } from "lucide-react";
import { MdSpeed } from "react-icons/md";
import { BiBarChartSquare } from "react-icons/bi";
import { FaShieldAlt } from "react-icons/fa";

const FEATURES = [
  {
    featureText: "Track all your income and expenses in one place",
    featureIcon: Wallet,
    colorObj: {
      border: "border-rose-500",
      bg: "bg-rose-100",
      text: "text-rose-500",
      hoverBg: "group-hover:bg-rose-500",
      focusBg: "group-focus:bg-rose-500",
    },
  },
  {
    featureText: "Set monthly spending limits",
    featureIcon: MdSpeed,
    colorObj: {
      border: "border-cyan-600",
      bg: "bg-cyan-100",
      text: "text-cyan-600",
      hoverBg: "group-hover:bg-cyan-600",
      focusBg: "group-focus:bg-cyan-600",
    },
  },
  {
    featureText: "Visualize your spending with charts and insights",
    featureIcon: BiBarChartSquare,
    colorObj: {
      border: "border-violet-500",
      bg: "bg-violet-100",
      text: "text-violet-500",
      hoverBg: "group-hover:bg-violet-500",
      focusBg: "group-focus:bg-violet-500",
    },
  },
  {
    featureText: "Access your data securely across all devices",
    featureIcon: FaShieldAlt,
    colorObj: {
      border: "border-emerald-500",
      bg: "bg-emerald-100",
      text: "text-emerald-500",
      hoverBg: "group-hover:bg-emerald-500",
      focusBg: "group-focus:bg-emerald-500",
    },
  },
];
export default FEATURES;
