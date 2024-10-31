import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';

const FourCardChart = ({ values }) => {
  // Data for the chart
  const data = [
      { name: 'Presensi', Total: values.presensi, color: '#4D91FF' },
      { name: 'Hadir', Total: values.hadir, color: '#8BC34A' },
      { name: 'Telat', Total: values.telat, color: '#FF6B6B' },
      { name: 'Izin', Total: values.izin, color: '#FFD54F' },
  ];

  return (
    <Box sx={{ width: '48vw', height: 350 }}>
      <Typography fontFamily="poppins" fontWeight="700" fontSize={24} sx={{ marginBottom: 2 }} color="#272A2C">
        Overview Kehadiran
      </Typography>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 40 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend verticalAlign="top" align="right" content={() => null} /> {/* Disable legend content */}
          <Bar dataKey="Total">
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default FourCardChart;
