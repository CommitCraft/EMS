import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bar } from "react-chartjs-2";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Tooltip,
} from "chart.js";
import toast from "react-hot-toast";
import { StatCard } from "../../components/StatCard";
import { ChartPanel } from "../../components/ChartPanel";
import { Spinner } from "../../components/Spinner";
import { dashboardService } from "../../services/dashboardService";
import { DashboardCharts, DashboardSummary } from "../../types";

ChartJS.register(BarElement, CategoryScale, Legend, LinearScale, Tooltip);

const chartTextColor = "#334155";
const chartMutedColor = "#64748b";
const chartGridColor = "#e2e8f0";

const commonLegendOptions = {
  labels: {
    color: chartTextColor,
    usePointStyle: true,
    pointStyle: "circle" as const,
    padding: 18,
    font: {
      size: 12,
      weight: 500 as const,
    },
  },
};

const commonTooltipOptions = {
  backgroundColor: "#0f172a",
  titleColor: "#ffffff",
  bodyColor: "#e2e8f0",
  padding: 12,
  cornerRadius: 10,
};

const DashboardPage = () => {
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [charts, setCharts] = useState<DashboardCharts | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const [summaryResponse, chartsResponse] = await Promise.all([
          dashboardService.summary(),
          dashboardService.charts(),
        ]);

        setSummary(summaryResponse.data || null);
        setCharts(chartsResponse.data || null);
      } catch (error) {
        console.error(error);
        toast.error("Unable to load dashboard");
      } finally {
        setLoading(false);
      }
    };

    void loadDashboard();
  }, []);

  const barData = useMemo(
    () => ({
      labels: charts?.departmentIssues.map((item) => item.name) || [],
      datasets: [
        {
          label: "Users",
          data:
            charts?.departmentIssues.map((item) => Number(item.users || 0)) ||
            [],
          backgroundColor: "#f97316",
          borderRadius: 10,
          maxBarThickness: 44,
        },
      ],
    }),
    [charts],
  );

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="space-y-6">
          <div>
        <h3 className="mb-3 text-base font-semibold text-slate-800">
          Organization Overview
        </h3>
        <div className="grid gap-4 sm:grid-cols-3 xl:grid-cols-6">
          <button
            type="button"
            onClick={() => navigate("/organization/departments")}
            className="cursor-pointer transition hover:opacity-80"
          >
            <StatCard
              title="Departments"
              value={summary?.departments ?? 0}
              tone="purple"
            />
          </button>
          <button
            type="button"
            onClick={() => navigate("/organization/plants")}
            className="cursor-pointer transition hover:opacity-80"
          >
            <StatCard
              title="Plants"
              value={summary?.plants ?? 0}
              tone="cyan"
            />
          </button>
          <button
            type="button"
            onClick={() => navigate("/organization/lines")}
            className="cursor-pointer transition hover:opacity-80"
          >
            <StatCard
              title="Lines"
              value={summary?.lines ?? 0}
              tone="emerald"
            />
          </button>
          <button
            type="button"
            onClick={() => navigate("/organization/shifts")}
            className="cursor-pointer transition hover:opacity-80"
          >
            <StatCard
              title="Shifts"
              value={summary?.shifts ?? 0}
              tone="amber"
            />
          </button>
          <button
            type="button"
            onClick={() => navigate("/organization/machines")}
            className="cursor-pointer transition hover:opacity-80"
          >
            <StatCard
              title="Machines"
              value={summary?.machines ?? 0}
              tone="slate"
            />
          </button>
          <button
            type="button"
            onClick={() => navigate("/organization/suppliers")}
            className="cursor-pointer transition hover:opacity-80"
          >
            <StatCard
              title="Suppliers"
              value={summary?.suppliers ?? 0}
              tone="teal"
            />
          </button>
        </div>
      </div>

      <div>
        <h3 className="mb-3 text-base font-semibold text-slate-800">
          Access Control
        </h3>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <button
            type="button"
            onClick={() => navigate("/roles")}
            className="cursor-pointer transition hover:opacity-80"
          >
            <StatCard
              title="Roles"
              value={summary?.roles ?? 0}
              tone="indigo"
            />
          </button>
          <button
            type="button"
            onClick={() => navigate("/users")}
            className="cursor-pointer transition hover:opacity-80"
          >
            <StatCard
              title="Users"
              value={summary?.totalUsers ?? 0}
              tone="green"
            />
          </button>
          <button
            type="button"
            onClick={() => navigate("/roles/users")}
            className="cursor-pointer transition hover:opacity-80"
          >
            <StatCard
              title="Role Users"
              value={summary?.roleUsers ?? 0}
              tone="violet"
            />
          </button>
        </div>
      </div>

      <ChartPanel
        title="Department Wise Users"
        description="Active users across departments."
      >
        <div className="h-[340px]">
          <Bar
            data={barData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  position: "top",
                  align: "end",
                  ...commonLegendOptions,
                },
                tooltip: commonTooltipOptions,
              },
              scales: {
                x: {
                  ticks: {
                    color: chartMutedColor,
                  },
                  grid: {
                    display: false,
                  },
                },
                y: {
                  beginAtZero: true,
                  ticks: {
                    color: chartMutedColor,
                    precision: 0,
                  },
                  grid: {
                    color: chartGridColor,
                  },
                },
              },
            }}
          />
        </div>
      </ChartPanel>
    </div>
  );
};

export default DashboardPage;
