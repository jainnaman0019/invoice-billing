import React from 'react'
import { LineChart,Line, XAxis, YAxis,Tooltip, ResponsiveContainer } from 'recharts'
import { transformChartData } from '../utils/transformChartData'

const Salescharts = ({data,title,type}) => {
  const chartdata= transformChartData(data,type);
  return (
    <div className='bg-white rounded-lg border-black p-5 shadow'>
      <h2 className='font-bold text-xl mb-4'>{title}</h2>

        <ResponsiveContainer width="100%" height={300} >
            <LineChart data={chartdata}>
                <XAxis dataKey="label"/>
                <YAxis/>
                <Tooltip/>
                <Line type="monotone" dataKey="sales" stroke="#8884d8" strokeWidth={2} />
            </LineChart>
        </ResponsiveContainer>
    </div>
  )
}

export default Salescharts
