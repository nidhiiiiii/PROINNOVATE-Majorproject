import React, { useEffect, useState } from "react";
import AxiosAPI, { url } from "../../AxiosAPI";
import CreateGroup from "./CreateGroup";
import { toast } from "react-toastify";

const ViewMyIdeas = () => {
  const [isLiked, setIsLiked] = useState(false);
const [showCreateGroup, setShowCreateGroup]=useState();
  const handleLikeClick = () => {
    setIsLiked(!isLiked); // Toggle the like state
  }; 
  const [projects, setProjects]=useState()
const user=JSON.parse(localStorage.getItem('user'))
  const getAllProjects=async()=>{
    const response= await AxiosAPI.get(`projects/project/${user.id}`);
    console.log(response ,"all projects");
    setProjects(response.data.Projects)
    setShowCreateGroup(response.data.Projects)
  }
  useEffect(()=>{
    getAllProjects();
  }, [])
  const handleCreateGroup=async(item)=>{
    const project=JSON.stringify(item);
    localStorage.setItem("project", project)
    //setShowCreateGroup(!showCreateGroup)
    try {
      const response=await AxiosAPI.post(`groups/create`, {studentId:user.id, projectId:item.id});
      console.log(response, "created group");
      toast.success("Group Created...!");
      
    } catch (error) {
      toast("error occured, Group already exist")
      console.log(error);
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
console.log(projects?.length, "proje lenght")
  return (
    <div>
      {projects?.length!=0?<div className="container">
      {projects?projects.map((item)=>(<div className="row mt-2 "  key={item.id}>
      { item.valid&& <div className="col-md-9">
          <div className="card">
             <div className=" card-header d-flex ">
                <h4>{item.projectName}</h4>
                {item.valid==="ACCEPTED"?<a
                  href="#"
                  className="ms-auto mt-1 btn btn-outline-secondary "
                  onClick={()=>handleCreateGroup(item)}
                >
                  <i className="fa-solid fa-users"></i>Create Group
                </a>: <a
                    href="#"
                    className="ms-auto mt-1 btn btn-outline-secondary disabled"
                    disabled
                  >
                    <i className="fa-solid fa-check-double"></i>{item.valid}
                  </a>}
              </div>
            <div className="card-body" style={{minHeight:"130px"}}>
             
           
            <p className=" text-warning ">Category: {item.category}</p>
            <p className=" text-warning ">Department: {item.departments}</p>
              <p className=" text-warning ">Achievements:{item.achievements}</p>
              {item.projectDescription}
            </div>
            <div className=" card-footer">
                <a href="#"
                onClick={()=>relatedDocsDownload(item.projectName)}
                >View Related Documents</a>{" "}
                {/* <i
                  className={`fa-regular fa-thumbs-up fs-2  margin-left ${
                    isLiked ? "text-primary fa-solid" : ""
                  }`}
                  onClick={handleLikeClick}
                ></i>
                {isLiked ? "Upvoted"  : "Upvote"}
                <i> &nbsp; &nbsp; 5 Upvoted</i> */}
              </div>
          </div>
        </div>}
      </div>)):<div className="alert alert-warning ">Oops you didn't Added any Idea</div>}
      
      </div>:<div className="alert alert-warning ">Oops you havent come up with any ideas🥲!</div>}
    </div>
  );
};

export default ViewMyIdeas;
