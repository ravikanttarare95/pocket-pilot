import {
  FaHome,
  FaUtensils,
  FaMoneyBillWave,
  FaPlane,
  FaShoppingBag,
  FaBolt,
  FaFilm,
  FaCoins,
  FaEllipsisH,
  FaBook,
  FaBuilding,
  FaChartLine,
  FaDollarSign,
} from "react-icons/fa";

const TRANS_CATEGORIES_SELECT = {
  income: [
    { value: "salary", label: "💼 Salary" },
    { value: "allowance", label: "💰 Allowance" },
    { value: "business", label: "🏢 Business" },
    { value: "investment", label: "📈 Investment" },
    { value: "interest", label: "💵 Interest" },
    { value: "rental-income", label: "🏡 Rental Income" },
    { value: "others", label: "🔹 Others" },
  ],

  expense: [
    { value: "home-expenses", label: "🏠 Home Expenses" },
    { value: "food", label: "🍔 Food" },
    { value: "travel", label: "✈️ Travel" },
    { value: "bills", label: "💡 Bills" },
    { value: "education", label: "📚 Education" },
    { value: "shopping", label: "🛍️ Shopping" },
    { value: "entertainment", label: "🎬 Entertainment" },
    { value: "others", label: "🔹 Others" },
  ],
};

const TRANS_CATEGORY_META = {
  salary: {
    label: "Salary",
    icon: FaMoneyBillWave,
  },
  allowance: {
    label: "Allowance",
    icon: FaCoins,
  },
  business: {
    label: "Business",
    icon: FaBuilding,
  },
  investment: {
    label: "Investment",
    icon: FaChartLine,
  },
  interest: {
    label: "Interest",
    icon: FaDollarSign,
  },
  "rental-income": {
    label: "Rental Income",
    icon: FaHome,
  },

  "home-expenses": {
    label: "Home Expenses",
    icon: FaHome,
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

  entertainment: {
    label: "Entertainment",
    icon: FaFilm,
  },
  others: {
    label: "",
    icon: FaEllipsisH,
  },
};

export { TRANS_CATEGORIES_SELECT, TRANS_CATEGORY_META };
