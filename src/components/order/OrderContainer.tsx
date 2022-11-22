import { Box, Button, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { IStatusOrder } from "./interface";
import { amber, grey } from "@mui/material/colors";
import OrderView from "./OrderView";
import util from "./util";
import orderApi from "../../api/orderApi";

export default function OrderContainer() {
  const [listStatus, setListStatus] = useState(util.getListStatus());
  const [sta, setSta] = useState<IStatusOrder>(listStatus[0]);
  const handleTabChange = (e: string) => {
    setSta((prevState) => {
      const a = listStatus.find((x) => x.value === e);
      if (a) {
        return a;
      } else return listStatus[0];
    });
  };

  useEffect(() => {
    async function fetch() {
      const response = await orderApi.getConfigOrder();
      if (response.data) {
        setListStatus(response.data);
        setSta(response.data[0]);
      }
    }
    fetch().then();
  }, []);

  return (
    <Box bgcolor={grey[100]} style={{ paddingBottom: 20 }}>
      <Box style={{ margin: "100px auto", maxWidth: "1024px" }}>
        <Grid
          container
          style={{
            maxWidth: "100%",
            margin: "3px 0",
            display: "flex",
            justifyContent: "center",
            boxShadow:
              "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
          }}
        >
          {listStatus.map((o) => {
            if (o.value === sta.value) {
              return (
                <Grid key={o.value} item xs={2.4}>
                  <Button
                    style={{
                      borderBottom: `3px solid ${amber[900]}`,
                      color: amber[700],
                      alignItems: "center",
                      width: "100%",
                    }}
                    onClick={(e) => handleTabChange(o.value)}
                  >
                    {o.name}
                  </Button>{" "}
                </Grid>
              );
            } else {
              return (
                <Grid key={o.value} item xs={2.4}>
                  <Button
                    style={{
                      color: amber[900],
                      alignItems: "center",
                      width: "100%",
                    }}
                    onClick={(e) => handleTabChange(o.value)}
                  >
                    {o.name}
                  </Button>{" "}
                </Grid>
              );
            }
          })}
        </Grid>
        <Box>
          <OrderView status={sta.value} />
        </Box>
      </Box>
    </Box>
  );
}
