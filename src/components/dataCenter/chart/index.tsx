import { useTheme } from "@mui/material/styles";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Label,
  ResponsiveContainer,
} from "recharts";
import Title from "./Title";
import {IChartResponse, IDataChartResponse} from "../interface";

// Generate Sales Data
function createData(time: string, amount?: number) {
  return { time, amount };
}

export default function Index(chart:IChartResponse) {

    const theme = useTheme();

  return (
    <div style={{ width: 900, height: 300, margin: " 50px auto",position:'relative' }}>
        <h1 style={{position:"absolute",top:0,left:0}}>Doanh số (VNĐ) </h1>
        <h1 style={{position:"absolute",bottom:-50,left:'50%'}}>Thời gian</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Title>{chart.name}</Title>
      </div>
      <ResponsiveContainer>
        <LineChart
          data={chart.data}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis
            dataKey="name"
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          ></XAxis>
          <YAxis
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          >
          </YAxis>
          <Line
            isAnimationActive={false}
            type="monotone"
            dataKey="value"
            stroke={theme.palette.primary.main}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
