import { useState } from "react";
import api from "../services/api";

export default function EmployeeForm() {
  const [form, setForm] = useState({
    initiatorName: "",
    employeeType: "",
    department: "",
    firstName: "",
    lastName: "",
    designation: "",
    emailRequired: "",
    employeeEmail: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submitForm = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/request", form);

      if (!res.data) {
        alert("Unable to submit request. Please try again.");
        return;
      }

      alert(
        "Request submitted successfully.\nYou will receive an email once the approval process is completed."
      );

      // Optional: close tab (corporate-style behavior)
      // window.close();

    } catch (error) {
      alert("Something went wrong. Please contact IT support.");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-8">
        <div className="flex items-center justify-between gap-3 mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            Email ID Creation Request
          </h2>
          <img src="/tpl.jpg" alt="TPL Logo" className="h-12" />
        </div>

        <form onSubmit={submitForm} className="space-y-5">

          {/* Initiator Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Initiator Name
            </label>
            <input
              type="text"
              name="initiatorName"
              required
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none"
            />
          </div>

          {/* Employee Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Employee Type / Code
            </label>
            <input
              type="text"
              name="employeeType"
              required
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none"
            />
          </div>

          {/* Department */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Department
            </label>

            <select
              name="department"
              required
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 px-3 py-2 bg-white
               text-gray-900 text-sm font-normal
               focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none
               appearance-none"
            >
              <option value="">Select Department</option>
              <option value="IT">IT</option>
              <option value="HR">HR</option>
              <option value="Finance">Finance</option>
              <option value="Purchase">Purchase</option>
              <option value="Marketing">Marketing</option>
              <option value="Civil">Civil</option>
              <option value="Electrical">Electrical</option>
              <option value="Logistics">Logistics</option>
              <option value="Instrumentation">Instrumentation</option>
              <option value="Mechanical">Mechanical</option>
              <option value="Production">Production</option>
              <option value="Quality Assurance">Quality Assurance</option>
              
            </select>
          </div>



          {/* First & Last Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                required
                onChange={handleChange}
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                onChange={handleChange}
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none"
              />
            </div>
          </div>

          {/* Designation */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Designation
            </label>
            <input
              type="text"
              name="designation"
              required
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none"
            />
          </div>

          {/* Email Required */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Id Required <br />
              eg: firstname@tnpetro.com
            </label>
            <input
              type="text"
              name="emailRequired"
              required
              onChange={handleChange}
              placeholder="firstname@tnpetro.com"
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="w-40 bg-green-600 text-white py-2 rounded-md font-medium hover:bg-green-700 transition"
            >
              Submit Request
            </button>
          </div>

        </form>
      </div>
    </div>

  );
}
