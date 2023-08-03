import { Routes, Route } from "react-router-dom";
import RequestLoan from "./pages/RequestLoan";
import AllLoanRequests from "./pages/AllLoanRequests";
import RepaymentSchedule from "./pages/RepaymentSchedule";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={"<Layout />"}>
        <Route index element={"<Home />"} />
        <Route path="/request" component={RequestLoan} />
        <Route path="/all-loans" component={AllLoanRequests} />
        <Route path="/repayment/:transactionId" component={RepaymentSchedule} />
      </Route>
    </Routes>
  );
}
