import {
  ArrowDownOnSquareIcon,
  HashtagIcon,
} from "@heroicons/react/24/outline";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSearchParams, useParams } from "react-router-dom";

function RepaymentSchedule() {
  const [transaction_id, setTransaction_Id] = useState("");
  const [repaymentData, setRepaymentData] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  // TODO - Get transaction_id from URL
  // const { transactionId } = useParams();
  // TODO get repayment schedule from the URL
  // useEffect(async () => {
  //   if (transactionId) {
  //     setSearchParams({ transaction_id: transactionId });
  //     try {
  //       const response = await axios.get(
  //         "/get_repayment_schedule/" + transaction_id
  //       );

  //       setRepaymentData(response.data);
  //     } catch (error) {
  //       console.error("Error fetching repayment schedule:", error);
  //       //Error message goes here
  //     }
  //   }
  // }, []);

  const handleFetchRepayment = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(
        "/get_repayment_schedule/" + transaction_id
      );

      setRepaymentData(response.data);
    } catch (error) {
      console.error("Error fetching repayment schedule:", error);
      //Error message goes here
    }
  };

  // Reset values to defaults
  const resetValues = () => {
    setSearchParams({});
    setTransaction_Id("");
    setRepaymentData(null);
  };

  return (
    <section className="min-h-[84vh] flex justify-center items-center">
      <section>
        <h2 className="text-2xl font-medium m-5 text-slate-600">
          Repayment Schedule
        </h2>
        {!repaymentData ? (
          <form
            onSubmit={handleFetchRepayment}
            className="border shadow-md rounded-xl py-14 px-8 bg-[#fafafa] m-5"
          >
            <label
              htmlFor="transaction_id"
              className="relative block mb-3 font-medium"
            >
              Transaction ID
              <span className="absolute inset-[3.3rem] left-0 flex items-center pl-3">
                <HashtagIcon className="h-4 w-4 stroke-2" />
              </span>
              <input
                type="text"
                id="transaction_id"
                className="min-w-full max-w-full rounded-md focus:outline-none font-normal
              placeholder:italic focus:shadow-md py-2 pl-9 pr-3 mt-2"
                value={transaction_id}
                onChange={(e) => setTransaction_Id(e.target.value)}
                required
                placeholder="Transaction ID"
              />
            </label>

            <button
              className="flex justify-center group items-center space-x-2 bg-white
                  mt-10 w-full py-3 transition duration-500 ease-in border
               hover:text-slate-600 hover:bg-dc hover:rounded-full font-medium"
              onClick={() => setSearchParams({ transaction_id })}
            >
              <ArrowDownOnSquareIcon
                strokeWidth={2}
                className="w-5 h-5 transition duration-500 ease-in
                    group-hover:translate-x-[8.5rem]"
              />
              <span
                className="transition duration-500 ease-in
                  group-hover:-translate-x-6"
              >
                Fetch&nbsp;Transaction
              </span>
            </button>
          </form>
        ) : (
          <div className="border shadow-sm rounded-xl p-8 bg-[#fafafa] max-w-[80vw]">
            {repaymentData ? (
              <div
                key={repaymentData.transaction_id}
                className="text-base py-5 px-10"
              >
                Transaction ID:{" "}
                <span className="bg-slate-200 px-2 py-1 rounded-md">
                  {repaymentData.transaction_id}
                </span>
                <ul className="text-sm ml-5 mt-2">
                  <li>Full Name: {repaymentData.full_name}</li>
                  <li>Email: {repaymentData.email}</li>
                  <li>Loan Amount: {repaymentData.loan_amount}</li>
                  <li>
                    Repayment Duration: {repaymentData.repayment_duration}
                  </li>
                </ul>
              </div>
            ) : (
              <p className="font-semibold text-red-500 text-center mt-2">
                Transaction_id Not Found
              </p>
            )}
            <button
              className="flex justify-center group items-center space-x-2 bg-white
                  mt-10 w-full py-3 transition duration-500 ease-in border
               hover:text-slate-600 hover:bg-dc hover:rounded-full font-medium"
              onClick={() => resetValues()}
            >
              <ArrowDownOnSquareIcon
                strokeWidth={2}
                className="w-5 h-5 transition duration-500 ease-in
                    group-hover:translate-x-[12rem]"
              />
              <span
                className="transition duration-500 ease-in
                  group-hover:-translate-x-7"
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
