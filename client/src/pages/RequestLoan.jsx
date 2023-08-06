import axios from "axios";
import React, { useState } from "react";
import {
  CalendarDaysIcon,
  CurrencyDollarIcon,
  PaperAirplaneIcon,
  UserIcon,
} from "@heroicons/react/24/outline";

function RequestLoan() {
  const [fullName, setFullName] = useState("");
  const [loanAmount, setLoanAmount] = useState("");
  const [repaymentDuration, setRepaymentDuration] = useState("");

  const handleLoanRequest = async (e) => {
    e.preventDefault();

    const requestData = {
      full_name: fullName,
      loan_amount: loanAmount,
      repayment_duration: repaymentDuration,
    };

    try {
      await axios.post("/request_for_loan", requestData);
      // Success message goes here
    } catch (error) {
      console.error("Error making loan request:", error);
      //Error message goes here
    }
  };

  const inputStyle =
    "min-w-full max-w-full rounded-md focus:outline-none font-normal\
    placeholder:italic focus:shadow-md py-2 pl-10 pr-3 mt-2";
  return (
    <section className="min-h-[84vh] flex justify-center items-center">
      <section>
        <h2 className="text-2xl font-medium my-5 text-slate-600">
          Request for Loan
        </h2>
        <form
          onSubmit={handleLoanRequest}
          className="border shadow-md rounded-xl py-20 px-8 bg-[#fafafa]"
        >
          <label htmlFor="fullName" className="relative block mb-3 font-medium">
            FullName
            <span className="absolute inset-[3.3rem] left-0 flex items-center pl-3">
              <UserIcon className="h-5 w-5" />
            </span>
            <input
              type="text"
              id="fullName"
              className={inputStyle}
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              placeholder="Enter Your Name"
            />
          </label>

          <label
            htmlFor="loanAmount"
            className="relative block mb-3 font-medium"
          >
            Loan Amount
            <span className="absolute inset-[3.3rem] left-0 flex items-center pl-3">
              <CurrencyDollarIcon className="h-5 w-5" />
            </span>
            <input
              type="text"
              id="loanAmount"
              className={inputStyle}
              value={loanAmount}
              onChange={(e) => setLoanAmount(e.target.value)}
              required
              placeholder="Enter Amount"
            />
          </label>

          <label
            htmlFor="repaymentDuration"
            className="relative block mb-3 font-medium"
          >
            Repayment Duration
            <span className="absolute inset-[3.3rem] left-0 flex items-center pl-3">
              <CalendarDaysIcon className="h-5 w-5" />
            </span>
            <input
              type="text"
              id="repaymentDuration"
              className={inputStyle}
              value={repaymentDuration}
              onChange={(e) => setRepaymentDuration(e.target.value)}
              required
              placeholder="Repayment Duration"
            />
          </label>

          <button
            className="flex justify-center group items-center space-x-2 bg-white
                  mt-10 w-full py-3 transition duration-500 ease-in border
               hover:text-slate-600 hover:bg-dc hover:rounded-full font-medium"
          >
            <PaperAirplaneIcon
              strokeWidth={2}
              className="w-5 h-5 transition duration-500 ease-in
                    group-hover:translate-x-[6.5rem] mt-1"
            />
            <span
              className="transition duration-500 ease-in
                  group-hover:-translate-x-9"
            >
              Make&nbsp;Request
            </span>
          </button>
        </form>
      </section>
    </section>
  );
}

export default RequestLoan;
