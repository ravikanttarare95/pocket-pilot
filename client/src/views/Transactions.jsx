import { useContext } from "react";
import GreetingBar from "./../components/dashboard/GreetingBar.jsx";
import TransactionCard from "./../components/dashboard/TransactionCard.jsx";
import Button from "./../components/Button";
import { Plus, Wallet } from "lucide-react";
import { useNavigate, Outlet } from "react-router";
import { TransactionsContext } from "./../context/TransactionsContext";
import Loader from "./../components/Loader.jsx";
import ErrorState from "./../components/ErrorState.jsx";
import NoTransactions from "./../components/dashboard/NoTransactions.jsx";
import HeadingOne from "./../components/HeadingOne.jsx";
import TransSkeleton from "./../components/dashboard/TransSkeleton.jsx";

function Transactions() {
  const navigate = useNavigate();
  const { transactions, transLoading, error, deleteTransaction } =
    useContext(TransactionsContext);

  const navigateToEdit = (id) => {
    navigate(`edit-trans/${id}`);
  };

  if (error)
    return (
      <>
        <GreetingBar greetingBarTitle="Overview" />
        <ErrorState error={error} />
      </>
    );

  return (
    <>
      <GreetingBar greetingBarTitle="Transactions" />
      <main className="relative px-2 sm:px-6 lg:px-10 py-6">
        <HeadingOne title={"All Transactions"} />

        <section className="space-y-3 sm:space-y-4 pb-10">
          {transLoading && !error ? (
            Array.from({ length: 6 }).map((_, i) => <TransSkeleton key={i} />)
          ) : transactions && transactions.length > 0 ? (
            transactions.map((txn, index) => {
              const { _id, date, category, description, amount, type } = txn;
              return (
                <TransactionCard
                  key={_id}
                  id={_id}
                  date={date}
                  category={category}
                  description={description}
                  amount={amount}
                  type={type}
                  handleDelete={() => {
                    deleteTransaction(_id);
                  }}
                  navigateEdit={(id) => navigateToEdit(id)}
                />
              );
            })
          ) : (
            <NoTransactions />
          )}
          <div
            className={`sticky bottom-4 right-4 flex ${
              transLoading && !error
                ? "justify-end"
                : transactions.length > 0
                ? "justify-end"
                : "justify-center"
            } sm:bottom-6 sm:right-6`}
          >
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
        </section>

        <Outlet />
      </main>
    </>
  );
}

export default Transactions;
