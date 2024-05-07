import React, { useState } from 'react'
import {useForm} from "react-hook-form"
import AxiosAPI from '../../AxiosAPI';
import { toast } from 'react-toastify';
const RaiseQueries = () => {
    const [showIdeaForm, setShowIdeaForm]=useState(true);
    const [loading, setLoading]=useState(false);
    const handleshowIdeaForm=()=>{
        setShowIdeaForm(!showIdeaForm)
    }
    const {register:registerQuery, handleSubmit:handleSubmitQuery}=useForm();
    const submitQuery=async(data)=>{
      setLoading(true)
try {
  const results=await AxiosAPI.post(`query`, data);
  toast.success(results?.data.msg)
  console.log(results);
  handleshowIdeaForm()
} catch (error) {
  console.log(error);
}finally{
  setLoading(false);
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
                  <h4 className=" ">Raise Query</h4>
                  <form className="signin-form " onSubmit={handleSubmitQuery(submitQuery)}>
                    <div className="row">
                     <div className="col-md-4">
                     <label className="form-label ">Email</label>
                     </div>
                      <div className="col-md-8">
                      <input type="text" className="form-control" {...registerQuery("email")}/>
                      </div>
                    </div>
                    {/* <div className="signin-form">
                      <label className="my-label ">Email</label>
                      <input type="email" className=" my-input" />
                    </div> */}
                     <div className="row mt-2">
                     <div className="col-md-4  ">
                     <label className="form-label ">Your Query</label>
                     </div>
                      <div className="col-md-8 ">
                      <textarea type="text" className="form-control" {...registerQuery("query")} />
                      </div>
                    </div>
                   
                    {/* <div className="row mt-2">
                     <div className="col-md-4  ">
                     <label className="form-label ">Achievments</label>
                     </div>
                      <div className="col-md-8 ">
                      <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="row mt-2">
                     <div className="col-md-4  ">
                     <label className="form-label ">Department</label>
                     </div>
                      <div className="col-md-8 ">
                      <input type="text" className="form-control" />
                      </div>
                    </div>
                   
                    <div className="row mt-2">
                     <div className="col-md-4  ">
                     <label className="form-label ">Category</label>
                     </div>
                      <div className="col-md-8 ">
                     <select className='form-select'>
                      <option value="">Select</option>
                      <option value="">Software</option>
                      <option value="">Hardware</option>
                      <option value="">Both</option>
                     </select>
                      </div>
                    </div>
                    <div className="row mt-2">
                     <div className="col-md-4  ">
                     <label className="form-label ">Mobile Number</label>
                     </div>
                      <div className="col-md-8 ">
                      <input type="number" className="form-control" />
                      </div>
                    </div>
                    <div className="row mt-2">
                     <div className="col-md-4  ">
                     <label className="form-label ">Related Documents</label>
                     </div>
                      <div className="col-md-8 ">
                      <input type="file" className="form-control" />
                      </div>
                    </div> */}
                    {loading&&<i className=" spinner-border text-primary mt-3"></i>}

                    <div>
                      <button className="my-button mt-2 ">Submit</button>
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

export default RaiseQueries