import axios from "axios";
import React, { useState, useEffect } from "react";

function AllLoanRequests() {
  const [loanRequests, setLoanRequests] = useState([]);

  useEffect(() => {
    async function fetchLoanRequests() {
      try {
        const response = await axios.get("/get_all_loan_request");

        // Assuming response.data is an array of loan requests
        setLoanRequests(response.data);
      } catch (error) {
        console.error("Error fetching loan requests:", error);
      }
    }

    fetchLoanRequests();
  }, []);

  return (
    <section className="min-h-[84vh] flex justify-center items-center my-16">
      <section className="border shadow-md rounded-xl pb-10 bg-[#fafafa]">
        <h2 className="text-2xl font-medium my-5 px-10 text-slate-600">
          All Loan Requests
        </h2>
        <ul
          className="font-medium
        [&>*:nth-child(even)]:bg-gray-100"
        >
          {loanRequests &&
            loanRequests?.map((loanRequest) => (
              <li
                key={loanRequest.transaction_id}
                className="text-base py-5 px-10"
              >
                Transaction ID:{" "}
                <span className="bg-slate-200 px-2 py-1 rounded-md">
                  {loanRequest.transaction_id}
                </span>
                <ul className="text-sm ml-5 mt-2">
                  <li>Full Name: {loanRequest.full_name}</li>
                  <li>Email: {loanRequest.email}</li>
                  <li>Loan Amount: {loanRequest.loan_amount}</li>
                  <li>Repayment Duration: {loanRequest.repayment_duration}</li>
                </ul>
              </li>
            ))}
        </ul>
        {loanRequests.length === 0 && <p className="text-sm mx-10 mt-2">No loan requests available</p>}
      </section>
    </section>
  );
}

export default AllLoanRequests;
