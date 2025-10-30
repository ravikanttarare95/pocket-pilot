import React, { useState } from "react";
import GreetingBar from "./../components/GreetingBar";
import TransactionCard from "./../components/TransactionCard";
import { transactions } from "./Overview";
import Button from "./../components/Button";
import { Plus } from "lucide-react";
import Input from "./../components/Input";
import Label from "./../components/Label";

function Transactions() {
  const [addSec, setAddSec] = useState(false);
  const [formData, setFormData] = useState({
    description: "",
    amount: "",
    category: "",
    date: new Date().toISOString().split("T")[0],
    type: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("New Transaction:", formData);

    setFormData({
      description: "",
      amount: "",
      category: "",
      date: new Date().toISOString().split("T")[0],
      type: "",
    });
  };
  return (
    <>
      <GreetingBar greetingBarTitle="Transactions" />
      <main className="relative px-1.5 py-6 sm:p-6">
        <h1 className="text-2xl mb-5">All Transactions</h1>
        <TransactionCard transactions={transactions} />
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6">
          <Button
            btnTitle={
              <span className="flex items-center gap-2">
                <span className="hidden sm:inline">Add Transactions</span>
                <Plus size={30} />
              </span>
            }
            btnVariant="primary"
            customStyle={"max-sm:!px-2.5"}
            onBtnClick={() => {
              setAddSec(true);
            }}
          />
        </div>
        {addSec && (
          <section className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-xs transition-all duration-300 ">
            <div className="w-full max-w-2xl m-3 bg-white p-6 sm:p-8 rounded-2xl shadow-2xl relative">
              <h2 className="text-xl sm:text-2xl font-semibold text-slate-800 mb-6">
                Add Transaction
              </h2>

              <form
                onSubmit={handleSubmit}
                className="grid gap-4 sm:grid-cols-2"
              >
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
                    <option value="">Select Category</option>
                    <option value="home-expenses">Home Expenses</option>
                    <option value="food-drinks">Food & Drinks</option>
                    <option value="shopping">Shopping</option>
                    <option value="travel">Travel</option>
                    <option value="entertainment">Entertainment</option>
                    <option value="allowance">Allowance</option>
                    <option value="salary">Salary</option>
                    <option value="bonus">Bonus</option>
                    <option value="other">Others</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor={"date"} labelTitle={"Date"} />
                  <Input
                    type="date"
                    id="date"
                    name="date"
                    value={formData?.date}
                    max={new Date().toISOString().split("T")[0]}
                    onInputChange={handleChange}
                  />
                </div>

                <div className="flex items-center gap-1">
                  <Label labelTitle={"Type:"} />
                  <div className="flex gap-1 items-center">
                    <Input
                      type="radio"
                      id="income"
                      name="type"
                      value="income"
                      checked={formData?.type === "income"}
                      onInputChange={handleChange}
                      customStyle="accent-green-500 !cursor-pointer"
                    />
                    <Label
                      htmlFor={"income"}
                      labelTitle={"Income"}
                      customStyle="cursor-pointer mr-3"
                    />

                    <Input
                      type="radio"
                      id="expense"
                      name="type"
                      value="expense"
                      checked={formData?.type === "expense"}
                      onInputChange={handleChange}
                      customStyle="accent-red-500 !cursor-pointer"
                    />
                    <Label
                      htmlFor={"expense"}
                      labelTitle={"Expense"}
                      customStyle="cursor-pointer"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <Button
                    btnTitle="Add Transaction"
                    btnVariant="primary"
                    type="submit"
                    customStyle="!w-full"
                    size=""
                  />
                </div>
              </form>
              <button
                onClick={() => setAddSec(false)}
                className="absolute top-4 right-5 text-slate-600 hover:text-slate-800 text-2xl cursor-pointer transition-all duration-200"
              >
                ✕
              </button>
            </div>
          </section>
        )}
      </main>
    </>
  );
}

export default Transactions;
