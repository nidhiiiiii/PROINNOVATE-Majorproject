import React, { useEffect, useState } from 'react'
import AxiosAPI from '../../AxiosAPI'



const ViewQueries = () => {
  const [queries, setQueries]=useState()
  const getQueries=async()=>{
    try {
      await AxiosAPI.get("query").then((respone)=>{
        console.log(respone, "quer");
        setQueries(respone.data.Queries)
      })
    } catch (error) {
      console.log(error, "querries");
    }
  }
  useEffect(()=>{
    getQueries()
  }, []);
  function formatDate(dateString) {
    const options = {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    };
    const formattedDate = new Date(dateString).toLocaleString('en-US', options);
    return formattedDate;
  }
  return (
    <div>
       
         <div className="p-3 ">
        <h4>Manage Queries</h4>
        <hr />
       
        <div className="card"> <h5 className="p-3">Inbox  </h5>
            <div className="card-body">
                  <ul className="list-unstyled ">
          {queries&&queries.map((item)=>(<li className="p-3 " key={item.id}>
            <span className="rounded-circle1 bg-secondary">
            <i className="fa-regular fa-user text-white "></i>
            </span>
            <p style={{ display: "inline" }} className="p-3 fs-5 ">
             {item.email} 
             {/* <small className=" ms-lg-5 ">{formatDate(item.date)}</small> */}
            </p>
            <p className=" ms-lg-5 ">{item.query}</p>
          </li>))}
          {/* <li className="p-3 ">
            <span className="rounded-circle bg-secondary">            <i className="fa-regular fa-user text-white "></i>
</span>
            <p style={{ display: "inline" }} className="p-3 fs-5">
              S. Khaja Khijar <small className=" ms-lg-5 ">03:59PM</small>
            </p>
            <p className=" ms-lg-5 ">can I change paymnet details</p>

          </li>
          <li className="p-3 ">
            <span className="rounded-circle bg-secondary">            <i className="fa-regular fa-user text-white "></i>
</span>
            <p style={{ display: "inline" }} className="p-3 fs-5">
              Event2 <small className=" ms-lg-5 text-muted">31 Dec 2024</small>
            </p>
            <p className=" ms-lg-5 ">I am unable to register</p>

          </li>
          <li className="p-3 ">
            <span className="rounded-circle bg-secondary">            <i className="fa-regular fa-user text-white "></i>
</span>
            <p style={{ display: "inline" }} className="p-3 fs-5">
              Event2 <small className=" ms-lg-5 ">31 Dec 2024</small>
            </p>
            <p className=" ms-lg-5 ">I am unable to register</p>

          </li> */}
        </ul>
            </div>
        </div>
      
    
      </div>
      <style jsx="true">{`
        .rounded-circle1 {
          width: 40px;
          height: 40px;
          display: inline-block;
          border-radius: 50%;
          text-align: center;
          line-height: 40px;
          font-size: 18px;
        }
      `}</style>
    </div>
  )
}

export default ViewQueries