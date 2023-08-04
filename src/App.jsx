import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import HeroSection from "./components/HeroSection";
import RequestLoan from "./pages/RequestLoan";
import AllLoanRequests from "./pages/AllLoanRequests";
import RepaymentSchedule from "./pages/RepaymentSchedule";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HeroSection />} />
        <Route path="/request" element={<RequestLoan />} />
        <Route path="/all-loans" element={<AllLoanRequests />} />
        <Route path="/repayment/:transactionId" element={<RepaymentSchedule/>} />
        <Route
          path="*"
          element={
            <h2 className="text-4xl text-center my-5">Page Not Found</h2>
          }
        />
      </Route>
    </Routes>
  );
}
