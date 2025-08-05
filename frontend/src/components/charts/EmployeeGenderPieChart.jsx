import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { getGenderStats } from '../../services/employeeService';

const EmployeeGenderPieChart = () => {
  const [series, setSeries] = useState([]);
  const [labels, setLabels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getGenderStats()
      .then((res) => {
        const data = res.data;
        if (data) {
          setLabels(Object.keys(data)); 
          setSeries(Object.values(data)); 
        }
      })
      .catch((err) => {
        console.error('Lỗi API:', err);
      })
      .finally(() => setLoading(false));
  }, []);

  const options = {
    chart: {
      type: 'pie',
      fontFamily: 'Inter, sans-serif',
      toolbar: { show: false },
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 800,
        animateGradually: {
          enabled: true,
          delay: 150,
        },
        dynamicAnimation: {
          enabled: true,
          speed: 350
        }
      }
    },
    labels: labels,
    colors: ['#9EC1CF', '#A8C66C'], 
    stroke: {
      show: true,
      width: 2,
      colors: ['#fff'], 
    },
    dataLabels: {
      enabled: true,
      formatter: (val) => `${val.toFixed(1)}%`,
      style: {
        fontSize: '14px',
        fontWeight: 600,
        colors: ['#fff'],
      },
    },
    legend: {
      position: 'top',
      horizontalAlign: 'center',
      fontSize: '14px',
      fontWeight: 500,
      markers: {
        width: 12,
        height: 12,
        radius: 2,
      },
    },
    tooltip: {
      enabled: true,
      y: {
        formatter: (value) => `${value.toLocaleString()} nhân viên`,
        title: {
          formatter: (seriesName) => seriesName,
        },
      },
    },
  };

  if (loading) return <div className="text-center text-gray-500">Đang tải dữ liệu...</div>;

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-lg font-bold mb-4">Phân bố giới tính</h2>
      <Chart options={options} series={series} type="pie" height={350} />
    </div>
  );
};

export default EmployeeGenderPieChart;
