import React from 'react';
import { BarChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Bar } from 'recharts';

export default ({ data, style, width, height }) => (
  <BarChart style={style} width={width} height={height} data={data}
        margin={{top: 20, right: 30, left: 20, bottom: 5}}>
   <XAxis dataKey="name"/>
   <YAxis yAxisId="left" />
   <YAxis yAxisId="right" orientation="right" />
   <CartesianGrid strokeDasharray="3 3"/>
   <Tooltip/>
   <Legend />
   <Bar yAxisId="left" dataKey="carbs" stackId="a" fill="#8884d8" />
   <Bar yAxisId="left" dataKey="protein" stackId="a" fill="#82ca9d" />
   <Bar yAxisId="left" dataKey="fat" stackId="a" fill="#b00d1e" />
   <Bar yAxisId="right" dataKey="calories" fill="#666" />
  </BarChart>
);
