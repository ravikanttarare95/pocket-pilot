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
    date: "",
    type: "income",
  });
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("New Transaction:", formData);

    setFormData({
      description: "",
      amount: "",
      category: "",
      date: "",
      type: "income",
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
          <section className="absolute inset-0 flex items-center justify-center bg-black/70">
            <div className="w-5xl bg-amber-50 p-7 rounded">
              <h2 className="text-xl font-semibold text-slate-800 mb-4">
                Add Transaction
              </h2>
              {formData?.description}
              {formData?.amount}
              {formData?.category}
              {formData?.date}
              <form
                onSubmit={handleSubmit}
                className="grid gap-4 sm:grid-cols-2"
              >
                <div>
                  <Label htmlFor={"description"} labelTitle={"Description"} />
                  <Input
                    type="text"
                    id="description"
                    placeholder="e.g., Grocery Shopping"
                    value={formData?.description}
                    onInputChange={handleChange}
                  />
                </div>

                <div>
                  <Label htmlFor={"amount"} labelTitle={"Amount (₹)"} />
                  <Input
                    type="text"
                    id="amount"
                    placeholder="e.g., 1500"
                    value={formData?.amount}
                    onInputChange={handleChange}
                  />
                </div>

                <div>
                  <Label htmlFor={"category"} labelTitle={"Category"} />
                  <select
                    name="category"
                    id="category"
                    value={formData.category}
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
                    value={formData?.date}
                    onInputChange={handleChange}
                  />
                </div>

                <div className="flex items-center gap-4 ">
                  <label className="text-slate-600">Type:</label>
                  <div className="flex gap-3">
                    <Input
                      type="radio"
                      id="type"
                      name="type"
                      value="income"
                      checked={formData.type === "income"}
                      onInputChange={handleChange}
                      // className="accent-green-500"
                    />
                    <Label htmlFor={"income"} labelTitle={"Income"} />

                    <Input
                      type="radio"
                      id="type"
                      name="type"
                      value="expense"
                      checked={formData.type === "expense"}
                      onInputChange={handleChange}
                      // className="accent-red-500"
                    />
                    <Label htmlFor={"expense"} labelTitle={"Expense"} />
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
            </div>
          </section>
        )}
      </main>
    </>
  );
}

export default Transactions;
