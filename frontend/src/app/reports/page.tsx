'use client';

import {
  Chart,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Legend,
  Tooltip
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import Layout from '../../components/Layout';

Chart.register(LineElement, PointElement, LinearScale, CategoryScale, Legend, Tooltip);

const data = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Balance',
      data: [500, 800, 750, 900, 1100, 1200],
      fill: false,
      borderColor: '#3b82f6'
    }
  ]
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const
    }
  }
};

const summary = [
  { label: 'Income', value: 5000 },
  { label: 'Expenses', value: 3000 }
];

export default function ReportsPage() {
  return (
    <Layout title="Reports">
      <div className="space-y-8">
        <div className="box">
          <div className="box-header with-border">
            <h3 className="box-title">Account Balances</h3>
          </div>
          <div className="box-body">
            <Line data={data} options={options} />
          </div>
        </div>

        <div className="box">
          <div className="box-header with-border">
            <h3 className="box-title">Summary</h3>
          </div>
          <div className="box-body">
            <table className="table-auto w-full">
              <tbody>
                {summary.map((item) => (
                  <tr key={item.label}>
                    <td className="p-2">{item.label}</td>
                    <td className="p-2 text-right">
                      {item.value.toLocaleString(undefined, {
                        style: 'currency',
                        currency: 'USD'
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
}

