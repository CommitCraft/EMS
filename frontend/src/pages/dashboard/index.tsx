import { useEffect, useMemo, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Tooltip,
} from 'chart.js';
import toast from 'react-hot-toast';
import { StatCard } from '../../components/StatCard';
import { ChartPanel } from '../../components/ChartPanel';
import { Spinner } from '../../components/Spinner';
import { dashboardService } from '../../services/dashboardService';
import { DashboardCharts, DashboardSummary } from '../../types';

ChartJS.register(BarElement, CategoryScale, Legend, LinearScale, Tooltip);

const chartTextColor = '#334155';
const chartMutedColor = '#64748b';
const chartGridColor = '#e2e8f0';

const commonLegendOptions = {
  labels: {
    color: chartTextColor,
    usePointStyle: true,
    pointStyle: 'circle' as const,
    padding: 18,
    font: {
      size: 12,
      weight: 500 as const,
    },
  },
};

const commonTooltipOptions = {
  backgroundColor: '#0f172a',
  titleColor: '#ffffff',
  bodyColor: '#e2e8f0',
  padding: 12,
  cornerRadius: 10,
};

const DashboardPage = () => {
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [charts, setCharts] = useState<DashboardCharts | null>(null);
  const [loading, setLoading] = useState(true);

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
        toast.error('Unable to load dashboard');
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
          label: 'Users',
          data: charts?.departmentIssues.map((item) => Number(item.users || 0)) || [],
          backgroundColor: '#f97316',
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
      <div className="grid gap-4 sm:grid-cols-3 xl:grid-cols-3">
        <StatCard title="Total Users" value={summary?.totalUsers ?? 0} tone="accent" />
        <StatCard title="Departments" value={summary?.departments ?? 0} tone="neutral" />
        <StatCard title="Pending Approvals" value={summary?.pendingApprovals ?? 0} tone="copper" />
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
                  position: 'top',
                  align: 'end',
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
