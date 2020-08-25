import React , {Component, Fragment} from 'react';
import { Search, TableSelectAll } from 'carbon-components-react';
    
import './policyCatalog.scss';
import { withRouter } from "react-router-dom";
class Policycatalog extends Component {
	
    constructor(props)
    {
	   super(props)
    }
        gotoDetailsPage=()=>{
            
            this.props.history.push("/policydetails");
        }
  
    render(){
        return(
        <>
        {/* <Search
  id="search-1"
  placeHolderText="Search"
/> */}
		{/* <h1>welcome to policy Catalog page</h1> */}
        {/* <div class='outerDiv' onClick={this.gotoDetailsPage()}> */}
        <div class='outerDiv' onClick={()=>this.gotoDetailsPage()}>
        <hr class='hrClassRed'></hr>
            <hr class='hrClassBlue'></hr>
            <hr class='hrClassYellow'></hr>
        <div class='border'>
          



            <p class='padding10'> {this.props.obj.name}</p>
            <p class='padding10'> {this.props.obj.description} </p>
            <p class='padding10'>
              <span>Federal</span>  
              <span class='floatRight'>Introduced: {this.props.obj.date}</span>
            </p>
        </div>
        </div>
        </>
        )
    }
}

export default withRouter (Policycatalog);