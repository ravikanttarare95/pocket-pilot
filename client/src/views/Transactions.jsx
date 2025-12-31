import { useContext, useState, useMemo } from "react";
import GreetingBar from "./../components/dashboard/GreetingBar.jsx";
import TransactionCard from "./../components/dashboard/TransactionCard.jsx";
import Button from "./../components/Button";
import { Plus } from "lucide-react";
import { useNavigate, Outlet } from "react-router";
import { TransactionsContext } from "./../context/TransactionsContext";
import ErrorState from "./../components/ErrorState.jsx";
import NoTransactions from "./../components/dashboard/NoTransactions.jsx";
import HeadingOne from "./../components/HeadingOne.jsx";
import TransSkeleton from "./../components/dashboard/TransSkeleton.jsx";
import TransPagination from "./../components/dashboard/TransPagination.jsx";

const PAGE_SIZE = 6;

function Transactions() {
  const navigate = useNavigate();
  const { transactions, transLoading, error, deleteTransaction } =
    useContext(TransactionsContext);

  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil((transactions?.length || 0) / PAGE_SIZE);

  const paginatedTransactions = useMemo(() => {
    const startIndex = (currentPage - 1) * PAGE_SIZE; ////
    const lastIndex = startIndex + PAGE_SIZE; ////
    return transactions?.slice(startIndex, lastIndex) || [];
  }, [transactions, currentPage]);

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
        <div className="flex justify-between gap-3 items-center flex-wrap mb-6">
          <HeadingOne title={"All Transactions"} customStyle={"!mb-0"} />
          {!transLoading && totalPages > 1 && (
            <TransPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}
        </div>
        <section className="space-y-3 sm:space-y-4">
          {transLoading && !error ? (
            Array.from({ length: PAGE_SIZE }).map((_, i) => (
              <TransSkeleton key={i} />
            ))
          ) : paginatedTransactions.length > 0 ? (
            paginatedTransactions.map((txn) => {
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

          <Button
            btnTitle={
              <span className="flex items-center gap-2">
                <span className="hidden sm:inline">Add Transactions</span>
                <Plus size={30} />
              </span>
            }
            btnVariant="primary"
            customStyle={`sticky bottom-4 right-4 !flex ${
              (transLoading && !error) || paginatedTransactions.length > 0
                ? "!ml-auto"
                : "!mx-auto"
            } sm:bottom-6 sm:right-6 !px-2.5 sm:!px-5`}
            size="md"
            onBtnClick={() => {
              navigate("add-trans");
            }}
          />
        </section>

        <Outlet />
      </main>
    </>
  );
}

export default Transactions;
