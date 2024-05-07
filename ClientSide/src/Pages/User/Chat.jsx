import React from "react";
import { useRef } from "react";
import AxiosAPI, { url } from "../../AxiosAPI";
import { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";

const Chat = () => {
  const fileInputRef = useRef(null);
  const [file, setFile] = useState();
  const [allGroups, setAllGroups] = useState();
  const [message, setMessage] = useState();
  const [groupId, setGroupId] = useState();
  const [members, setMembers] = useState();
  const [activeGroup, setActiveGroup] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const [text, setText] = useState();
  const handleText=(text)=>{
    setText(text);
  }
  const handleAttachClick = (event) => {
    // Trigger the click event of the file input element
    fileInputRef.current.click();
    console.log(event.target.files[0], "files");
    setFile(event.target.files[0]);
  };
  const getAllGroups = async () => {
    try {
      const results = await AxiosAPI.get(`groups/members/${user.id}`);
      console.log(results, "getting groups with user Id");
      setAllGroups(results.data.Group);
    } catch (error) {
      console.log(error, "all groups");
    }
  };

  useEffect(() => {
    getAllGroups();
  }, []);
  const getMessages = async () => {
    try {
      const response = await AxiosAPI.get(`/api/chat/get/groupId/${groupId}`);
      console.log(response, "get messages in group");
      setMessage(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getMessages();
  }, []);
  function formatDate(dateString) {
    const options = {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    };
    {
      /* <small className=" ms-lg-5 ">{formatDate(item.date)}</small> */
    }

    const formattedDate = new Date(dateString).toLocaleString("en-US", options);
    return formattedDate;
  }
  
  const openGroups =async (id) => {
    setGroupId(id);
    setActiveGroup(true);
try {
  const response = await AxiosAPI.get(`/api/chat/get/groupId/${id}`);
  setMessage(response.data);

} catch (error) {
  
}
  };
  const getGroupsById = async () => {
    try {
      const respo = await AxiosAPI.get(`groups/${groupId}`);
      console.log(respo?.data, "groups by Id");
      const membersss = respo.data.Group.members?.map((item) => item.id);
      setMembers(membersss);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
   // getGroupsById();
  }, [groupId]);
  const sendMessage = async () => {
    setText('');
    const formData = new FormData();
    formData.append("message", text);
    formData.append("sender", user.id);
    formData.append("receiver", members);
    formData.append("groupId", groupId);
    file && formData.append("data", file);

    // data.message=text;
    // data.sender=user.id;
    // data.reciever=groupId;
    // data.groupId=groupId;
   if(text){ try {
      const result = await AxiosAPI.post(
        `api/chat/send?groupId=${groupId}&sender=${user.id}&receiver=${members}&message=${text}`
      );
      
      // console.log(result, "send message");
      // file &&
      //   (await AxiosAPI.post(`api/chat/upload`, formData).then((respo) => {
      //     console.log(respo, "file upload");
      //   }));
      getMessages()
      
if(file){
 const result= await AxiosAPI.post(`api/chat/upload`, formData);
 setFile("")
console.log(result ,"file upload");
getMessages()
}
else
console.log("no file to upload");
    } catch (error) {
      console.log(error, "file not uploaded");
    }
  }
else
alert("message is mandatory")
}
  const downloadFile=async(message)=>{
try {
 // const result=await AxiosAPI.get(`api/chat/download/${message}`)
  //console.log(result, "files downlaod");
  
  window.open(
    `${url}api/chat/download/${message}`,
    "_blank"
  );
  // window.open(
  //   `http://192.168.1.246:8080/projects/download/${filename}`,
  //   "_blank"
  // );
} catch (error) {
  //toast("error occured")
  console.log(error);
}
  }
  return (
    <div>
      <div className="container py-5 px-4 card" style={{ minHeight: "350px" }}>
        <header></header>
        <div className="row rounded-lg overflow-hidden shadow ">
          {/* Groups box*/}
          <div className="col-5 px-0">
            <div className="bg-white">
              {/* <div className="bg-gray px-4 py-2 bg-light">
                <p className="h5 mb-0 py-1">Recent</p>
              </div> */}
              <div className="messages-box">
                <div className="list-group rounded-0">
                  {allGroups ?
                    allGroups.map((item) => (
                      <a
                        className={`list-group-item list-group-item-action  rounded-0 ${
                          activeGroup &&
                          groupId === item.id &&
                          " active text-white"
                        }`}
                        key={item.id}
                        onClick={() => openGroups(item.id)}
                      >
                        {/* active text-white*/}
                        <div className="media">
                          <img
                            src="/users1.png"
                            alt="user"
                            width={50}
                            className="rounded-circle"
                          />
                          <div className="media-body ml-4">
                            <div className="d-flex align-items-center justify-content-between mb-1">
                              <h6 className="mb-0">{item.projectName}</h6>
                              {/* <small className="small font-weight-bold">25 Dec</small> */}
                            </div>
                            <p className="font-italic mb-0 text-small">
                              {item.projectDescription}
                            </p>
                          </div>
                        </div>
                      </a>
                    )):
                    <div className="alert alert-warning text-dark ">Ohhh, You didn't joined any group!</div>
                    }
              
                </div>
              </div>
            </div>
          </div>
          {/* Chat Box*/}
          <div className="col-7 px-0" style={{minHeight:"100px"}}>
            {message&&message.map((item)=>(<div className="px-4 py-1 chat-box bg-white">
              {/* Sender Message*/}
              {item.sender===user.id?(
              <div className="media w-50 ml-auto ">
              <div className="media-body">
                <div className="bg-primary rounded py-2 px-3 mb-2">
                  <p className="text-small mb-0 text-white">
                   {item.message}
                  </p>
                  {item.filename&& <button onClick={()=>downloadFile(item.filename)} className="fa-regular fa-circle-down fs-2 rounded btn"></button>}

                </div>
                {/* <p className="small text-muted">12:00 PM | Aug 13</p> */}
              </div>
            </div>
              ):
              // reciever messages
               <div className="media w-50 p-0 ">
                <img
                  src="https://bootstrapious.com/i/snippets/sn-chat/avatar.svg"
                  alt="user"
                  width={50}
                  className="rounded-circle"
                />
                {item.senderName}
                <div className="media-body ml-3">
                  <div className="bg-light rounded py-2 px-3 mb-2">
                    <p className="text-small mb-0 text-muted">
                      {item?.message}
                    </p>
                   
                    {item.filename&& <button onClick={()=>downloadFile(item.filename)} className="fa-regular fa-circle-down fs-2 rounded btn"></button>}
                  </div>
                  {/* <p className="small text-muted">12:00 PM | Aug 13</p> */}
                </div>
              </div>
              
              }
              {/* Reciever Message*/}
             
              {/* <div className="media w-50 mb-3">
                <img
                  src="https://bootstrapious.com/i/snippets/sn-chat/avatar.svg"
                  alt="user"
                  width={50}
                  className="rounded-circle"
                />
                Vinay
                <div className="media-body ml-3">
                  <div className="bg-light rounded py-2 px-3 mb-2">
                    <p className="text-small mb-0 text-muted">
                      Test which is a new approach all solutions
                    </p>
                  </div>
                  <p className="small text-muted">12:00 PM | Aug 13</p>
                </div>
              </div> */}
              {/* Reciever Message
        <div className="media w-50 ml-auto mb-3">
          <div className="media-body">
            <div className="bg-primary rounded py-2 px-3 mb-2">
              <p className="text-small mb-0 text-white">
                Test which is a new approach to have all solutions
              </p>
            </div>
            <p className="small text-muted">12:00 PM | Aug 13</p>
          </div>
        </div>*/}
              {/* Sender Message
        <div className="media w-50 mb-3">
          <img
            src="https://bootstrapious.com/i/snippets/sn-chat/avatar.svg"
            alt="user"
            width={50}
            className="rounded-circle"
          />
          Ram
          <div className="media-body ml-3">
            <div className="bg-light rounded py-2 px-3 mb-2">
              <p className="text-small mb-0 text-muted">
                Test, which is a new approach to have
              </p>
            </div>
            <p className="small text-muted">12:00 PM | Aug 13</p>
          </div>
        </div>*/}
              {/* Reciever Message
        <div className="media w-50 ml-auto mb-3">
          <div className="media-body">
            <div className="bg-primary rounded py-2 px-3 mb-2">
              <p className="text-small mb-0 text-white">
                Apollo University, Delhi, India Test
              </p>
            </div>
            <p className="small text-muted">12:00 PM | Aug 13</p>
          </div>
        </div>*/}
              {/* Sender Message*
        <div className="media w-50 mb-3">
          <img
            src="https://bootstrapious.com/i/snippets/sn-chat/avatar.svg"
            alt="user"
            width={50}
            className="rounded-circle"
          />
          Ram
          <div className="media-body ml-3">
            <div className="bg-light rounded py-2 px-3 mb-2">
              <p className="text-small mb-0 text-muted">
                Test, which is a new approach
              </p>
            </div>
            <p className="small text-muted">12:00 PM | Aug 13</p>
          </div>
        </div>/}
        {/* Reciever Message
        <div className="media w-50 ml-auto mb-3">
          <div className="media-body">
            <div className="bg-primary rounded py-2 px-3 mb-2">
              <p className="text-small mb-0 text-white">
                Apollo University, Delhi, India Test
              </p>
            </div>
            <p className="small text-muted">12:00 PM | Aug 13</p>
          </div>
        </div>*/}
            </div>))}
            {/* Typing box */}
           {activeGroup && <form className="bg-light mt-5 " encType="multipart/file" >
              <div className="input-group">
                <input
                  type="text"
                  placeholder="Type a message"
                  aria-describedby="button-addon2"
                  value={text}
                  className="form-control rounded-0 border-0 py-4 mb-2  bg-light"
                  onChange={(e) => handleText(e.target.value)}
                />

                <button
                  className="fa-solid fa-paperclip mb-1"
                  type="button"
                  onClick={handleAttachClick}
                  
                >
                  <input
                    type="file"
                    style={{ display: "none" }}
                    ref={fileInputRef}
                    
                  />
                </button>
                <div className="input-group-append">
                  <button
                    id="button-addon2"
                    type="button"
                    className="btn btn-link"
                    onClick={sendMessage}
                  >
                    <i className="fa fa-paper-plane fs-3 py-3" />
                  </button>
                </div>
              </div>
            </form>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
