import {
  FaHome,
  FaUtensils,
  FaMoneyBillWave,
  FaPlane,
  FaShoppingBag,
  FaBolt,
  FaGift,
  FaFilm,
  FaCoins,
  FaEllipsisH,
  FaBook,
} from "react-icons/fa";
import { MdFastfood } from "react-icons/md";

const TRANS_CATEGORIES_SELECT = [
  { value: "", label: "🗂️ Select Category:" },
  { value: "home-expenses", label: "🏠 Home Expenses" },
  { value: "food-and-drinks", label: "🍽️ Food & Drinks" },
  { value: "salary", label: "💼 Salary" },
  { value: "food", label: "🍔 Food" },
  { value: "travel", label: "✈️ Travel" },
  { value: "bills", label: "💡 Bills" },
  { value: "education", label: "📚 Education" },
  { value: "shopping", label: "🛍️ Shopping" },
  { value: "bonus", label: "🎁 Bonus" },
  { value: "allowance", label: "💰 Allowance" },
  { value: "entertainment", label: "🎬 Entertainment" },
  { value: "others", label: "🔹 Others" },
];

const TRANS_CATEGORY_META = {
  "home-expenses": {
    label: "Home Expenses",
    icon: FaHome,
  },
  "food-and-drinks": {
    label: "Food & Drinks",
    icon: MdFastfood,
  },
  salary: {
    label: "Salary",
    icon: FaMoneyBillWave,
  },
  food: {
    label: "Food",
    icon: FaUtensils,
  },
  travel: {
    label: "Travel",
    icon: FaPlane,
  },
  bills: {
    label: "Bills",
    icon: FaBolt,
  },
  education: {
    label: "Education",
    icon: FaBook,
  },
  shopping: {
    label: "Shopping",
    icon: FaShoppingBag,
  },
  bonus: {
    label: "Bonus",
    icon: FaGift,
  },
  allowance: {
    label: "Allowance",
    icon: FaCoins,
  },
  entertainment: {
    label: "Entertainment",
    icon: FaFilm,
  },
  others: {
    label: "Others",
    icon: FaEllipsisH,
  },
};

export { TRANS_CATEGORIES_SELECT, TRANS_CATEGORY_META };
