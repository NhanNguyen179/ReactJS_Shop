import { Box, Button, Input, MenuItem, Select } from "@mui/material";
import Card from "../Card";
import { useEffect, useRef, useState } from "react";
import {
  IOrderDataCenterQuery,
  IOrderDataCenterResponse,
  IOrderDataResponse,
} from "../interface";
import { amber, grey } from "@mui/material/colors";
import orderApi from "../../../api/orderApi";
import Grid from "@mui/material/Grid";
import Chart from "../chart";
export default function DataOrderContainer() {
  const [response, setResponse] = useState<IOrderDataCenterResponse | null>(
    null
  );
  const [configData, setConfigData] = useState<Array<any>>([]);
  const [configSelect, setConfigSelect] = useState<string>("");
  const [anchor, setAnchor] = useState<Date>(new Date());
  // effect
  useEffect(() => {
    // fetch config
    async function fetchConfig() {
      const response = await orderApi.getConfigDataCenter();
      if (response.data) {
        setConfigData(response.data);
        setConfigSelect(response.data[0].value);
        const data = {
          dataType: response.data[0].value,
          numOfLastDays: 1,
          selectedDate: new Date(),
        } as IOrderDataCenterQuery;
        fetchData(data).then();
      }
    }

    fetchConfig().then();
  }, []);

  const fetchData = async (data: IOrderDataCenterQuery) => {
    const response = await orderApi.getDataCenterOrder(data);
    if (response.data) {
      setResponse(response.data as IOrderDataCenterResponse);
    }
  };

  // handle
  const handleDateChange = (e: any) => {
    setAnchor(new Date(e.target.value));
  };

  const handleSubmit = () => {
    const data = {
      dataType: configSelect,
      selectedDate: anchor,
      numOfLastDays: 0,
    } as IOrderDataCenterQuery;

    fetchData(data).then();
  };

  return (
    <div
      style={{
        width: "100%",
        backgroundColor: grey[100],
        paddingTop: 50,
        paddingBottom: 50,
      }}
    >
      {/*container*/}
      <div
        style={{
          width: 900,
          backgroundColor: "white",
          minHeight: 500,
          margin: "100px auto",
          boxSizing: "border-box",
          padding: "0 16px 100px",
        }}
      >
        {/*header*/}
        <div
          style={{
            width: "100%",
            borderBottom: `3px solid ${amber[800]}`,
            paddingBottom: 10,
          }}
        >
          <label style={{ marginLeft: 8 }} htmlFor={"anchor"}>
            Móc thời gian
          </label>
          <Input
            onChange={(e) => handleDateChange(e)}
            value={anchor.toISOString().split("T")[0]}
            style={{ marginLeft: 8 }}
            type={"date"}
            id={"anchor"}
          />
          <label style={{ marginLeft: 28 }} htmlFor={"frame"}>
            Khung thời gian
          </label>
          <Select
            onChange={(e) => setConfigSelect(e.target.value)}
            value={configSelect}
            style={{ marginLeft: 8 }}
          >
            {configData.map((config) => {
              return (
                <MenuItem key={config.id} value={config.value}>
                  {config.name}
                </MenuItem>
              );
            })}
          </Select>
          <Button
            onClick={(e) => handleSubmit()}
            style={{ marginLeft: 8, background: amber[800] }}
            variant={"contained"}
          >
            Dữ liệu
          </Button>
        </div>
        {/*card*/}
        <Grid container spacing={2} style={{ marginTop: 20 }}>
          {response?.data?.map((item, index) => {
            return (
              <Grid key={index} item xs={3}>
                <Card dataCard={item}></Card>
              </Grid>
            );
          })}
        </Grid>
        <Box>
          {response?.charts ? <Chart {...response.charts}></Chart> : <></>}
        </Box>
      </div>
    </div>
  );
}
