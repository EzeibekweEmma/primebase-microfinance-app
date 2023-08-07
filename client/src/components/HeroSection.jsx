import React from "react";
import { Link } from "react-router-dom";

export default function HeroSection() {
  return (
    <section className="min-h-[84vh] flex justify-center items-center">
      <div>
        <p className="font-semibold sm:text-xl md:text-3xl text-slate-600">
          <span className="sm:text-2xl md:text-3xl lg:text-5xl">
            Welcome To PrimeBase
          </span>
          <br />A Micro Finance Loan Lending Company
        </p>
        <details className="mt-5 hover:cursor-pointer w-fit">
          <summary className="text-lg">Our Services</summary>
          <div className="flex flex-col space-y-2 font-medium text-green-700 underline">
            <Link to="request">Request for Loan</Link>
            <Link to="all-loans">See All Loan Requests</Link>
            <Link to="repayment">View Repayment Schedule</Link>
          </div>
        </details>
      </div>
    </section>
  );
}
