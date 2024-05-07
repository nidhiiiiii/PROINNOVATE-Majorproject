
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import AxiosAPI from '../../AxiosAPI';
import { toast } from 'react-toastify';

const CreateGroup = () => {
    const [showIdeaForm, setShowIdeaForm]=useState(true);
    const handleshowIdeaForm=()=>{
        setShowIdeaForm(!showIdeaForm)
    }
    const project=JSON.parse(localStorage.getItem("project"))
    const {register:registerGroup, handleSubmit:handleSubmitGroup}=useForm();
    const user=JSON.parse(localStorage.getItem("user"))
    const submitAddGroup=async(data)=>{
      data.members=user;
      data.studentId=user.Id;
      data.projectId=project.id;
      try {
        const response=await AxiosAPI.post(`groups`, data);
        console.log(response, "jjhsf");
        toast.success(response?.data.msg);
        handleshowIdeaForm();
      } catch (error) {
        toast("error occured")
        console.log(error);
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
                  <h4 className=" ">Create Group</h4>
                  <form className="signin-form " onSubmit={handleSubmitGroup(submitAddGroup)}>
                    <div className="row">
                     <div className="col-md-4">
                     <label className="form-label ">Group Name</label>
                     </div>
                      <div className="col-md-8">
                      <input type="text" className="form-control" placeholder='Provide Group Name as a project Name' defaultValue={project.projectName}
                      {...registerGroup("ProjectName")}
                      />
                      </div>
                    </div>
                    {/* <div className="signin-form">
                      <label className="my-label ">Email</label>
                      <input type="email" className=" my-input" />
                    </div> */}
                     <div className="row mt-2">
                     <div className="col-md-4  ">
                     <label className="form-label ">Group Description</label>
                     </div>
                      <div className="col-md-8 ">
                      <textarea type="text" className="form-control" defaultValue={project.projectDescription}
                       {...registerGroup("projectDescription")} />
                      </div>
                    </div>
                   
                  
                    <div>
                      <button className="my-button mt-2 ">Create</button>
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

export default CreateGroup