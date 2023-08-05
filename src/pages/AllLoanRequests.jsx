import axios from "axios";
import React, { useState, useEffect } from "react";

function AllLoanRequests() {
  const [loanRequests, setLoanRequests] = useState([]);
  const prodLoanBaseUrl = import.meta.env.VITE_PROD_LOAN_BASE_URL;

  useEffect(() => {
    async function fetchLoanRequests() {
      try {
        const response = await axios.get(`${prodLoanBaseUrl}`, {
          params: {
            action: "get_all_loan_request",
          },
        });

        // Assuming response.data is an array of loan requests
        // setLoanRequests(response.data);
      } catch (error) {
        console.error("Error fetching loan requests:", error);
      }
    }

    fetchLoanRequests();
  }, []);

  console.log(loanRequests);
  return (
    <section className="min-h-[84vh] flex justify-center items-center">
      <section>
        <h2 className="text-2xl font-medium my-5 text-slate-600">
          All Loan Requests
        </h2>
        <ul className="font-medium space-y-3 divide-y-4">
          {loanRequests &&
            loanRequests?.map((loanRequest) => (
              <li
                key={loanRequest.transaction_id}
                className="text-base list-disc"
              >
                Transaction ID: {loanRequest.transaction_id}
                <ul className="text-sm ml-5">
                  <li>Email: {loanRequest.email}</li>
                  <li>Loan Amount: {loanRequest.loan_amount}</li>
                </ul>
              </li>
            ))}
        </ul>
        {loanRequests.length === 0 && "No loan requests available"}
      </section>
    </section>
  );
}

export default AllLoanRequests;
