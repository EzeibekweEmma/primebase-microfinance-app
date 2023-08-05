import axios from "axios";
import React, { useState } from "react";
import {
  CalendarDaysIcon,
  CurrencyDollarIcon,
  PaperAirplaneIcon,
  AtSymbolIcon,
} from "@heroicons/react/24/outline";

function RequestLoan() {
  const [email, setEmail] = useState("");
  const [loanAmount, setLoanAmount] = useState("");
  const [repaymentDuration, setRepaymentDuration] = useState("");
  const prodLoanBaseUrl = import.meta.env.VITE_PROD_LOAN_BASE_URL;

  const handleLoanRequest = async (e) => {
    e.preventDefault();

    const requestData = {
      action: "request_for_loan",
      full_name: email,
      loan_amount: loanAmount,
      repayment_duration: repaymentDuration,
    };

    try {
      const response = await axios.post(prodLoanBaseUrl, requestData);
      // Success message goes here
      console.log(response);
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
          <label htmlFor="email" className="relative block mb-3 font-medium">
            Email
            <span className="absolute inset-[3.3rem] left-0 flex items-center pl-3">
              <AtSymbolIcon className="h-5 w-5" />
            </span>
            <input
              type="email"
              id="email"
              className={inputStyle}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter Your Email"
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
              type="number"
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
              type="date"
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
