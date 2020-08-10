import React , {Component, Fragment} from 'react';
import { Search } from 'carbon-components-react';
    
import './policyCatalog.scss';
class Policycatalog extends Component {
	
    constructor(props)
    {
	   super(props)
    }

  
    render(){
        return(
        <>
        {/* <Search
  id="search-1"
  placeHolderText="Search"
/> */}
		{/* <h1>welcome to policy Catalog page</h1> */}
        <div class='outerDiv'>
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

export default Policycatalog;