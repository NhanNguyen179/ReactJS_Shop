import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import ProductList from "../products/ProductList";
import productFunction from "../../api/productFunction";
import { Container } from "@mui/material";
import NoResultPage from "../NoResultPage";
import Loading from "../Loading";
import * as React from "react";
import { makeStyles } from "@material-ui/core";
import { useLocation } from "react-router-dom";

const useStyles = makeStyles(() => ({
  ul: {
    "& .MuiPaginationItem-root": {
      color: "#FFA500",
    },
  },
  center: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

export default function CategoryPage() {
  const search = useLocation().search;
  const categoryId = new URLSearchParams(search).get("categoryId");
  const pageQuery = new URLSearchParams(search).get("page");
  const keyWord = new URLSearchParams(search).get("keyWord");

  const [products, setProducts] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [page, setPage] = React.useState<number>(
    pageQuery ? parseInt(pageQuery) : 1
  );
  const [totalPage, setTotalPage] = React.useState<number>(1);

  var params = new URLSearchParams();
  if (categoryId) {
    params.append("categoryId", categoryId);
  }

  if (keyWord) {
    params.append("keyWord", keyWord);
  }

  params.append("pageNo", page.toString());
  params.append("pageSize", "12");

  const handleChange = (e: any, p: any) => {
    setPage(p);
  };
  const styles = useStyles();

  React.useEffect(() => {
    setLoading(true);
    const fetch = async () => {
      const respone: any = await productFunction.getProducts({
        params: params,
      });
      setProducts(respone.data);
      setTotalPage(respone.totalPages);
      setPage(respone.pageNo);
    };
    fetch().then(() => setLoading(false));
  }, [page, categoryId, keyWord]);

  if (loading) {
    return <Loading />;
  } else {
    return (
      <>
        {products.length === 0 ? (
          <NoResultPage />
        ) : (
          <>
            <Container fixed style={{ marginTop: "100px" }}>
              <ProductList products={products} />
              <Stack spacing={2} className={styles.center}>
                <Pagination
                  count={totalPage}
                  page={page}
                  variant="outlined"
                  classes={{ ul: styles.ul }}
                  size="large"
                  onChange={handleChange}
                />
              </Stack>
            </Container>
          </>
        )}
      </>
    );
  }
}
