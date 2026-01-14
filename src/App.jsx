import { BrowserRouter, Routes, Route } from "react-router-dom";
import EmployeeForm from "./pages/EmployeeForm";
import ApprovalPage from "./pages/ApprovalPage";
import AuditReport from "./pages/AuditReport";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<EmployeeForm />} />
        <Route path="/approve/:id/:token" element={<ApprovalPage />} />
        <Route path="/audit" element={<AuditReport />} />
      </Routes>
    </BrowserRouter>
  );
}
