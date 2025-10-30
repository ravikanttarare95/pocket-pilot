import React from "react";
import GreetingBar from "./../components/GreetingBar";
import TransactionCard from "./../components/TransactionCard";
import { transactions } from "./Overview";
import Button from "./../components/Button";
import { Plus } from "lucide-react";
import { useNavigate, Outlet } from "react-router";

function Transactions() {
  const navigate = useNavigate();
  return (
    <>
      <GreetingBar greetingBarTitle="Transactions" />
      <main className="relative px-1.5 py-6 sm:p-6 min-h-screen">
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
              navigate("add-trans");
            }}
          />
        </div>

        <Outlet />
      </main>
    </>
  );
}

export default Transactions;
