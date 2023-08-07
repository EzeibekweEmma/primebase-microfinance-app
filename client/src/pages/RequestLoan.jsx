import axios from "axios";
import React, { useState } from "react";
import {
  CalendarDaysIcon,
  CurrencyDollarIcon,
  PaperAirplaneIcon,
  UserIcon,
  AtSymbolIcon,
  ClipboardIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

function RequestLoan() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [loanAmount, setLoanAmount] = useState("");
  const [repaymentDuration, setRepaymentDuration] = useState("");
  const [summaryPopUp, setSummaryPopUp] = useState(false);
  const [copied, setCopied] = useState(false);
  const [SuccessMessage, setSuccessMessage] = useState({});

  // copy To Clipboard function
  const copyToClipboard = (text) => {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);

    // setCopied(true) and and false after 2secs
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  // Set all Value back to default
  const handleDefaultValue = () => {
    setFullName("");
    setEmail("");
    setLoanAmount("");
    setRepaymentDuration("");
    setSummaryPopUp(false);
    setSuccessMessage({});
  };

  // display success message and copy to clipboard button
  if (summaryPopUp) {
    return (
      <section className="min-h-[84vh] flex justify-center items-center text-slate-600">
        <section className="border shadow-md rounded-xl p-5 mx-5 bg-[#fafafa]">
          <h2 className="font-medium m-5">{SuccessMessage.message}</h2>
          {/* Close button */}
          <button
            onClick={() => handleDefaultValue()}
            className="flex items-center space-x-1 font-medium shadow-md bg-white
          p-3 rounded-lg float-left border hover:text-red-700 hover:bg-red-50"
          >
            <span>Closed</span>
            <XMarkIcon className="h-5 w-5" />
          </button>
          {/* Copy button */}
          <button
            onClick={() => copyToClipboard(SuccessMessage.transaction_id)}
            className={`flex items-center space-x-1 font-medium shadow-md p-3
          rounded-lg float-right border bg-white hover:text-green-700
          hover:bg-green-50 ${copied && "text-green-700 bg-green-50"}`}
          >
            <span>{copied ? "Copied" : "Copy ID"}</span>
            <ClipboardIcon className="h-5 w-5" />
          </button>
        </section>
      </section>
    );
  }

  const handleLoanRequest = async (e) => {
    e.preventDefault();

    const requestData = {
      full_name: fullName,
      email,
      loan_amount: loanAmount,
      repayment_duration: repaymentDuration,
    };

    try {
      const { data } = await axios.post("/request_for_loan", requestData);

      // Success message goes here
      setSuccessMessage(data);
      setSummaryPopUp(true);
    } catch (error) {
      console.error("Error making loan request:", error);
      //Error message goes here
      alert("Error making loan request" + error.message);
    }
  };

  const inputStyle =
    "min-w-full max-w-full rounded-md focus:outline-none font-normal\
    placeholder:italic focus:shadow-md py-2 pl-10 pr-3 mt-2";

  return (
    <section className="min-h-[84vh] flex justify-center items-center mb-16">
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
              placeholder="Enter Your email"
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
              min={100}
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
              min={new Date().toISOString().split("T")[0]}
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
