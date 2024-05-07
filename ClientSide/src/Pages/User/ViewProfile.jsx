import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import AxiosAPI from "../../AxiosAPI";
import { useNavigate } from "react-router-dom";

const ViewProfile = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [showUpdate, setShowUpdate]=useState(true);
  const [showModal, setShowModal] = useState(false);
  const [signUpModal, setSignUpModal] = useState(false);
  const toggleSignUpModal = () => {
    setSignUpModal(!signUpModal);
    setShowModal(false);
  };
  const { register: registerUpdate, handleSubmit: handleUpdateStudent, setValue } =
  useForm();
  const [image, setImage] = useState();
  const navigateTo=useNavigate()
  const handleImage = (e) => {
    setImage(e.target.files[0]);
    const file = e.target.files[0];
    if (file) {
      const fileSizeInMB = file.size / (1024 * 1024); // Convert bytes to MB
      if (fileSizeInMB > 1) {
        toast('File size exceeds 1MB limit. Please choose a smaller file.');
        e.target.value = null;
      } else {
        console.log('File size is within the limit.');
      }
    }
  }
  useEffect(()=>{
    for(let [key, value] of Object.entries(user)){
        setValue(key, value)
    }
  }, [])
  const submitStudent = async (data) => {
    const formDta = new FormData();
    for (let [key, value] of Object.entries(data)) {
      formDta.append(key, value);
    }
    formDta.append("image", image);
    try {
      const result = await AxiosAPI.put(`student/update/${user.id}`, formDta);
      console.log(result, "update success");
      setSignUpModal(!signUpModal);
      setShowUpdate(false);
      toast.success("Updated");
      localStorage.removeItem("user");
      navigateTo("/")
    } catch (error) {
      toast.error("error occured");
      console.log(error, "update error");
    }
  };
  return (
    <div>
      {showUpdate?<div className="container ms-5 ">
        <div className="row">
          <div className="col-6">
            <div className="card" style={{ width: "25rem" }}>
              <div className="card-header d-flex justify-content-center ">
                <img
                  src={`${user.image}`}
                  alt=""
                  style={{ width: "250px", height: "200px" }}
                />
              </div>
              <div className="card-body">
                <h3>{user.name}</h3>
                <h5 className="text-muted">College: {user.college}</h5>
                <h5 className="text-muted">Mobile:- {user.mobileNumber}</h5>
                <h5 className="text-muted">Email: {user.email}</h5>
                <h5 className="text-muted">Address: {user.address}</h5>
              </div>
              <div className="card-footer d-flex justify-content-center ">
                <button className="my-button "onClick={()=>setShowUpdate(false)}>Update</button>
              </div>
            </div>
          </div>
        </div>
      </div>:
       <div className="mymodal ">
       <div className="mymodal-content">
         {/* Close button */}
         <span className="close-modal" onClick={()=>setShowUpdate(true)}>
           &times;
         </span>
         {/* Modal content */}
         <div>
           <div className="">
             <div className="my-box grad-color">
               <h4 className=" ">Update Profile</h4>
               <form
                 className="signin-form "
                 onSubmit={handleUpdateStudent(submitStudent)}
               >
                  <div className="row mt-2">
                      <div className="col-md-4  ">
                        <label className="form-label ">Name</label>
                      </div>
                      <div className="col-md-5 ">
                        <input
                          type="text"
                          className="form-control"
                          {...registerUpdate("name")}
                        />
                      </div>
                    </div>
                    {/* <div className="signin-form">
                      <label className="my-label ">Name</label>
                      <input
                        type="text"
                        className=" my-input"
                        {...registerUpdate("name")}
                      />
                    </div> */}
                    <div className="row mt-2">
                      <div className="col-md-4  ">
                        <label className="form-label ">Email</label>
                      </div>
                      <div className="col-md-5 ">
                        <input
                          type="email"
                          className="form-control"
                          {...registerUpdate("email")}
                        />
                      </div>
                    </div>
                    {/* <div className="signin-form">
                      <label className="my-label ">Email</label>
                      <input
                        type="email"
                        className=" my-input"
                        placeholder="Enter Email provided by college only"
                        {...registerUpdate("email")}
                      />
                    </div> */}
                    <div className="row mt-2">
                      <div className="col-md-4  ">
                        <label className="form-label ">Mobile Number</label>
                      </div>
                      <div className="col-md-5 ">
                        <input
                          type="text"
                          className="form-control"
                          {...registerUpdate("mobileNumber")}
                        />
                      </div>
                    </div>
                    {/* <div className="signin-form">
                      <label className="my-label ">Mobile</label>
                      <input
                        type="text"
                        className=" my-input"
                        {...registerUpdate("mobileNumber")}
                      />
                    </div>{" "} */}
                    <div className="row mt-2">
                      <div className="col-md-4  ">
                        <label className="form-label ">College</label>
                      </div>
                      <div className="col-md-5 ">
                        <input
                          type="text"
                          className="form-control"
                          {...registerUpdate("college")}
                        />
                      </div>
                    </div>
                    {/* <div className="signin-form">
                      <label className="my-label ">College</label>
                      <input
                        type="text"
                        className=" my-input"
                        {...registerUpdate("college")}
                      />
                    </div>{" "} */}
                    <div className="row mt-2">
                      <div className="col-md-4  ">
                        <label className="form-label ">Address</label>
                      </div>
                      <div className="col-md-5 ">
                        <input
                          type="text"
                          className="form-control"
                          {...registerUpdate("address")}
                        />
                      </div>
                    </div>
                    {/* <div className="signin-form">
                      <label className=" text-area-label">Address</label>
                      <textarea
                        className="text-area"
                        cols={65}
                        {...registerUpdate("address")}
                      />
                    </div> */}
                    <div className="row mt-2">
                      <div className="col-md-4  ">
                        <label className="form-label ">Password</label>
                      </div>
                      <div className="col-md-5 ">
                        <input
                          type="password"
                          className="form-control"
                          {...registerUpdate("password")}
                        />
                      </div>
                    </div>
                    {/* <div className="signin-form">
                      <label className="">Password</label>
                      <input
                        type="password"
                        className="my-input"
                        {...registerUpdate("password")}
                      />
                    </div> */}
                    <div className="row mt-2">
                      <div className="col-md-4  ">
                        <label className="form-label ">Photo</label>
                      </div>
                      <div className="col-md-5 ">
                        <input
                          type="file"
                          className="form-control"
                          onChange={handleImage}
                        />
                      </div>
                    </div>
                    {/* <div className="signin-form">
                      <label className="my-file-label">Photo</label>
                      <input
                        type="file"
                        className=" my-file-input "
                        onChange={handleImage}
                        required
                      />
                    </div> */}
                    <div>
                   <button className="my-button" type="submit">
                     Update
                   </button>
                 </div>
               </form>
             </div>
           </div>
         </div>
       </div>
     </div>
      }
    </div>
  );
};

export default ViewProfile;
