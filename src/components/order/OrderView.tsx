import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {useEffect, useState} from "react";
import {IOrderSearch, IResponseOrder} from "./interface";
import {Avatar, Button, Pagination} from "@mui/material";
import {Box} from "@material-ui/core";
import orderApi from "../../api/orderApi";
import util from "./util"
import OrderDetail from "./OrderDetail";
import DeleteIcon from '@mui/icons-material/Delete';
import constant from "./constant";

export default function OrderView(child:any) {
    const inputStatus = child.status
    const [orders,setOrders] = useState<Array<IOrderSearch>>([])
    const [page, setPage] = useState(1);
    const [numOfPage, setNumOfPage] = useState(1);
    const [detailId,setDetailId] = useState<string|null>(null)

    useEffect( ()=>{
       async function fetch(){
            const response = await orderApi.searchOrderByStatus(inputStatus,page)
            const data = response.data as IResponseOrder
            if(data){
                setOrders(pre =>data.orders)
            }
        }
        setOrders(pre =>[])
         fetch().then()
    },[page,inputStatus])

    const handleChangePage = (e: any) => {
        setPage(e.value);
    };

    const handlerClickOrderRow = (id:string|null)=>{
        setDetailId(id)
    }

    const handlerCancelOrder = (id:string) =>{
        if(window.confirm("Bạn có chắc chắn muốn hủy đơn hàng này ?")){
            async function fetch(){
                // api cancel
                await orderApi.updateStatusOrder(id,constant.status.canceled.value)
            }
            fetch().then(async (res) =>{
                const response = await orderApi.searchOrderByStatus(inputStatus,page)
                const data = response.data as IResponseOrder
                if(data){
                    setOrders(data.orders)
                }
                }
            )
        }
    }

    return (
        <Box>
            {
                orders.length ?
                    <Box>
                        <TableContainer component={Paper}>
                            <Table sx={{minWidth: 650}} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="left">Cửa hàng</TableCell>
                                        <TableCell align="left">trạng thái</TableCell>
                                        <TableCell align="left">tổng tiền</TableCell>
                                        <TableCell align="left">ngày mua</TableCell>
                                        <TableCell align="left">số sản phẩm</TableCell>
                                        {inputStatus === constant.status.waitForConfirm.value ?
                                            <TableCell align="left">Hủy đặt hàng </TableCell> : <></>}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {orders.map((row) => (
                                        <TableRow
                                            key={row.id}
                                            sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                            hover={true}
                                            style={{cursor: "pointer"}}
                                            onClick={e => handlerClickOrderRow(row.id)}
                                        >
                                            <TableCell component="th" scope="row">
                                                <Box style={{display: "flex", alignItems: "center"}}>
                                                    <Avatar src={row.shop.avatar} style={{marginRight: '5px'}}
                                                            variant={"rounded"}></Avatar>
                                                    {util.limitString(row.shop.name, 12)}
                                                </Box>
                                            </TableCell>
                                            <TableCell align="left">{util.getNameStatusByValue(row.status)}</TableCell>
                                            <TableCell align="left">{util.convertToMoneyString(row.total)}</TableCell>
                                            <TableCell
                                                align="left">{util.getFormattedDate(new Date(row.createdAt))}</TableCell>
                                            <TableCell align="left">{row.items.length}</TableCell>
                                            {inputStatus === constant.status.waitForConfirm.value ? <TableCell align="left"><Button
                                                onClick={e => handlerCancelOrder(row.id)}><DeleteIcon/></Button></TableCell> : <></>}
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                            <Box
                                mt={10}
                                mb={5}
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                <Pagination
                                    count={numOfPage}
                                    defaultPage={1}
                                    color={"primary"}
                                    variant="outlined"
                                    onChange={(e) => handleChangePage(e)}
                                />
                            </Box>
                        </TableContainer>
                        <Box>
                            {detailId ? <OrderDetail orderId={detailId}/> : <></>}
                        </Box>
                    </Box>
                    : (
                        <Box style={{height:400,backgroundColor:"white",display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column"}}>
                            <img src={"https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/assets/5fafbb923393b712b96488590b8f781f.png"} style={{width:200,height:200}}/>
                            <p>Bạn chưa có đơn hàng nào </p>
                        </Box>
                    )
            }
        </Box>
    );
}