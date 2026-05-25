import Chart from "../../components/ChartCard";

const stats = [
  { title: "Total URLs", value: "1,245", color: "bg-blue-500" },
  { title: "Total Clicks", value: "48.2K", color: "bg-green-500" },
  { title: "Active Users", value: "320", color: "bg-purple-500" },
  { title: "Analytics Reports", value: "89", color: "bg-orange-500" },
];

const DashBoardPage = () => {
  return (
    <div className="p-4 sm:p-6 space-y-6 bg-base-200 min-h-screen">
      
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold">Dashboard</h1>
        <p className="text-base-content/60 text-sm sm:text-base">
          Welcome to your URL Shortener Dashboard
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((item, index) => (
          <div key={index} className="card bg-base-100 shadow-md">
            <div className="card-body p-4 sm:p-5">
              <div className="flex items-center gap-3 sm:gap-4">
                <div
                  className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl ${item.color} flex items-center justify-center text-white font-bold`}
                >
                  {item.title.charAt(0)}
                </div>

                <div>
                  <h2 className="text-xs sm:text-sm text-base-content/60">
                    {item.title}
                  </h2>
                  <p className="text-xl sm:text-2xl font-bold">
                    {item.value}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="card bg-base-100 shadow-xl">
        <div className="card-body p-4 sm:p-6">
          <h2 className="card-title text-base sm:text-lg">
            Analytics Overview
          </h2>

          <div className="h-64 sm:h-80">
            <Chart />
          </div>
        </div>
      </div>

      <div className="card bg-base-100 shadow-xl">
        <div className="card-body p-4 sm:p-6">
          <h2 className="card-title text-base sm:text-lg">
            Recent Short URLs
          </h2>

          <div className="overflow-x-auto">
            <table className="table table-xs sm:table-md">
              <thead>
                <tr>
                  <th>Short URL</th>
                  <th className="hidden sm:table-cell">Original URL</th>
                  <th>Clicks</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td className="text-blue-600 font-medium">
                    short.ly/abc123
                  </td>
                  <td className="hidden sm:table-cell">
                    https://example.com/product-page
                  </td>
                  <td>1,245</td>
                  <td>
                    <span className="badge badge-success badge-sm">
                      Active
                    </span>
                  </td>
                </tr>

                <tr>
                  <td className="text-blue-600 font-medium">
                    short.ly/xyz789
                  </td>
                  <td className="hidden sm:table-cell">
                    https://mywebsite.com/blog
                  </td>
                  <td>845</td>
                  <td>
                    <span className="badge badge-warning badge-sm">
                      Pending
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </div>
  );
};

export default DashBoardPage;