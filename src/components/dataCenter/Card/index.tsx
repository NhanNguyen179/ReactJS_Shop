import {amber, grey} from "@mui/material/colors";
import {IDataChartResponse, IOrderDataResponse} from "../interface";

export default (child:any)=>{
    const data = child.dataCard as IOrderDataResponse

    return (
        <div style={{
            width:'100%',
            height:'100%',
            boxShadow:'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
            borderRadius:'4px',
            borderTop:`5px solid ${amber[900]}`
        }}>
            <div style={{boxSizing:"border-box",padding:12}}>
                {/*title*/}
                <div>
                    <p style={{color:grey[600],wordWrap:"break-word"}}>{data.name}</p>
                </div>
                {/*value*/}
                <div>
                    <p style={{fontSize:20}}>{data.value}</p>
                </div>
            </div>
        </div>
    )
}