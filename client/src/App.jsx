import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import HeroSection from "./components/HeroSection";
import RequestLoan from "./pages/RequestLoan";
import AllLoanRequests from "./pages/AllLoanRequests";
import RepaymentSchedule from "./pages/RepaymentSchedule";
import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
axios.defaults.withCredentials = true;

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HeroSection />} />
        <Route path="/request" element={<RequestLoan />} />
        <Route path="/all-loans" element={<AllLoanRequests />} />
        <Route
          path="/repayment/:transactionId"
          element={<RepaymentSchedule />}
        />
        <Route
          path="*"
          element={
            <h2 className="text-4xl my-5 min-h-[78vh] flex justify-center items-center">
              Page Not Found
            </h2>
          }
        />
      </Route>
    </Routes>
  );
}
