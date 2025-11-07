import React, { useContext, useEffect, useState } from "react";
import Input from "./../components/Input";
import Label from "./../components/Label";
import Button from "./../components/Button";
import { useNavigate, useParams } from "react-router";
import { TRANS_CATEGORIES_SELECT } from "./../constants/transCategories.js";
import axios from "axios";
import toast from "react-hot-toast";
import { TransactionsContext } from "./../context/TransactionsContext.jsx";

function EditTrans() {
  const navigate = useNavigate();
  const { id } = useParams();

  const { fetchTransactions } = useContext(TransactionsContext);
  const [formData, setFormData] = useState({
    description: "",
    amount: "",
    category: "",
    date: "",
    type: "",
    time: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleClose = () => navigate(-1);

  const getTransactionById = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/transactions/${id}`,
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("token")
            )}`,
          },
        }
      );
      if (response) {
        const transaction = response?.data?.data;
        setFormData({
          description: transaction.description,
          amount: transaction.amount,
          category: transaction.category,
          date: new Date(transaction.date).toISOString().split("T")[0],
          type: transaction.type,
          time: transaction.time,
        });
      }
    } catch (error) {
      console.log(error);
      toast.error(
        error?.response?.data?.message || "Error loading Transaction data"
      );
    }
  };

  const UpdateTransaction = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/transactions`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("token")
            )}`,
          },
        }
      );
      if (response) {
        toast.success(response.data.message, { id: "postTrans" });

        setFormData({
          description: "",
          amount: "",
          category: "",
          date: new Date().toISOString().split("T")[0],
          type: "",
          time: new Date().toTimeString().slice(0, 5),
        });

        await fetchTransactions(); // refresh data before navigating

        setTimeout(() => {
          navigate(-1);
        }, 1000);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to add transaction",
        { id: "error" }
      );
      console.log(error);
    }
  };

  useEffect(() => {
    getTransactionById();
  }, []);

  return (
    <section className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-xs z-50 transition-all duration-300">
      <div className="w-full max-w-2xl m-3 bg-white p-6 sm:p-8 rounded-2xl shadow-2xl relative">
        <h2 className="text-xl sm:text-2xl font-semibold text-slate-800 mb-6">
          Edit Transaction
        </h2>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            UpdateTransaction();
          }}
          className="grid gap-4 sm:grid-cols-2"
        >
          <div className="flex items-center gap-2 mb-4 sm:col-span-2 flex-wrap">
            <Label labelTitle={"Type:"} />
            <div className="flex gap-2 flex-wrap items-center">
              <Input
                type="radio"
                id="income"
                name="type"
                value="income"
                checked={formData?.type === "income"}
                onInputChange={handleChange}
                customStyle="accent-green-500 !cursor-pointer focus:outline-none focus:ring-0"
              />
              <Label
                htmlFor={"income"}
                labelTitle={"Income"}
                customStyle="cursor-pointer mr-3 !text-black"
              />

              <Input
                type="radio"
                id="expense"
                name="type"
                value="expense"
                checked={formData?.type === "expense"}
                onInputChange={handleChange}
                customStyle="accent-red-500 !cursor-pointer focus:outline-none focus:ring-0"
              />
              <Label
                htmlFor={"expense"}
                labelTitle={"Expense"}
                customStyle="cursor-pointer !text-black"
              />
            </div>
          </div>
          <div>
            <Label htmlFor={"description"} labelTitle={"Description"} />
            <Input
              type="text"
              id="description"
              name="description"
              placeholder="e.g., Grocery Shopping"
              value={formData?.description}
              onInputChange={handleChange}
            />
          </div>
          <div>
            <Label htmlFor={"amount"} labelTitle={"Amount (₹)"} />
            <Input
              type="number"
              id="amount"
              name="amount"
              placeholder="e.g., 1500"
              value={formData?.amount}
              min={1}
              onInputChange={handleChange}
            />
          </div>
          <div>
            <Label htmlFor={"category"} labelTitle={"Category"} />
            <select
              name="category"
              id="category"
              value={formData?.category}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-2 outline-cyan-400"
            >
              <option value="">🗂️ Select Category:</option>
              {TRANS_CATEGORIES_SELECT[formData?.type]?.map((cate) => (
                <option key={cate.value} value={cate.value}>
                  {cate.label}
                </option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <Label htmlFor="date" labelTitle="Date" />
              <Input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                max={new Date().toISOString().split("T")[0]}
                onInputChange={handleChange}
              />
            </div>

            <div className="flex flex-col">
              <Label htmlFor="time" labelTitle="Time" />
              <Input
                type="time"
                id="time"
                name="time"
                value={formData.time}
                onInputChange={handleChange}
              />
            </div>
          </div>

          <div className="sm:col-span-2">
            <Button
              btnTitle="Update Transaction"
              btnVariant="primary"
              type="submit"
              customStyle="!w-full"
              size=""
            />
          </div>
        </form>
        <button
          onClick={() => {
            handleClose();
          }}
          className="absolute top-4 right-5 text-slate-600 hover:text-slate-800 text-2xl cursor-pointer transition-all duration-200"
        >
          ✕
        </button>
      </div>
    </section>
  );
}

export default EditTrans;
