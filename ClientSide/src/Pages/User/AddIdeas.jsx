import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import AxiosAPI from '../../AxiosAPI';
import { toast } from 'react-toastify';

const AddIdeas = () => {
    const [showIdeaForm, setShowIdeaForm]=useState(true);
    const handleshowIdeaForm=()=>{
        setShowIdeaForm(!showIdeaForm)
    }
    const {register:registerIdea, handleSubmit:handleSubmitIdea}=useForm();
    const user=JSON.parse(localStorage.getItem("user"))
    const [file, setFile]=useState();

    const handleFile=(e)=>setFile(e.target.files[0]);
  const [loading, setLoading]=useState(false);

    const submitIdea=async(data)=>{
      setLoading(true)
      const formData=new FormData();
      for(let[key, value] of Object.entries(data)){
        formData.append(key, value)
      }
      formData.append("file", file)
      formData.append("userId", user.id)
      try {
       const results= await AxiosAPI.post("projects/upload", formData);
       console.log(results, "add project");
       toast.success(results.data.msg)
       setShowIdeaForm(!showIdeaForm)
      } catch (error) {
        console.log(error , "add Idea error");
        toast.error(error?.response?.data?.error)
      }finally{
        setLoading(false)
      }
    }
  return (
    <div className='grad-color'>
        {showIdeaForm&& <div className="mymodal ">
          <div className="mymodal-content">
            {/* Close button */}
            <span className="close-modal" onClick={handleshowIdeaForm}>
              &times;
            </span>
            {/* Modal content */}
            <div>
              <div className="container">
                <div className="my-box grad-color row ">
                  <h4 className=" ">Share Your Idea</h4>
                  <form className="signin-form " onSubmit={handleSubmitIdea(submitIdea)}>
                    <div className="row">
                     <div className="col-md-4">
                     <label className="form-label ">Project Name</label>
                     </div>
                      <div className="col-md-8">
                      <input type="text" className="form-control" {...registerIdea("projectName")} />
                      </div>
                    </div>
                    {/* <div className="signin-form">
                      <label className="my-label ">Email</label>
                      <input type="email" className=" my-input" />
                    </div> */}
                     <div className="row mt-2">
                     <div className="col-md-4  ">
                     <label className="form-label ">Project Description</label>
                     </div>
                      <div className="col-md-8 ">
                      <textarea type="text" className="form-control" {...registerIdea("projectDescription")} />
                      </div>
                    </div>
                   
                    <div className="row mt-2">
                     <div className="col-md-4  ">
                     <label className="form-label ">Achievments</label>
                     </div>
                      <div className="col-md-8 ">
                      <input type="text" className="form-control"  {...registerIdea("achievements")}/>
                      </div>
                    </div>
                    <div className="row mt-2">
                     <div className="col-md-4  ">
                     <label className="form-label ">Department</label>
                     </div>
                      <div className="col-md-8 ">
                      <select type="text" className="form-control" {...registerIdea("departments")} >
                        <option value="">Select</option>
                        <option value="CSE">CSE</option>
                        <option value="IT">IT</option>
                        <option value="ECE">ECE</option>
                        <option value="EE">EE</option>
                        <option value="MECH">MECH</option>
                        <option value="CIVIL">CIVIL</option>
                      </select>
                      </div>
                    </div>
                   
                    <div className="row mt-2">
                     <div className="col-md-4  ">
                     <label className="form-label ">Category</label>
                     </div>
                      <div className="col-md-8 ">
                     <select className='form-select' {...registerIdea("category")}>
                      <option value="">Select</option>
                      <option value="Software">Software</option>
                      <option value="Hardware">Hardware</option>
                      <option value="both">Both</option>
                     </select>
                      </div>
                    </div>
                    <div className="row mt-2">
                     <div className="col-md-4  ">
                     <label className="form-label ">Mobile Number</label>
                     </div>
                      <div className="col-md-8 ">
                      <input type="number" className="form-control" {...registerIdea("mobileNumber")}/>
                      </div>
                    </div>
                    <div className="row mt-2">
                     <div className="col-md-4  ">
                     <label className="form-label ">Related Documents</label>
                     </div>
                      <div className="col-md-8 ">
                      <input type="file" className="form-control"onChange={handleFile}/>
                      </div>
                    </div>
                    {loading&&<i className=" spinner-border text-primary mt-3"></i>}
                    <div>
                      <button className="my-button mt-2 " type='submit'>Submit</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>}
    </div>
  )
}

export default AddIdeas