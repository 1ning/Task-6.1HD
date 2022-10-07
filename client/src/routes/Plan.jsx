import React from 'react';
import '../Plan.css';
import { Link } from 'react-router-dom';
//Two plans are displayed to allow the user to choose. 
//When the user selects the premium plan they will be redirected to the payment page
function Plan() {
    return(
        <div id="planbox1">   
        <strong >Subscription Plans</strong>
        <div id="planbox2">
        <div class="ui cards">
        <div class="card">
        <div class="content">
          <div class="header">Free Plan</div>
          <div class="description" id="ss">
          <p><strong >           
            no customization messages feature</strong></p>
          <p><strong >         
            no customization banners feature</strong></p>
          <p><strong >         
            no customization themes feature</strong></p>
          <p><strong >         
            no content controls feature</strong></p>
          <p><strong >          
            no  additional admin feature</strong></p>
          <p><strong >         
            no support analytics dashboard </strong></p>
          </div>
        </div>
        <div class="ui bottom attached button">
        <Link to="/HomePage">  No upgrades</Link>
        </div>
      </div>
      <div class="card">
        <div class="content">
          <div class="header">Premium plan</div>
          <div class="description" id="cardcontent">
          <p><strong >           
            <i class="hand point right icon"></i>customization messages feature</strong></p>
          <p><strong >         
             <i class="hand point right icon"></i>customization banners feature</strong></p>
          <p><strong >         
             <i class="hand point right icon"></i>customization themes feature</strong></p>
          <p><strong >         
             <i class="hand point right icon"></i>content controls feature</strong></p>
          <p><strong >          
            <i class="hand point right icon"></i>additional admin feature</strong></p>
          <p><strong >         
             <i class="hand point right icon"></i>support analytics dashboard </strong></p>
             <p><strong >10 USD per month</strong></p>
          </div>
        </div>
        <div class="ui bottom attached button">
        <i class="thumbs up icon"></i>
        <Link to="/Pay">Upgrade Plan</Link>
        </div>
        </div>
      </div>
      </div>
      </div>
    
          );
}
 
export default Plan;