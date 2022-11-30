import { Card, Grid } from "@mui/material";

export const CardProductInfo = ({ Product, shopId }: any) => {
  return (
    <Card>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={3}>
              Tên sản phẩm
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
};
