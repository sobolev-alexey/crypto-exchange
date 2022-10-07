import React, { useState, useEffect } from 'react';
import { Spin } from 'antd';
import useSWR from 'swr';
import { Line } from '@ant-design/plots';
import { ErrorBoundary } from 'react-error-boundary';

const VolumeChart = ({ id }: { id: string }) => {
  const [chartData, setChartData] = useState([{ time: 0, value: 0 }]);

  const { data, error } = useSWR(
    `${import.meta.env.VITE_API_BASE}/exchanges/${id}/volume_chart?days=7`
  );

  useEffect(() => {
    const chartData = data?.map((arr: (string | number)[]) => ({ time: arr[0], value: Math.round(Number(arr[1])) }));
    setChartData(chartData);
  }, [data]);

  const config = {
    data: chartData,
    padding: 'auto',
    xField: 'time',
    yField: 'value',
    color: '#d64960',
    xAxis: false,
    yAxis: false,
    interactions: [{ type: 'tooltip', enable: false }]
  };

  if (error) return null;
  if (!data) return <Spin />
  
  return (
    <ErrorBoundary FallbackComponent={<div className="chart-wrapper" />}>
      <div className="chart-wrapper">
        <Line {...config} />
      </div>
    </ErrorBoundary>
  );
}

export default VolumeChart;