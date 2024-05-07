// eslint-disable-next-line no-unused-vars
import React from 'react'

const Footers1 = () => {
  return (
    <div className='bg-white '>
        <div className=" justify-content-center z-1 ">
  <footer className="">
    <div className="row ms-auto me-auto">
      <div className="col-6 col-md-2 p-2">
     <img src="/oldlogo.png" alt="" style={{float:"left", mixBlendMode:"multiply", paddingLeft:"10px"}}/>
      </div>
      <div className="col-6 col-md-2">
      {/* <div className="vertical-line p-2 h-100 "></div> */}
       
      </div>
      {/* <div className="col-6 col-md-2">
      <div className="vertical-line p-2 h-100 "></div>
       
      </div> */}
      {/* <div className="col-6 col-md-2">
      <div className="vertical-line p-2 h-100 "></div>
      </div> */}
      <div className="col-md-5 offset-md-1 ">
      {/* <div className="vertical-line p-2 h-100 "></div> */}
        <h3>Address</h3>
     <p> MVJ College of Engineering ,</p>
     <p>Near ITPB, Whitefield</p>
     <p> Bangalore-560 067</p>
      <hr  className=''/>
     <p className='h4'>Contact Us</p>
     <p>Email: proinnovate@edu.in. </p>	
	<p>Phone Number: +91123456789 </p>

      </div>
    </div>
   
  </footer> 
</div>
<div className=" border-top  text-white bg-secondary  text-center  ">
    © 2024 ProInnovate, All rights reserved.
   
    </div>
    </div>
  )
}

export default Footers1