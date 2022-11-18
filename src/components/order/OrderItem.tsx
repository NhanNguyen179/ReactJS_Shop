import {Avatar, Box, Grid, Rating} from "@mui/material";
import {IOrderAndProduct} from "./interface";
import Link from "@mui/material/Link";
import StarIcon from "@mui/icons-material/Star";
import {styled} from "@mui/material/styles";
import {amber, grey, red} from "@mui/material/colors";
import util from "./util";
import {Navigation} from "@mui/icons-material";
import {NavLink} from "react-router-dom";

const CustomGrid = styled(Grid)`
  cursor: pointer;
  transition:0.5s;
  &:hover {
    background-color: rgba(236, 236, 236, 0.82);
  }
`

export default function OrderItem(child:any){
    const item = child.item as IOrderAndProduct

    return (
        <NavLink to={`/product/${item.product.id}`}>
            <CustomGrid container spacing={2} style={{minHeight:'120px',width:'90%',margin:"5px auto",boxShadow: "rgba(0, 0, 0, 0.2) 1px 1px 4px"}}>
                <Grid item xs={2} style={{display:'flex',justifyContent:"center",alignItems:"center" }}>
                        <Avatar variant={"rounded"} sx={{ width: 60, height: 60 }} src={item.product?.avatar}></Avatar>
                </Grid>
                <Grid item xs={8}>
                        <h3>{item.product.name}</h3>
                        <p style={{color:grey[600]}}>{util.limitString(item.product.description,40)}</p>
                        <span style={{color:amber[900]}}>x{item.quantity}</span>
                </Grid>
                <Grid item xs={2}>
                    {
                        item.product.discount?
                            (<Box style={{height:'100%',display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
                                    <p style={{textDecoration:"line-through"}}>{util.convertToMoneyString(item.product.price)}</p>
                                    <p style={{color:red[500]}}>{util.convertToMoneyString(item.product.price*(1-item.product.discount))}</p>
                            </Box>
                            )
                            :
                            <p style={{color:red[500]}}>{util.convertToMoneyString(item.product.price)}</p>
                    }
                </Grid>
            </CustomGrid>
        </NavLink>
    )
}