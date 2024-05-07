import React, { useEffect, useState } from "react";
import AddIdeas from "./AddIdeas";
import ViewAllIdeas from "./ViewAllIdeas";
import Chat from "./Chat";
import RaiseQueries from "./RaiseQueries";
import AxiosAPI, {url} from "../../AxiosAPI";
import ViewMyIdeas from "./ViewMyIdeas";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import HomeIdeas from "./HomeIdeas";
import ViewProfile from "./ViewProfile";
import Footers1 from "../Footers1";


const UserNav = () => {
  const [sidebarActive, setSidebarActive] = useState(false);
  const [rightSideBar, setRightBar] = useState(false);
  const [showComponent, setShowComponent] = useState("home");
  const navigateTo = useNavigate();
  const toggleSidebar = () => {
    setSidebarActive(!sidebarActive);
  };
  const renderComponent = (compo) => {
    setShowComponent(compo);
  };
  const rightToggleBar = () => {
    setRightBar(!rightSideBar);
   
  };
  const user = JSON.parse(localStorage.getItem("user"));
  // if (!user) {
  //   alert("Login First");
  //   toast("Login First");
  //   navigateTo("/")
  // }

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
  
  const joinGroups=async(groupId)=>{
    try {
      const response=await AxiosAPI.post(`groups/${groupId}/join/${user.id}`);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }
  // const [filters, setFilters] = useState({
    //   department: [],
  
  //   category: [],
  // });
  // const [data, setData] = useState([]);

  // useEffect(() => {
  //   fetchData();
  // }, [filters]);
  // const handleCheckboxChange = (filterType, value) => {
  //   const updatedFilters = { ...filters };
  //   if (updatedFilters[filterType].includes(value)) {
  //     updatedFilters[filterType] = updatedFilters[filterType].filter(
  //       (item) => item !== value
  //     );
  //   } else {
  //     updatedFilters[filterType] = [...updatedFilters[filterType], value];
  //   }
  //   setFilters(updatedFilters);
  // };
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
                src={`${user.image}`}
                alt="..."
                style={{ height: "80px", width: "80px" }}
                className="mr-3 rounded-circle img-thumbnail shadow-sm"
              />
              <div className="media-body">
                <h4 className="m-0">{user.name}</h4>
                <p className="font-weight-light text-muted mb-0">
                  {user.college}
                </p>
              </div>
            </div>
          </div>
          <p className="text-gray font-weight-bold text-uppercase px-3 small pb-4 mb-0 bg-light">
            Main
          </p>
          <ul className="nav flex-column bg-white mb-0">
            <li className="nav-item ">
              <a
                href="#"
                className={`nav-link text-dark font-italic  my-hover ${showComponent==="home"?" active bg-info ":""}`}

                onClick={() => renderComponent("home")}
              >
                {/* <i className="fa fa-th-large " /> */}
                <i class="fa-solid fa-house mr-3 text-primary fa-fw"></i>
                Home
              </a>
            </li>
            <li className="nav-item">
              <a
                href="#"
                className={`nav-link text-dark font-italic  my-hover ${showComponent==="share"?" active bg-info ":""}`}
                onClick={() => renderComponent("share")}
              >
                <i className="fa fa-solid fa-network-wired mr-3 text-primary fa-fw" />
                Share Your Idea
              </a>
            </li>
            <li className="nav-item">
              <a
                href="#"
                className={`nav-link text-dark font-italic  my-hover ${showComponent==="explore"?" active bg-info ":""}`}

                onClick={() => renderComponent("explore")}
              >
                <i className="fa fa-cubes mr-3 text-primary fa-fw" />
                Explore Ideas
              </a>
            </li>
            <li className="nav-item">
              <a
                href="#"
                className={`nav-link text-dark font-italic  my-hover ${showComponent==="myIdea"?" active bg-info ":""}`}

                onClick={() => renderComponent("myIdea")}
              >
                <i className="fa-regular fa-lightbulb text-primary fa-fw"></i>
                My Ideas
              </a>
            </li>
            <li className="nav-item">
              <a
                href="#"
                className={`nav-link text-dark font-italic  my-hover ${showComponent==="chat"?" active bg-info ":""}`}

                onClick={() => renderComponent("chat")}
              >
                <i className="fa-regular fa-solid fa-comment text-primary fa-fw"></i>
                Chats
              </a>
            </li>
            <li className="nav-item">
              <a
                href="#"
                className={`nav-link text-dark font-italic  my-hover ${showComponent==="profile"?" active bg-info ":""}`}

                onClick={() => renderComponent("profile")}
              >
                <i className="fa-regular  fa-user text-primary fa-fw"></i>
                My Profile
              </a>
            </li>
            <li className="nav-item">
              <a
                href="#"
                className={`nav-link text-dark font-italic  my-hover ${showComponent==="query"?" active bg-info ":""}`}

                onClick={() => renderComponent("query")}
              >
                <i className="fa-regular fa-solid fa-circle-question text-primary fa-fw"></i>
                Raise Query
              </a>
            </li>
          </ul>
          <div style={{ position: "relative", top: "30%", left: "150px" }}>
            <button
              className="my-button"
              onClick={() => {
                toast("Oops Logged Out");
                localStorage.removeItem("user");
                navigateTo("/");
              }}
            >
              <i className="fa-solid fa-arrow-right-from-bracket fa-fw text-primary"></i>
              Logout
            </button>
          </div>
        </div>
      )}
      {rightSideBar && (
        <div
          className={
            rightSideBar
              ? "custom-vertical-nav active bg-light "
              : "custom-vertical-nav"
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
      <nav className=" bg-white">
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
      <div className="page-content grad-color" style={{ minHeight: "90vh" }}>
        {showComponent === "home" && (
          <HomeIdeas/>
          // <div className="container margin-top ">
          //   <div className="row  ">
          //     <div className="col-md-4 col-sm-6 content-card">
          //       <div className="shadow-lg">
          //         <div
          //           className="card card-just-text border-0"
          //           data-background="color"
          //           data-color="green"
          //           data-radius="none"
          //         >
          //           <div className="content">
          //             {/* <h6 className="category">Best cards</h6> */}
          //             <h4 className="title">
          //               <span className="home-text">
          //                 Explore Exclusive Content
          //               </span>
          //             </h4>
          //             <p className="description">
          //               Welcome back! Dive into exclusive content curated just
          //               for you. Discover new ideas and get inspired by our
          //               community of innovators.
          //             </p>
          //           </div>
          //         </div>{" "}
          //         {/* end card */}
          //       </div>
          //     </div>
          //     <div className="col-md-4 col-sm-6 content-card">
          //       <div className="shadow">
          //         <div
          //           className="card card-just-text border-0 "
          //           data-background="color"
          //           data-color="blue"
          //           data-radius="none"
          //         >
          //           <div className="content">
          //             {/* <h6 className="category">Best cards</h6> */}
          //             <h4 className="title">
          //               <span className="home-text">
          //                 Collaborate on Projects
          //               </span>
          //             </h4>
          //             <p className="description">
          //               Ready to collaborate? Explore ongoing projects and
          //               connect with like-minded individuals to turn your ideas
          //               into reality.
          //             </p>
          //           </div>
          //         </div>{" "}
          //         {/* end card */}
          //       </div>
          //     </div>

          //     <div className="col-md-4 col-sm-6 content-card">
          //       <div className="shadow-lg">
          //         <div
          //           className="card card-just-text border-0"
          //           data-background="color"
          //           data-color="yellow"
          //           data-radius="none"
          //         >
          //           <div className="content">
          //             {/* <h6 className="category">Best cards</h6> */}
          //             <h4 className="title">
          //               <span className="home-text">Feeling inspired?</span>
          //             </h4>
          //             <p className="description">
          //               Start a new project and invite others to join you!
          //               Whether it's a passion project or a groundbreaking idea,
          //               bring it to life with the support of our community.
          //             </p>
          //           </div>
          //         </div>{" "}
          //         {/* end card */}
          //       </div>
          //     </div>

          //     <div className="col-md-4 col-sm-6 content-card">
          //       <div className="shadow-lg">
          //         <div
          //           className="card card-just-text border-0"
          //           data-background="color"
          //           data-color="purple"
          //           data-radius="none"
          //         >
          //           <div className="content">
          //             {/* <h6 className="category">Best cards</h6> */}
          //             <h4 className="title">
          //               <span className="home-text">Ready to level up?</span>
          //             </h4>
          //             <p className="description">
          //               Ready to level up? Connect with mentors within the
          //               community who can offer guidance and support as you
          //               navigate your innovation journey.
          //             </p>
          //           </div>
          //         </div>{" "}
          //         {/* end card */}
          //       </div>
          //     </div>
          //     <div className="col-md-4 col-sm-6 content-card">
          //       <div className="shadow-lg">
          //         <div
          //           className="card card-just-text border-0"
          //           data-background="color"
          //           data-color="brown"
          //           data-radius="none"
          //         >
          //           <div className="content">
          //             {/* <h6 className="category">Best cards</h6> */}
          //             <h4 className="title">
          //               <span className="home-text">Share Your Progress</span>
          //             </h4>
          //             <p className="description">
          //               Share your progress with the community! Update your
          //               profile with your latest innovations and achievements to
          //               inspire others.
          //             </p>
          //           </div>
          //         </div>{" "}
          //         {/* end card */}
          //       </div>
          //     </div>
          //     <div className="col-md-4 col-sm-6 content-card">
          //       <div className="shadow-lg">
          //         <div
          //           className="card card-just-text border-0"
          //           data-background="color"
          //           data-color="orange"
          //           data-radius="none"
          //         >
          //           <div className="content">
          //             {/* <h6 className="category">Best cards</h6> */}
          //             <h4 className="title">
          //               <span className="home-text">Join Discussions</span>
          //             </h4>
          //             <p className="description">
          //               Engage in meaningful discussions! Participate in forums
          //               and join conversations with fellow members to exchange
          //               insights and feedback.
          //             </p>
          //           </div>
          //         </div>{" "}
          //         {/* end card */}
          //       </div>
          //     </div>
          //   </div>
          // </div>
        )}
        {showComponent === "share" && (
          <div className="grad-color" style={{ minHeight: "90vh" }}>
            <span
              className="close-modal"
              onClick={() => renderComponent("home")}
            >
              &times;
            </span>
            <AddIdeas />{" "}
          </div>
        )}
        {showComponent === "query" && (
          <div className="grad-color" style={{ minHeight: "90vh" }}>
            <span
              className="close-modal"
              onClick={() => renderComponent("home")}
            >
              &times;
            </span>
            <RaiseQueries />{" "}
          </div>
        )}
        {showComponent === "explore" && <ViewAllIdeas />}
        {showComponent === "myIdea" && (
          
            <ViewMyIdeas />
         
        )}
        {showComponent === "chat" && <Chat />}
        {showComponent === "search" &&
          searchProject &&
          searchProject.map((item) => (
            <div className="row mt-2 " key={item.id}>
               {item?.valid === "ACCEPTED" &&
                item.achievements && (
                  <div className="col-md-9">
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
                      <div className=" card-footer d-flex ">
                        <Link
                          onClick={() =>
                            relatedDocsDownload(item.projectName)
                          }
                        >
                          View Related Documents
                        </Link>
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
                  </div>
                )}
            </div>
          ))}
          {showComponent==="profile"&&<ViewProfile/>}
      </div>

      <div className=""><Footers1/></div>

      {/* <footer className="footerHeight bg-dark text-white py-3">
        &copy; ProInnovate{" "}
        <span className=" fs-6 fst-italic home-text">
          Engineering Inventive Warehouse for Learning
        </span>
        <div className="p-0">
          <div>
            <i className="fa-regular fa-envelope me-2"></i>
            <a href="mailto:fakeemail@example.com" className="">
              fakeemail@example.com
            </a>
          </div>
          <div>
            <i className="fa fa-location-dot me-2"></i>
            <span className="">1234 Innovation Ave, City, Country</span>
          </div>
        </div>
      </footer> */}
    </div>
  );
};

export default UserNav;
