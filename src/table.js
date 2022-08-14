import React from "react";

class Table extends React.Component{
    render() { 
        const {data,selectedrow} = this.props
        return (
            <div>
                     <tr className={`data-row ${selectedrow === data.id ? 'active': ''}`} 
                     onClick={()=>this.props.handlerselectedRow(data.id)}>


                    <td className="column1">{data.id}</td>
                    <td className="column2">{data.firstName}</td>
                    <td className="column3">{data.lastName}</td>
                    <td className="column4">{data.email}</td>
                    <td className="column5">{data.phone}</td>
                </tr>
            </div>
        );
    }

}
export default Table;