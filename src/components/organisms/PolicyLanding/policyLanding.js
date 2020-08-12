import React , {Component, Fragment} from 'react';
// import logo from './logo.svg';
import './PolicyLanding.scss';
import Policycatalog from '../../atoms/PolicyCatalog/policyCatalog';
import Polictydetails from '../../atoms/PolicyDetails/PolicyDetails';
// import { Search } from 'carbon-components-react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,withRouter
} from "react-router-dom";
class PolicyLanding extends Component {
	
  constructor(props)
  {
   super(props)
   let arr=[];
  var object1={name : 'Nita Lowey',description:'H.R. 6019: Cure the Coronavirus Act',date:'11-08-2020'}
  var object2={name : 'Charles Grassley',description:'A policy is a deliberate system ',date:'21-07-2020'}
  var object3={name : 'Adam halk',description:'Principles to guide decisions and achieve rational outcomes',date:'06-06-2020'}
  var object4={name : 'James wills',description:'Plan of action, especially an official one',date:'19-04-2020'}
  var object5={name : 'Bill Chen',description:'H.R. 6019: Cure the Coronavirus Act',date:'15-05-2020'}
  arr.push(object1);
  arr.push(object2);
  arr.push(object3);arr.push(object4);arr.push(object5);
  arr.push(object1);
  arr.push(object2);
  arr.push(object3);arr.push(object4);arr.push(object5);
  this.state={
    showAll:false,
    catalogArray:arr
  }
  }
 seeAll=()=>{
   this.setState({showAll:true});
   
 }
  
  render(){
   let arr=this.arr;
   let content = <Fragment>

         <Switch>
          <Route exact path={this.props.pathName}>
          <>
    
      {/* <Search
  id="search-1"
  placeHolderText="What are you looking for today?"
/> */}
<div class='margin10'>
  <span class='fontMedium'>RECENT POLICIES ({this.state.catalogArray.length})</span><span class='seeall' onClick={this.seeAll}>See all </span>
  </div>
 
  {this.state.showAll ? <>
  {this.state.catalogArray.map((element) => (
       <Policycatalog obj={element}/>
      ))}
      </>
      :

      <>
      
  {this.state.catalogArray.slice(0, 5).map((element,ind) => (
      
       <Policycatalog obj={element}/>
       
      ))}
      </>
}
</>
          </Route>
          <Route path="/policydetails">
          <Polictydetails/>
          </Route>
          
          </Switch>
      
     
   </Fragment>
   
  return (
    // <Content id="main-content" className='padding0'>{content}</Content>
 <div class='rootDiv'>
   <div>{content}</div>
   </div>
  // this.state.catalogArray.map((element) => (
  //   <Policycatalog obj={element}/>
  //  ))
   
  );
}
}

export default withRouter (PolicyLanding);
