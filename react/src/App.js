import React from 'react';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import PageContent from './components/PageContent';
import Footer from './components/Footer';

function App() {

  
  return (
    <React.Fragment>
      
        <Sidebar/>

        
        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">

            <Navbar />

            <PageContent />

            <Footer />

          </div>
        </div>
     
    </React.Fragment>
  );
}

export default App;
