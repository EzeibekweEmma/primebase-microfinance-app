import {
  ArrowDownOnSquareIcon,
  HashtagIcon,
} from "@heroicons/react/24/outline";
import axios from "axios";
import React, { useState } from "react";

function RepaymentSchedule() {
  const [transactionId, setTransactionId] = useState("");
  const [repaymentData, setRepaymentData] = useState(null);
  const prodLoanBaseUrl = import.meta.env.VITE_PROD_LOAN_BASE_URL;

  const handleFetchRepayment = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(prodLoanBaseUrl, {
        action: "get_repayment_schedule",
        transaction_id: transactionId,
      });

      setRepaymentData(response.data);
    } catch (error) {
      console.error("Error fetching repayment schedule:", error);
      //Error message goes here
    }
  };
  
  return (
    <section className="min-h-[84vh] flex justify-center items-center">
      <section>
        <h2 className="text-2xl font-medium my-5 text-slate-600">
          Repayment Schedule
        </h2>
        {!repaymentData ? (
          <form
            onSubmit={handleFetchRepayment}
            className="border shadow-md rounded-xl py-14 px-8 bg-[#fafafa]"
          >
            <label
              htmlFor="transactionId"
              className="relative block mb-3 font-medium"
            >
              Transaction ID
              <span className="absolute inset-[3.3rem] left-0 flex items-center pl-3">
                <HashtagIcon className="h-4 w-4 stroke-2" />
              </span>
              <input
                type="text"
                id="transactionId"
                className="min-w-full max-w-full rounded-md focus:outline-none font-normal
              placeholder:italic focus:shadow-md py-2 pl-9 pr-3 mt-2"
                value={transactionId}
                onChange={(e) => setTransactionId(e.target.value)}
                required
                placeholder="Transaction ID"
              />
            </label>

            <button
              className="flex justify-center group items-center space-x-2 bg-white
                  mt-10 w-full py-3 transition duration-500 ease-in border
               hover:text-slate-600 hover:bg-dc hover:rounded-full font-medium"
            >
              <ArrowDownOnSquareIcon
                strokeWidth={2}
                className="w-5 h-5 transition duration-500 ease-in
                    group-hover:translate-x-[7.8rem]"
              />
              <span
                className="transition duration-500 ease-in
                  group-hover:-translate-x-9"
              >
                Fetch&nbsp;Transaction
              </span>
            </button>
          </form>
        ) : (
          <div className="border shadow-sm rounded-xl p-8 bg-[#fafafa] min-w-[45vw] max-w-[80vw]">
            <pre>{JSON.stringify(repaymentData, null, 2)}</pre>
            <button
              className="flex justify-center group items-center space-x-2 bg-white
                  mt-10 w-full py-3 transition duration-500 ease-in border
               hover:text-slate-600 hover:bg-dc hover:rounded-full font-medium"
              onClick={() => setRepaymentData(null)}
            >
              <ArrowDownOnSquareIcon
                strokeWidth={2}
                className="w-5 h-5 transition duration-500 ease-in
                    group-hover:translate-x-[11.8rem]"
              />
              <span
                className="transition duration-500 ease-in
                  group-hover:-translate-x-9"
              >
                Fetch&nbsp;Another&nbsp;Transaction
              </span>
            </button>
          </div>
        )}
      </section>
    </section>
  );
}

export default RepaymentSchedule;
