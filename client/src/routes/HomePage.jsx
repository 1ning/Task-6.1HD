import React from 'react';
import Subscribe from '../components/homepage/Subscribe';
import Search from '../components/homepage/Search';
import Headphoto from '../components/homepage/Headphoto'
import Articles from '../components/homepage/Articles';
import Tutorials from '../components/homepage/Tutorials';
import Bottom from '../components/homepage/Bottom';
function HomePage() {
    return(  
        <div >
           <Search />
           <Headphoto />
           <Articles />
           <Tutorials />
           <Subscribe/>
           <Bottom/>
        </div>);
}
export default HomePage;