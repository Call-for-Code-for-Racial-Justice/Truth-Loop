import React , {Component, Fragment} from 'react';

import '../PolicyCatalog/policyCatalog.scss';
import './policydetails.scss';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,withRouter
  } from "react-router-dom";
  import { Launch20 ,Watson20, VideoAdd20,VideoFilled20} from '@carbon/icons-react';
  import {Accordion, AccordionItem  } from 'carbon-components-react';
class PolicyDetails extends Component {
	
    constructor(props)
    {
	   super(props)
    }

  
    render(){
        let widthRed='15%';
        let widthRedopac=(100-parseInt(widthRed))+'%';
        let widthBlue='65%';
        let widthBlueopac=(100-parseInt(widthBlue))+'%';
        let widthYellow='20%';
        let widthYellowopac=(100-parseInt(widthYellow))+'%';
        return(
       <>
       <div>
        <div class='DescDiv'>
            <p class='pLeft'>Federal</p>
            <p class='mainData'>
            H.R. 6019: Cure the Coronavirus Act:Willium M. (Mac) thornberry National Defence Authorization Act for Fiscal Year 2021
            </p>
            <p class='padding10 pLeft'>
              <span>Federal</span>  
              <span class='floatRight'>Introduced: 02/03/2020</span>
            </p>
            <p class='pLeft'>
                Passed House (Senate next) on Jul 20,2020
            </p>
            <div className='link'>Full text  &nbsp; &nbsp; &nbsp;<Launch20 />
            </div>
        </div>
        <div class='divSentiment'>
            <p class='pCommunity'><span>COMMUNITY SENTIMENT</span><span class='floatRight'><Watson20 /></span></p>
            <p class='p-sentiment'>15% Negative</p>
            <hr class='hrClass-Red' style={{width:widthRed}}></hr>
            <hr class='hrClass-Red opacityhr' style={{width:widthRedopac}}></hr>
            <p class='p-sentiment'>65% Neutral</p>
            <hr class='hrClass-blue' style={{width:widthBlue}}></hr>
            <hr class='hrClass-blue opacityhr' style={{width:widthBlueopac}}></hr>
            <p class='p-sentiment'>20% Positive</p>
            <hr class='hrClass-yellow' style={{width:widthYellow}}></hr>
            <hr class='hrClass-yellow opacityhr' style={{width:widthYellowopac}}></hr>

        </div>
       <Accordion>
       <AccordionItem  title='Summary' open={'true'}>
    <div >
    The Federal Communication Commission (FCC) provides E-rate program provides subsidies for eligible schools and libraries telecommunications and information services more affordable for schools and libraries.  With funding from the Universal Service Fund (fcc.gov/general/universal-service-fund), E-Rate provides discounts for telecommunications, Internet access, and internal connections to eligible schools and libraries.
    </div>
    <br/>
    <div >
            While the intention was to prevent access to content such as pornography,sometimes these filters' automatic choice prove suspect.A Tennessee high school student discovered he couldn't access websites for LGBT organizations or scholorships in his school's computer lab, but could accss websites promoting conversion therepy.
    </div>
           </AccordionItem>
           <AccordionItem  title='Officials and sponsors' ></AccordionItem>
           <AccordionItem  title='Status history' ></AccordionItem>
           <AccordionItem  title='Related policies' ></AccordionItem>
           </Accordion>
           <div className='dummydiv'></div>
           </div>
           
           {/* <Footer text='Tell my story' style={{bottom:'46px;'}} /> */}
             <div className="footer1" >
                <span>Tell my story</span>
                <VideoAdd20  class='floatRight'/>
                </div>
                <div className="footer2" >
                <span>See policy testimonials</span>
                <VideoFilled20  class='floatRight' style={{color: 'white;'}}/>
            </div>
           {/* <Footer text='See policy testomenials'  style={{bottom:'0;'}}/> */}
           </>
        )
    }
}

export default withRouter (PolicyDetails);