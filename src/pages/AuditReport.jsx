export default function AuditReport() {
  const backendUrl = "http://172.27.17.136:5005/";

  const downloadExcel = () => {
    window.open(
      `${backendUrl}/api/audit-report/excel`,
      "_blank"
    );
  };

  const downloadPdf = () => {
    window.open(
      `${backendUrl}/api/audit-report/pdf`,
      "_blank"
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-md text-center w-full max-w-md">
        <div className="flex items-center justify-between gap-3 mb-6">
          <h2 className="text-xl font-semibold text-gray-800">
            Audit Report
          </h2>
          <img src="/tpl.jpg" alt="TPL Logo" className="h-12" />
        </div>

        <p className="text-gray-600 mb-6">
          Download complete approval audit report
        </p>

        <div className="flex flex-col gap-4">
          <button
            onClick={downloadExcel}
            className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition"
          >
            Download Excel Report
          </button>

          <button
            onClick={downloadPdf}
            className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition"
          >
            Download PDF Report
          </button>
        </div>
      </div>
    </div>
  );
}
