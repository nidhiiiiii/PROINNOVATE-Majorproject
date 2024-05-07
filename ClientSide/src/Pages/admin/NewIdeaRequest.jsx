import React, { useEffect, useState } from "react";
import AxiosAPI, { url } from "../../AxiosAPI";
import { toast } from "react-toastify";

const NewIdeaRequest = () => {
  const [projects, setProjects]=useState()

  const getAllProjects=async()=>{
    const response= await AxiosAPI.get(`projects`);
    console.log(response ,"all projects");
    setProjects(response.data)
  }
  useEffect(()=>{
    getAllProjects();
  }, [])
  const [valid ,setvalid]=useState()
  const acceptFunction=async(id, value)=>{
    try {
      const results= await AxiosAPI.post(`projects/accept/${id}/${value}`, );
      value?toast.success(results.data.message):toast.error(results.data.message);
      setvalid(results.data.Project.valid);
      console.log(results , "accepted");
      getAllProjects();
    } catch (error) {
      console.log(error , "Accept error");
    }
  }
  const relatedDocsDownload = async (filename) => {
    try {
      window.open(
        `${url}projects/download/${filename}`,
        "_blank"
      );
      // const newWindow = window.open( response.data, '_blank', 'noopener,noreferrer');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div className="container">
      {projects&&projects.map((item)=>(<div className="row mt-2 "  key={item.id}>
        <div className="col-md-9">
          <div className="card">
             <div className=" card-header d-flex ">
                <h4>{item.projectName}</h4>
               {item.valid==="REJECTED"||item.valid==="ACCEPTED"? <a
                    href="#"
                    className="ms-auto mt-1 btn btn-outline-secondary disabled"
                    disabled
                  >
                    <i className="fa-solid fa-check-double"></i>{item.valid}
                  </a>: <a
                    href="#"
                    className="ms-auto mt-1 btn btn-outline-secondary "
                    onClick={()=>acceptFunction(item.id, "PENDING")}
                  >
                    <i className="fa-solid fa-check-double"></i>Accept
                  </a>}
                 { item.valid==="REJECTED"||item.valid==="ACCEPTED"?
                //  <a
                //     href="#"
                //     disabled
                //     className="ms-auto mt-1 btn btn-outline-secondary disabled"
                   
                //   >
                //     <i className="fa-solid fa-rectangle-xmark text-danger"></i>
                //     {item.valid}
                //   </a>
                ""
                  : <a
                    href="#"
                    className="ms-auto mt-1 btn btn-outline-secondary "
                    onClick={()=>acceptFunction(item.id, "REJECTED")}
                  >
                    <i className="fa-solid fa-check-double"></i>Reject
                  </a>}
               
              </div>
            <div className="card-body" style={{minHeight:"130px"}}>
            <p className=" text-warning ">
                          Category: {item.category}
                        </p>
                        <p className=" text-warning ">
                          Department: {item.departments}
                        </p>
                        <p className=" text-warning ">
                          Achievements:{item.achievements}
                        </p>
            {item.projectDescription}
              
            </div>
            <div className=" card-footer">
                <a href="#" onClick={()=>relatedDocsDownload(item.projectName)}>View Related Documents</a>{" "}
              
              </div>
          </div>
        </div>
      </div>))}
        {/* <div className="row mt-2 ">
          <div className="col-md-9">
            <div className="card">
              <div className="card-body">
                <div className=" card-header d-flex ">
                  <h4>Project Name2</h4>
                  <a
                    href="#"
                    className="ms-auto mt-1 btn btn-outline-secondary "
                  >
                    <i className="fa-solid fa-check-double"></i>Accept
                  </a>
                  <a
                    href="#"
                    className="ms-auto mt-1 btn btn-outline-secondary "
                  >
                    <i className="fa-solid fa-rectangle-xmark text-danger"></i>
                    Reject
                  </a>
                </div>
                Consectetur, ducimus, nihil recusandae dolor nulla ullam ut
                sequi quidem corporis asperiores provident modi quod, est iusto
                distinctio necessitatibus animi reprehenderit sed maxime libero!
                Illum ex repellat itaque laudantium facilis! Et, unde.
                Asperiores repellendus sit nesciunt quisquam possimus ex ullam
                eum eaque, similique non omnis tempora quos pariatur magni
                delectus dolorem voluptatem quasi animi, modi provident ab nisi
                eveniet. Veniam.
                <div className=" card-footer ">
                  <a href="#">View Related Documents</a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-2 ">
          <div className="col-md-9">
            <div className="card">
              <div className="card-body">
                <div className=" card-header d-flex ">
                  <h4>Project Name3</h4>
                  <a
                    href="#"
                    className="ms-auto mt-1 btn btn-outline-secondary "
                  >
                    <i className="fa-solid fa-check-double"></i>Accept
                  </a>
                  <a
                    href="#"
                    className="ms-auto mt-1 btn btn-outline-secondary "
                  >
                    <i className="fa-solid fa-rectangle-xmark text-danger"></i>
                    Reject
                  </a>
                </div>
                Consectetur, ducimus, nihil recusandae dolor nulla ullam ut
                sequi quidem corporis asperiores provident modi quod, est iusto
                distinctio necessitatibus animi reprehenderit sed maxime libero!
                Illum ex repellat itaque laudantium facilis! Et, unde.
                Asperiores repellendus sit nesciunt quisquam possimus ex ullam
                eum eaque, similique non omnis tempora quos pariatur magni
                delectus dolorem voluptatem quasi animi, modi provident ab nisi
                eveniet. Veniam.
                <div className=" card-footer ">
                  <a href="#">View Related Documents</a>
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default NewIdeaRequest;
