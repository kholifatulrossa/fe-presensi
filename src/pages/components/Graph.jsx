import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const data = [
  { date: 'Q1 2013', Presensi: 120, Hadir: 110, Telat: 130, Alpa: 140, Izin: 145},
  { date: 'Q2 2013', Presensi: 150, Hadir: 130, Telat: 120, Alpa: 135, Izin: 130 },
  { date: 'Q3 2013', Presensi: 170, Hadir: 145, Telat: 150, Alpa: 160, Izin: 120 },
  { date: 'Q4 2013', Presensi: 165, Hadir: 122, Telat: 170, Alpa: 190, Izin: 150 },
  { date: 'Q1 2014', Presensi: 180, Hadir: 170, Telat: 190, Alpa: 200, Izin: 200},
];

function Graph() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 10, right: 30, left: 0, bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="10" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="Presensi" stroke="#82ca9d" />
        <Line type="monotone" dataKey="Hadir" stroke="#8884d8" />
        <Line type="monotone" dataKey="Telat" stroke="#ffc658" />
        <Line type="monotone" dataKey="Alpha" stroke="#ff7300" />
        <Line type="monotone" dataKey="Izin" stroke="#ff7300" />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default Graph;
