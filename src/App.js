import './App.css';
import React from 'react';
import './style.css'
import axios from 'axios';
import Table from './table';
import Wraper from './wraper';
class App extends React.Component{
  state={
    userdata:[],
    searchquery:'',
    filterdata: [],
    activeindex: 2,
    activerowid:'',
    activedata: ''
  }

  componentDidMount(){
    axios.get('https://admin-panel-data-edyoda-sourav.herokuapp.com/admin/data')
    .then(res=>this.setState({
      userdata:res.data,
      activerowid:res.data[this.state.activeindex].id,
      activedata:res.data[this.state.activeindex]
      
    }) )
    .catch(error=>console.log("error"))
  }
  getfilterdata =(e)=>{
    const filterhandler= this.state.userdata.filter(search=>search.firstName.toLowerCase().includes(e.target.value.toLowerCase()))
    console.log(filterhandler)
    this.setState({
        searchquery:e.target.value,
        filterdata:filterhandler,


    })
  }
  handlerselectedRow=(id)=>{
    console.log(id)
     let activerowrecord=this.state.userdata.findIndex(user=>user.id===id)
     this.setState({
activerowid:id,
activedata:this.state.userdata[activerowrecord]

     })
     
  }

  render(){
    console.log('this is state', this.state)

    return(
    
<div>
<main>

<div id="table-section">

    <form action="/">
        {/* <img src='./img/search-icon.svg' alt="Search Icon" /> */}
        <input type="text" placeholder="Enter something" 
        name="search-box" 
        id="search-box" 
        onChange={(e)=>this.getfilterdata(e)}
        value={this.state.searchquery} />
    </form>

    <div id="table-wrapper">

        <div id="table-headers">
            <table>
                <thead>
                    <tr>
                        <th class="column1">Id</th>
                        <th class="column2">FirstName</th>
                        <th class="column3">LastName</th>
                        <th class="column4">Email</th>
                        <th class="column5">Phone</th>
                    </tr>
                </thead>
            </table>
        </div>

        <div id="table-data">
            <table>
                <tbody>
                    
              {
                this.state.filterdata.length===0 && this.state.searchquery===''
                ?
                this.state.userdata.map(user=><Table data={user}
              selectedrow={this.state.activerowid}
              handlerselectedRow={this.handlerselectedRow}
              filterdata={this.state.searchquery}
              />) 
               :
                this.state.filterdata.map(user=><Table data={user}
                    selectedrow={this.state.activerowid}
                    handlerselectedRow={this.handlerselectedRow}
                />)
              }
                </tbody>
            </table>
        </div>

    </div>

</div>
{
    this.state.activedata ? <Wraper data={this.state.activedata}/> : ''


}




</main>

</div>      

    );
  }
}
export default App;
