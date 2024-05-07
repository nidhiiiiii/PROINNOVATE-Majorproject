import React, { useEffect, useState } from "react";
import AxiosAPI, { url } from "../../AxiosAPI";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const ViewAllIdeas = () => {
  const [isLiked, setIsLiked] = useState(false);
const [loading, setLoading]=useState(false);
  const handleLikeClick = () => {
    setIsLiked(!isLiked); // Toggle the like state
  };
  const [projects, setProjects] = useState();

  const getAllProjects = async () => {
    const response = await AxiosAPI.get(`projects`);
    console.log(response.data, "all projects");
    setProjects(response.data);
  };
  useEffect(() => {
    getAllProjects();
  }, []);
  const getAllGroups=async()=>{
    setLoading(true)
    try {
      const results=await AxiosAPI.get("groups");
      console.log(results.data.Groups , 'all groups to show in projects');
     // setProjects(results.data.Groups)
    } catch (error) {
      console.log(error , "all groups");
    }
    finally{
setLoading(false)
    }
   }
   
   useEffect(()=>{
    getAllGroups()
   },[])
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
const user= JSON.parse(localStorage.getItem("user"));
//   const handleLike = async (id) => {
//     const like=localStorage.getItem(`liked_${id}_${user.id}`);
//   if(!like) { try {
//       // Update UI optimistically
//       setLiked(!isLiked);
//       setLikeCount((prevCount) => (isLiked ? prevCount - 1 : prevCount + 1));

//       // Send data to backend
//      const response= await AxiosAPI.put(`groups/student/like/${id}`); 
//      localStorage.setItem(`liked_${id}_${user.id}`, 'true');
//      getAllGroups()
// console.log(response , "like  respo");
//     } catch (error) {
//       // Handle error, revert UI changes if necessary
//       console.error("Error while updating like:", error);
//       setLiked(liked); // Revert back to the previous state
//       setLikeCount((prevCount) => (isLiked ? prevCount + 1 : prevCount - 1)); // Revert like count
//     }
//   };}
const handleLike = async (id,projectId) => {
  const like = localStorage.getItem(`liked_${id}_${user.id}`);
  if (!like) {
    try {
      // Update UI optimistically
      setLiked(!isLiked);
      setLikeCount((prevCount) => (isLiked ? prevCount - 1 : prevCount + 1));

      // Send data to backend
      const response = await AxiosAPI.put(`groups/like/${id}/${projectId}`);
      localStorage.setItem(`liked_${id}_${user.id}`, 'true');
      getAllProjects();
      console.log(response, "my respo");
    } catch (error) {
      // Handle error, revert UI changes if necessary
      console.error("Error while updating like:", error);
      setLiked(liked); // Revert back to the previous state
      setLikeCount((prevCount) => (isLiked ? prevCount + 1 : prevCount - 1)); // Revert like count
    }
  }
};
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

  const joinGroups=async(groupId)=>{
    try {
      const response=await AxiosAPI.post(`groups/${groupId}/join/${user.id}`);
      console.log(response , "joined");
      toast("Joined")
    } catch (error) {
      toast.error("could not join , already joined")
      console.log(error);
    }
  }
  return (
    <div>
      <div className="container">
      {loading&&<i className=" spinner-border text-primary mt-3"></i>}
        {projects &&
          projects.map((item) => (
            <div className="row mt-2 " key={item.id}>
            {item?.valid==="ACCEPTED"&&  <div className="col-md-9">
                <div className="card">
                  <div className=" card-header d-flex ">
                    <h4>{item.projectName}</h4>
                    { item.group&&<a
                          href="#"
                          className="ms-auto mt-1 btn btn-outline-secondary "
                          onClick={() => joinGroups(item.group?.id)}
                        >
                          <i className="fa-solid fa-users"></i>Join Group
                        </a>}
                  </div>
                  <div className="card-body" style={{ minHeight: "130px" }}>
                    <p className=" text-warning ">Category: {item.category}</p>
                    <p className=" text-warning ">
                      Department: {item.departments}
                    </p>
                    <p className=" text-warning ">
                      Achievements:{item.achievements}
                    </p>
                    {item.projectDescription}
                  </div>
                  <div className=" card-footer d-flex ">
                    <Link onClick={() => relatedDocsDownload(item.projectName)}>
                      View Related Documents
                    </Link>{" "}
                    {item?.group&&(<div> <i
                          className={`fa-regular fa-thumbs-up fs-2  margin-left ${
                            localStorage.getItem(`liked_${item.group.id}_${user.id}`)
                              ? "text-primary fa-solid disabled"
                              : ""
                          }`}
                          onClick={() => handleLike(item.group.id, item.id)}
                          disabled={localStorage.getItem(
                            `liked_${item.group.id}_${user.id}`
                          )}
                        ></i>
                        {localStorage.getItem(`liked_${item.group.id}_${user.id}`)
                          ? "Upvoted"
                          : "Upvote"}
                        <i> &nbsp; &nbsp; {item.group?.likes} Upvoted</i></div> )}
                  </div>
                </div>
              </div>}
            </div>
          ))}
        {/* <div className="row mt-2 ">
          <div className="col-md-9">
            <div className="card">
               <div className=" card-header d-flex ">
                  <h4>Project Name2</h4>
                  <a
                    href="#"
                    className="ms-auto mt-1 btn btn-outline-secondary "
                  >
                    <i className="fa-solid fa-users"></i>Join Group
                  </a>
                </div>
              <div className="card-body">
               
                Consectetur, ducimus, nihil recusandae dolor nulla ullam ut
                sequi quidem corporis asperiores provident modi quod, est iusto
                distinctio necessitatibus animi reprehenderit sed maxime libero!
                Illum ex repellat itaque laudantium facilis! Et, unde.
                Asperiores repellendus sit nesciunt quisquam possimus ex ullam
                eum eaque, similique non omnis tempora quos pariatur magni
                delectus dolorem voluptatem quasi animi, modi provident ab nisi
                eveniet. Veniam.
               
              </div>
               <div className=" card-footer ">
                  <a href="#">View Related Documents</a>
                  <i
                    className={`fa-regular fa-thumbs-up fs-1  margin-left ${
                      isLiked ? "text-primary fa-solid" : ""
                    }`}
                    onClick={handleLikeClick}
                  ></i>
                  {isLiked ? "Upvoted"  : "Upvote"}
                 <i> &nbsp; &nbsp; 5 Upvoted</i>
                 
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
                    <i className="fa-solid fa-users"></i>Join Group
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
                  <i
                    className={`fa-regular fa-thumbs-up fs-1  margin-left ${
                      isLiked ? "text-primary fa-solid" : ""
                    }`}
                    onClick={handleLikeClick}
                  ></i>
                  {isLiked ? "Upvoted"  : "Upvote"}
                 <i> &nbsp; &nbsp; 5 Upvoted</i>
                 
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default ViewAllIdeas;
