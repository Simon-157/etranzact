import React, { useState, useEffect } from "react";
import transactionService from "../api/transaction.service";
import BaseLayout from "../components/BaseLayout";
import "../css/transactions.css";
import { useNavigate } from "react-router-dom";

const Transactions = () => {
  const navigate = useNavigate()
  const [transactions, setTransactions] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);
  const [totalPages, setTotalPages] = useState(0);
  const [filters, setFilters] = useState({ type: "", status: "" });
  // const { user } = useAuthStore()
  const user = JSON.parse(localStorage.getItem("user"));
  console.log("====================================");
  console.log("user", user?.token);
  console.log("====================================");

  useEffect(() => {
    if (!user) {
      navigate('/')
    }

    const fetchTransactions = async () => {
      try {
        const data = await transactionService.getTransactions(
          page,
          pageSize,
          user?.token
        );
        setTransactions(data.transactions);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTransactions();
  }, [user, page, pageSize, filters]);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const filteredTransactions = transactions.filter((transaction) => {
    return (
      (filters.type ? transaction.type === filters.type : true) &&
      (filters.status ? transaction.status === filters.status : true)
    );
  });

  return (
    <BaseLayout>
      <div className="transactions-container">
        <h1>Transactions</h1>
        <div className="filters">
          <label>
            Type:
            <select
              name="type"
              value={filters.type}
              onChange={handleFilterChange}
            >
              <option value="">All</option>
              <option value="SERVICE_REQUEST">Service Request</option>
              <option value="DEBIT">Debit</option>
              <option value="BANK_TOPUP">Bank Topup</option>
              <option value="VIRTUAL_TOPUP">Virtual Topup</option>
            </select>
          </label>
          <label>
            Status:
            <select
              name="status"
              value={filters.status}
              onChange={handleFilterChange}
            >
              <option value="">All</option>
              <option value="COMPLETED">Completed</option>
              <option value="PENDING">Pending</option>
            </select>
          </label>
        </div>
        <div className="table-container">
          <table className="transactions-table">
            <thead>
              <tr>
                <th>Reference</th>
                <th>Amount</th>
                <th>Type</th>
                <th>Status</th>
                <th>Created At</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map((transaction) => (
                <tr key={transaction._id}>
                  <td>{transaction.reference}</td>
                  <td>{transaction.amount}</td>
                  <td>{transaction.type}</td>
                  <td>{transaction.status}</td>
                  <td>{new Date(transaction.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="pagination">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
          >
            Previous
          </button>
          <span>
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={page === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </BaseLayout>
  );
};

export default Transactions;
