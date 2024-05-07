import React, { useEffect, useState } from "react";
import ViewAllIdeas from "../User/ViewAllIdeas";
import NewIdeaRequest from "./NewIdeaRequest";
import ViewAllIdeasAdmin from "./ViewAllIdeasAdmin";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ViewQueries from "./ViewQuerries";
import AxiosAPI from "../../AxiosAPI";

const AdminNav = () => {
  const [sidebarActive, setSidebarActive] = useState(false);
  const [showComponent, setShowComponent] = useState("home");
  const [rightSideBar, setRightBar] = useState(false);
const admin=localStorage.getItem("admin")
if(!admin){
  alert("Login first");
}
  const toggleSidebar = () => {
    setSidebarActive(!sidebarActive);
  };

  const rightToggleBar = () => {
    setRightBar(!rightSideBar);
  };

  const renderComponent = (compo) => {
    setShowComponent(compo);
  };
const navigateTo=useNavigate();
const [searchProject, setProjectSearch] = useState();
  const [projectName, setProjectName] = useState();
  const searchProjects = async () => {
    try {
      const results = await AxiosAPI.get(`projects/search?name=${projectName}`);
      console.log(results, " agssg");
      setProjectSearch(results.data);
      renderComponent("search");
    } catch (error) {
      console.log(error);
    }
  };

  const [department ,setDepartment]=useState();
  const [category ,setCategory]=useState()
  const handleDepartment=(dept)=>{setDepartment(dept);}
const handleCategory=(cat)=>{setCategory(cat)}

  const filterProjects = async () => {
   if(rightSideBar) try {
    renderComponent("search")
      const response = await AxiosAPI.get(`projects/filter/dept/cat?department=${department}&category=${category}`, );
   console.log(response ,"my filter");
   setProjectSearch(response.data.Projects)
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };
  useEffect(()=>{filterProjects()}, [category, department])

  const [projects, setProjects] = useState(0); //length
  const getAllProjects = async () => {
    const response = await AxiosAPI.get(`projects`);
    console.log(response.data, "all projects");
  
    const users=Object.entries(response.data);
    const length=users.map((item)=>item)
    console.log(length.length, "length");
    setProjects(length.length)
  };
  useEffect(() => {
    getAllProjects();
  }, []);
  const [queries, setQueries]=useState(0)
  const getQueries=async()=>{
    try {
      await AxiosAPI.get("query").then((respone)=>{
        console.log(respone, "quer");
       
        const users=Object.entries(respone.data.Queries);

        const length=users.map((item)=>item)
        console.log(length.length, "length");
        setQueries(length.length)
      })
    } catch (error) {
      console.log(error, "querries");
    }
  }
  useEffect(()=>{
    getQueries()
  }, []);
  const [users, setUsers]=useState(0)
  const getUsers=async()=>{
    try {
      await AxiosAPI.get("student").then((respone)=>{
        console.log(respone, "usersss");
        const users=Object.entries(respone.data.Students);

        const length=users.map((item)=>item)
        console.log(length.length, "length");
        setUsers(length.length)
      })
    } catch (error) {
      console.log(error, "querries");
    }
  }
  useEffect(()=>{
    getUsers()
  }, []);
  useEffect(() => {
    const counters = document.querySelectorAll('.counter-value');

    counters.forEach((counter) => {
      const duration = 3500;
      const initialValue = 0;
      const targetValue = parseInt(counter.textContent, 10);

      const updateCounter = () => {
        const startTime = Date.now();
        const update = () => {
          const currentTime = Date.now();
          const elapsedTime = currentTime - startTime;
          if (elapsedTime < duration) {
            const progress = (elapsedTime / duration) * (targetValue - initialValue);
            counter.textContent = Math.ceil(initialValue + progress);
            requestAnimationFrame(update);
          } else {
            counter.textContent = targetValue;
          }
        };
        requestAnimationFrame(update);
      };

      updateCounter();
    });
  }, [queries, projects,users]);
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
  //console.log(typeof(Object.entries(queries)) ,"projects");
  return (
    <div className="grad-color">
      {sidebarActive && (
        <div
          className={
            sidebarActive ? "vertical-nav active bg-light " : "vertical-nav"
          }
        >
          <span className="close-modal" onClick={toggleSidebar}>
            &times;
          </span>
          <div className="py-4 px-3 mb-4 bg-light">
            <div className="media d-flex align-items-center">
              <img
                src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                alt="..."
                width={65}
                className="mr-3 rounded-circle img-thumbnail shadow-sm"
              />
              <div className="media-body">
                <h4 className="m-0">Admin</h4>
              </div>
            </div>
          </div>
          <p className="text-gray font-weight-bold text-uppercase px-3 small pb-4 mb-0 bg-light">
            Main
          </p>
          <ul className="nav flex-column bg-white mb-0">
            <li className="nav-item">
              <a
                href="#"
                className="nav-link text-dark font-italic bg-light"
                onClick={() => renderComponent("home")}
              >
                <i className="fa fa-th-large mr-3 text-primary fa-fw" />
                Home
              </a>
            </li>
            <li className="nav-item">
              <a
                href="#"
                className="nav-link text-dark font-italic"
                onClick={() => renderComponent("share")}
              >
                <i className="fa fa-solid fa-group-arrows-rotate mr-3 text-primary fa-fw" />
                Latest Ideas
              </a>
            </li>
            <li className="nav-item">
              <a
                href="#"
                className="nav-link text-dark font-italic"
                onClick={() => renderComponent("explore")}
              >
                <i className="fa fa-solid fa-object-group mr-3 text-primary fa-fw" />
                Idea Forum
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link text-dark font-italic" onClick={()=>renderComponent(`query`)}>
                <i className="fa-regular fa-solid fa-circle-question text-primary fa-fw"></i>
                 Queries
              </a>
            </li>


          </ul>
          <div style={{ position: "relative", top: "30%", left: "150px" }}>
            <button className="my-button"onClick={()=>{
              localStorage.removeItem("admin");
              toast("Oops Logged out....!")
              navigateTo("/")
            }}>
              <i className="fa-solid fa-arrow-right-from-bracket fa-fw text-primary"></i>
              Logout
            </button>
          </div>
        </div>
      )}
      {rightSideBar && (
        <div
          className={
            rightSideBar ? "custom-vertical-nav active bg-light " : "custom-vertical-nav"
          }
        >
          <span className="close-modal" onClick={rightToggleBar}>
            &times;
          </span>
          <div className="py-4 px-3 mb-4 bg-light">
            <div className="media d-flex align-items-center">
              
              <div className="media-body">
                <h4 className="m-0">Filter</h4>
              </div>
            </div>
          </div>
          <p className="text-gray font-weight-bold text-uppercase px-3 small pb-4 mb-0 bg-light">
           Department
          </p>
          <ul className="nav flex-column bg-white mb-0">
            <li className="nav-item ">
              &nbsp;&nbsp;&nbsp;&nbsp;{" "}
              <input
                type="checkbox"
                name=""
                value="CSE"
                onChange={() => handleDepartment("CSE")}
                checked={department === 'CSE'}
              />{" "}
              <label>CSE</label> <br />
              &nbsp;&nbsp;&nbsp;&nbsp;{" "}
              <input
                type="checkbox"
                name=""
                value="IT"
                onChange={() => handleDepartment("IT")}
                checked={department === 'IT'}
              />{" "}
              <label>IT</label> <br />
              &nbsp;&nbsp;&nbsp;&nbsp;{" "}
              <input
                type="checkbox"
                name=""
                value="ECE"
                onChange={() => handleDepartment("ECE")}
                checked={department === 'ECE'}
              />{" "}
              <label>ECE</label> <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <input
                type="checkbox"
                name=""
                value="MECH"
                onChange={() => handleDepartment("MECH")}
                checked={department === 'MECH'}
              />{" "}
              <label>MECH</label> <br />
              &nbsp;&nbsp;&nbsp;&nbsp;{" "}
              <input
                type="checkbox"
                name=""
                value="CIVIL"
                onChange={() => handleDepartment("CIVIL")}
                checked={department === 'CIVIL'}
              />{" "}
              <label>CIVIL</label> <br />
            </li>
            <li className="nav-item">
              <p className="text-gray font-weight-bold text-uppercase px-3 small pb-4 mb-0 bg-light">
                Category
              </p>
              &nbsp;&nbsp;&nbsp;&nbsp;{" "}
              <input
                type="checkbox"
                name=""
                value="Software"
                onChange={() => handleCategory("Software")}
                checked={category === 'Software'}
              />{" "}
              <label>Software</label> <br />
              &nbsp; &nbsp;&nbsp;&nbsp;
              <input
                type="checkbox"
                name=""
                value="Hardware"
                onChange={() => handleCategory("Hardware")}
                checked={category === 'Hardware'}
              />{" "}
              <label>Hardware</label> <br />
              &nbsp;&nbsp;&nbsp;&nbsp; <input type="checkbox" name="" value="Both"
                onChange={() => handleCategory("both")}
                checked={category === 'both'}
                />{" "}
              <label>Both</label> <br />
            </li>
          </ul>
         
        </div>
      )}
      {/* <nav className="">
        <div className=" ">
          <p className="typed fs-4 text-center fst-italic">
          <span className="home-text fs-3 text-danger " href="#">
              ProInnovate <span className="text-primary fs-6 ">Engineering Inventive Warehouse for Learning</span>
              Online Integrated Platform For Projects Taken Up By the College
              Students
            </span>
          </p>
        </div>
        <div className=" d-inline ms-lg-5 ">
          <button
            onClick={toggleSidebar}
            className="btn btn-light bg-white rounded-pill shadow-sm px-4 mb-4"
          >
            <small className="text-uppercase font-weight-bold">
              {" "}
              <i className="fa fa-bars mr-2" />
              Menu
            </small>
          </button>
        </div>
        <div className=" nav-align d-inline">
          <input
            type="text"
            className="search-input"
            onChange={(e) => setProjectName(e.target.value)}
            placeholder="Search..."
          />
          <button className="fa fa-search btn search-button "   onClick={searchProjects}></button>
        </div>
        <div className="d-inline nav-align   ">
          <i className="fa-solid fa-filter fs-3" onClick={rightToggleBar}></i>
        </div>
        <div className="d-inline nav-align fs-1 "  onClick={() => renderComponent("home")}>
          <i className="fa-solid fa-handshake"></i>
        </div>
      </nav> */}
        <nav className="">
        <div className=" ">
            <img
              src="/oldlogo.png"
              alt=""
             
              style={{
                width:"150px",
                height:"60px",
                float: "left",
                mixBlendMode: "multiply",
                paddingLeft: "10px",
              }}
            />
          {/* <p className="typed fs-4 text-center fst-italic text-danger ">
            <span className="home-text fs-3 text-danger " href="#">
              ProInnovate{" "}
              <span className="text-primary fs-6 ">
                Engineering Inventive Warehouse for Learning
              </span>
              Online Integrated Platform For Projects Taken Up By the College
              Students 
            </span>
          </p>*/}
        </div>
        <div className=" d-inline ms-lg-5 ">
          <button
            onClick={toggleSidebar}
            className="btn btn-light bg-white rounded-pill shadow-sm px-4 mb-3"
          >
            <small className="text-uppercase font-weight-bold">
              {" "}
              <i className="fa fa-bars mr-2" />
              Menu
            </small>
          </button>
        </div>
        <div className=" nav-align d-inline">
          <input
            type="text"
            className="search-input"
            placeholder="Search..."
            onChange={(e) => setProjectName(e.target.value)}
          />
          <button
            className="fa fa-search btn search-button "
            onClick={searchProjects}
          ></button>
        </div>
        <div className="d-inline  fs-3 ps-lg-5  ">
          <i className="fa-solid fa-filter p-3" onClick={rightToggleBar}></i>
        </div>
        <div className="d-inline  fs-1 p-3 "  onClick={() => renderComponent("home")}>
          <i className="fa-solid fa-handshake"></i>
        </div>
      </nav>
      <div className="page-content grad-color">
        {showComponent === "home" && 
        <div className="container ">
        <div className="row">
          <div className="col-md-4 col-sm-6">
            <div className="counter">
              <span className="counter-value">{projects}</span>
              <h3>Projects Registered</h3>
              <div className="counter-icon">
                <i className="fa fa-briefcase" />
              </div>
            </div>
          </div>
          <div className="col-md-4 col-sm-6">
            <div className="counter purple">
              <span className="counter-value">{users}</span>
              <h3>Users Registered</h3>
              <div className="counter-icon">
                <i className="fa fa-user" />
              </div>
            </div>
          </div>
          <div className="col-md-4 col-sm-6">
            <div className="counter">
              <span className="counter-value">{queries}</span>
              <h3>Total Queries</h3>
              <div className="counter-icon">
                <i className="fa fa-book" />
              </div>
            </div>
          </div>
        </div>
        <style>{`
        
        .counter{
          background: #fff;
          font-family: 'Noto Sans JP', sans-serif;
          text-align: center;
          width: 210px;
          padding: 0 0 25px;
          margin: 0 auto 15px;
          border-radius: 10px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
          position: relative;
      }
      .counter:before{
          content: "";
          background: #fff;
          width: 30px;
          height: 30px;
          border-radius: 5px 0;
          box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.07);
          transform: translateX(-50%) rotate(45deg);
          position: absolute;
          bottom: -15px;
          left: 50%;
      }
      .counter .counter-value{
          color: #fff;
          background: linear-gradient(to right, #19bbd2, #2778ee);
          font-size: 38px;
          font-weight: 300;
          padding: 0 0 3px;
          margin: 0 0 25px;
          border-radius: 10px 10px 0 0;
          display: block;
      }
      .counter h3{
          color: #2778ee;
          font-size: 18px;
          font-weight: 900;
          letter-spacing: 0.5px;
          text-transform: capitalize;
          margin: 0 0 25px;
      }
      .counter .counter-icon{
          color: #fff;
          background: linear-gradient(to right, #19bbd2, #2778ee);
          font-size: 40px;
          line-height: 60px;
          width: 65px;
          height: 65px;
          margin: 0 auto;
          border-radius: 10px;
      }
      .counter.purple .counter-value,
      .counter.purple .counter-icon{
          background: linear-gradient(to right, #8f70e7, #c452ef);
      }
      .counter.purple h3{ color: #c452ef; }
      .counter.magenta .counter-value,
      .counter.magenta .counter-icon{
          background: linear-gradient(to right, #e84a94, #ae379b);
      }
      .counter.magenta h3{ color: #ae379b; }
      .counter.yellow .counter-value,
      .counter.yellow .counter-icon{
          background: linear-gradient(to right, #fecb4b, #e69814);
      }
      .counter.yellow h3{ color: #e69814; }
      @media screen and (max-width:990px){
          .counter{ margin-bottom: 45px; }
        `}</style>
      </div>}
        {showComponent === "share" && <NewIdeaRequest />}
        {showComponent === "explore" && <ViewAllIdeasAdmin />}
        {showComponent === "query" && <ViewQueries />}
        {showComponent === "search" &&
          searchProject &&
          searchProject.map((item) => (
            <div className="row mt-2 " key={item.id}>
              <div className="col-md-9">
                <div className="card">
                  <div className=" card-header d-flex ">
                    <h4>{item.projectName}</h4>
                    {/* <a
                      href="#"
                      className="ms-auto mt-1 btn btn-outline-secondary "
                    >
                      <i className="fa-solid fa-users"></i>Join Group
                    </a> */}
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
                  <div className=" card-footer">
                    <a href="#" onClick={()=>relatedDocsDownload(item.projectName)}>View Related Documents</a>{" "}
                    {/* <i
                      className={`fa-regular fa-thumbs-up fs-1  margin-left ${
                        isLiked ? "text-primary fa-solid" : ""
                      }`}
                      onClick={handleLikeClick}
                    ></i>
                    {isLiked ? "Upvoted" : "Upvote"}
                    <i> &nbsp; &nbsp; 5 Upvoted</i> */}
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
      
    </div>
  );
};

export default AdminNav;
