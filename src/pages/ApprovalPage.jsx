import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";

export default function ApprovalPage() {
  const { id, token } = useParams();

  const [data, setData] = useState(null);
  const [decision, setDecision] = useState("");
  const [remarks, setRemarks] = useState("");
  const [invalid, setInvalid] = useState(false);

  const [itApproval, setItApproval] = useState({
    approved: "",
    authorizationLevel: "",
    status: "",
  });

  useEffect(() => {
    api
      .get(`/approve/${id}/${token}`)
      .then((res) => setData(res.data))
      .catch(() => {
        alert("This approval link is invalid or has expired.");
        setInvalid(true);
      });
  }, [id, token]);

  const submitDecision = async () => {
    try {

      if (data.role === "it") {
        const { approved, authorizationLevel, status } = itApproval;

        if (!approved || !authorizationLevel || !status) {
          alert("Please complete all IT approval fields");
          return;
        }

        await api.post(`/approve/${id}/${token}`, {
          role: "it",
          approved,
          authorizationLevel,
          status,
          remarks,
        });
      } 

      else {
        if (!decision) {
          alert("Please select Approve or Reject");
          return;
        }

        await api.post(`/approve/${id}/${token}`, {
          decision,
          remarks,
        });
      }

      alert("Your decision has been submitted successfully.");
      window.close();
    } catch {
      alert("Failed to submit decision. Please try again.");
    }
  };

  if (invalid || !data) return null;

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-xl bg-white rounded-xl shadow-lg p-8">
        <div className="flex items-center justify-between gap-3 mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            {data.role.toUpperCase()} APPROVAL
          </h2>
          <img src="/tpl.jpg" alt="TPL Logo" className="h-12" />
        </div>

        <div className="space-y-3 mb-6">
          <Row label="Employee Name" value={`${data.request.firstName} ${data.request.lastName}`} />
          <Row label="Department" value={data.request.department} />
          <Row label="Designation" value={data.request.designation} />
          <Row label="Email Requested" value={data.request.emailRequired} />
        </div>

        {data.role !== "it" && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Decision
            </label>
            <select
              onChange={(e) => setDecision(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none"
            >
              <option value="">Select Decision</option>
              <option value="approve">Approve</option>
              <option value="reject">Reject</option>
            </select>
          </div>
        )}

        {data.role === "it" && (
          <div className="border rounded-md overflow-hidden mb-6">
            <table className="w-full text-sm">
              <tbody>
                <tr className="border-b">
                  <td className="p-3 font-medium bg-gray-50">Approved</td>
                  <td className="p-3">
                    <select
                      onChange={(e) =>
                        setItApproval({ ...itApproval, approved: e.target.value })
                      }
                      className="border rounded px-2 py-1 w-full"
                    >
                      <option value="">Select</option>
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>
                  </td>
                </tr>

                <tr className="border-b">
                  <td className="p-3 font-medium bg-gray-50">
                    Authorization Level
                  </td>
                  <td className="p-3">
                    <select
                      onChange={(e) =>
                        setItApproval({
                          ...itApproval,
                          authorizationLevel: e.target.value,
                        })
                      }
                      className="border rounded px-2 py-1 w-full"
                    >
                      <option value="">Select</option>
                      <option value="basic">Basic</option>
                      <option value="power">Power User</option>
                      <option value="admin">Administrator</option>
                      <option value="special">Special Permissions</option>
                    </select>
                  </td>
                </tr>

                <tr>
                  <td className="p-3 font-medium bg-gray-50">Status</td>
                  <td className="p-3">
                    <select
                      onChange={(e) =>
                        setItApproval({ ...itApproval, status: e.target.value })
                      }
                      className="border rounded px-2 py-1 w-full"
                    >
                      <option value="">Select</option>
                      <option value="active">Active</option>
                      <option value="pending">Pending</option>
                      <option value="disabled">Disabled</option>
                      <option value="deleted">Deleted</option>
                    </select>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Remarks (optional)
          </label>
          <textarea
            rows="3"
            placeholder="Enter remarks if any..."
            onChange={(e) => setRemarks(e.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none resize-none"
          />
        </div>

        <button
          onClick={submitDecision}
          disabled={
            data.role !== "it"
              ? !decision
              : !itApproval.approved ||
                !itApproval.authorizationLevel ||
                !itApproval.status
          }
          className="w-full bg-green-600 text-white py-2 rounded-md font-medium hover:bg-green-700 transition disabled:opacity-50"
        >
          Submit Decision
        </button>
      </div>
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex justify-between border-b pb-2">
      <span className="text-sm font-medium text-gray-600">{label}</span>
      <span className="text-sm text-gray-800">{value}</span>
    </div>
  );
}
