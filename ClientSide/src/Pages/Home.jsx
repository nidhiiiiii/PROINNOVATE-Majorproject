import React, { useState } from "react";
import "../css/style.css";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import AxiosAPI from "../AxiosAPI";
import { toast } from "react-toastify";
import Footers1 from "./Footers1";
const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const [signUpModal, setSignUpModal] = useState(false);
  const naviagateTo = useNavigate();
  const [activeLink, setActiveLink] = useState("home");
const [loading, setLoading]=useState(false);

  // Function to toggle the modal visibility
  const toggleModal = () => {
    setActiveLink("signin");
    setShowModal(!showModal);
    setSignUpModal(false);
  };
  const homeClick = () => {
    setActiveLink("home");

    setSignUpModal(false);
    setShowModal(false);
  };
  const toggleSignUpModal = () => {
    setActiveLink("signup");

    setSignUpModal(!signUpModal);
    setShowModal(false);
  };
  const { register: registerStudent, handleSubmit: handleSubmitStudent } =
    useForm();
  const { register: registerSignIn, handleSubmit: handleSubmitSignIn } =
    useForm();
  const [image, setImage] = useState();
  const handleImage = (e) => {
    setImage(e.target.files[0]);
    const file = e.target.files[0];
    if (file) {
      const fileSizeInMB = file.size / (1024 * 1024); // Convert bytes to MB
      if (fileSizeInMB > 1) {
        toast("File size exceeds 1MB limit. Please choose a smaller file.");
        e.target.value = null;
      } else {
        console.log("File size is within the limit.");
      }
    }
  };
  const submitStudent = async (data) => {
    setLoading(true)
    const formDta = new FormData();
    for (let [key, value] of Object.entries(data)) {
      formDta.append(key, value);
    }
    formDta.append("image", image);
    try {
      const result = await AxiosAPI.post("student/add", formDta);
      console.log(result, "signup success");
      setSignUpModal(!signUpModal);
      setShowModal(false);
      toast.success("Registered successfully");
    } catch (error) {
      toast.error("error occured");
      console.log(error, "signup error");
    }finally{
      setLoading(false)
    }
  };
  const signInFunction = async (data) => {
    setLoading(true)
    if (data.email === "admin@gmail.com" && data.password === "admin") {
      localStorage.setItem("admin", "admin");
      toast.success("Login Successfull");
      naviagateTo("/admin");
    } else
      try {
        const result = await AxiosAPI.post("student/login", data);
        console.log(result, "backend");
        const user = JSON.stringify(result.data);
        localStorage.setItem("user", user);
        toast.success("Login Successfull");
        naviagateTo("/user");
      } catch (error) {
        console.log(error, "error");
        toast.error(error.response.data);
      }finally{
        setLoading(false)
      }
  };
  return (
    <div className="grad-color">
      <nav className="navbar navbar-expand-lg bg-body-tertiary home-nav-height fixed-top ">
        <div className="container-fluid ">
          <div>
            <img
              // src="/logo4.jpg"
              src="/oldlogo.png"
              alt=""
              width={250}
              style={{
                float: "left",
                mixBlendMode: "multiply",
                paddingLeft: "32px"
                // paddingBottom:"21px"
              }}
            />
          </div>
          <div className=" ">
            {" "}
            <span className="home-text fs-3 text-danger " href="#">
              {/* ProInnovate */}{" "}
              <span className="text-secondary  text-sm-start fs-6 ms-2">
              Engineering Inventive Warehouse for learning
              </span>
              {/* Online Integrated Platform For Projects Taken Up By the College
              Students */}
            </span>
          </div>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse " id="navbarNavDropdown">
            <ul className="navbar-nav ms-auto ">
              <li className="nav-item">
                <Link
                  className={`nav-link  me-auto ${
                    activeLink === "home"
                      ? " active text-primary border-bottom btn "
                      : ""
                  }`}
                  aria-current="page"
                  to="/"
                  onClick={homeClick}
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <a
                  className={`nav-link btn  ${
                    activeLink === "signin"
                      ? " active text-primary border-bottom"
                      : ""
                  }`}
                  href="#"
                  onClick={toggleModal}
                >
                  Login
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={`nav-link btn  ${
                    activeLink === "signup"
                      ? " active text-primary border-bottom"
                      : ""
                  }`}
                  href="#"
                  onClick={toggleSignUpModal}
                >
                  Sign up
                </a>
              </li>
              {/* <li className="nav-item dropdown">
          <a
            className="nav-link dropdown-toggle"
            href="#"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Dropdown link
          </a>
          <ul className="dropdown-menu">
            <li>
              <a className="dropdown-item" href="#">
                Action
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                Another action
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                Something else here
              </a>
            </li>
          </ul>
        </li> */}
            </ul>
          </div>
        </div>
      </nav>
      {/* sign in */}
      {showModal && (
        <div className="mymodal ">
          <div className="mymodal-content">
            {/* Close button */}
            <span className="close-modal" onClick={toggleModal}>
              &times;
            </span>
            {/* Modal content */}
            <div>
              <div className="">
                <div className="my-box grad-color ">
                  <h4 className=" ">Login</h4>
                  <form
                    className="signin-form container "
                    onSubmit={handleSubmitSignIn(signInFunction)}
                  >
                    {/* <div className="row mt-2">
                     <div className="col-md-4  ">
                     <label className="form-label ">Email</label>
                     </div>
                      <div className="col-md-5 ">
                      <input type="email" className="form-control" {...registerSignIn("email")} />
                      </div>
                    </div> */}
                    <div className="row mt-2">
                      <div className="col-md-4  ">
                        <label className="form-label ">Email</label>
                      </div>
                      <div className="col-md-5 ">
                        <input
                          type="email"
                          className="form-control"
                          {...registerSignIn("email")}
                          style={{width: "400px"}}
                        />
                      </div>
                    </div>
                    {/* <div className="signin-form">
                      <label className="my-label ">Email</label>
                      <input
                        type="email"
                        className=" my-input"
                        {...registerSignIn("email")}
                      />
                    </div> */}
                    <div className="row mt-2" >
                      <style jsx="true">{`
                        .row {
                         
                        }
                      `}</style>
                      <div className="col-md-4  ">
                        <label className="form-label ">Password</label>
                      </div>
                      <div className="col-md-5">
                        <input
                          type="password"
                          className="form-control"
                          {...registerSignIn("password")}
                          style={{width: "400px"}}
                        />
                      </div>
                    </div>
                    {/* <div className="signin-form">
                      <label className="">Password</label>
                      <input
                        type="password"
                        className="my-input"
                        {...registerSignIn("password")}
                      />
                    </div> */}
                  {loading&&<i className=" spinner-border text-primary mt-3"></i>}

                    <div>
                      <button className="my-button mt-3" type="submit">
                        Log In
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* sign up */}
      {signUpModal && (
        <div className="mymodal ">
          <div className="mymodal-content">
            {/* Close button */}
            <span className="close-modal" onClick={toggleSignUpModal}>
              &times;
            </span>
            {/* Modal content */}
            <div>
              <div className="">
                <div className="my-box grad-color">
                  <h4 className=" ">Sign Up</h4>
                  <form
                    className="signin-form "
                    onSubmit={handleSubmitStudent(submitStudent)}
                  >
                    <div className="row mt-2">
                      <div className="col-md-4  ">
                        <label className="form-label ">Name</label>
                      </div>
                      <div className="col-md-5 ">
                        <input
                          type="text"
                          className="form-control"
                          {...registerStudent("name")}
                          style={{width: "400px"}}
                        />
                      </div>
                    </div>
                    {/* <div className="signin-form">
                      <label className="my-label ">Name</label>
                      <input
                        type="text"
                        className=" my-input"
                        {...registerStudent("name")}
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
                          {...registerStudent("email")}
                           style={{width: "400px"}}
                        />
                      </div>
                    </div>
                    {/* <div className="signin-form">
                      <label className="my-label ">Email</label>
                      <input
                        type="email"
                        className=" my-input"
                        placeholder="Enter Email provided by college only"
                        {...registerStudent("email")}
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
                          {...registerStudent("mobileNumber")}
                           style={{width: "400px"}}
                        />
                      </div>
                    </div>
                    {/* <div className="signin-form">
                      <label className="my-label ">Mobile</label>
                      <input
                        type="text"
                        className=" my-input"
                        {...registerStudent("mobileNumber")}
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
                          {...registerStudent("college")}
                           style={{width: "400px"}}
                        />
                      </div>
                    </div>
                    {/* <div className="signin-form">
                      <label className="my-label ">College</label>
                      <input
                        type="text"
                        className=" my-input"
                        {...registerStudent("college")}
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
                          {...registerStudent("address")}
                           style={{width: "400px"}}
                        />
                      </div>
                    </div>
                    {/* <div className="signin-form">
                      <label className=" text-area-label">Address</label>
                      <textarea
                        className="text-area"
                        cols={65}
                        {...registerStudent("address")}
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
                          {...registerStudent("password")}
                           style={{width: "400px"}}
                        />
                      </div>
                    </div>
                    {/* <div className="signin-form">
                      <label className="">Password</label>
                      <input
                        type="password"
                        className="my-input"
                        {...registerStudent("password")}
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
                          style={{width: "400px"}}
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
                  {loading&&<i className=" spinner-border text-primary mt-3"></i>}
                    <div>
                      <button className="my-button mt-4 " type="submit">
                        Sign Up
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className=" image">
        {/* <div className="row  ">
          <div className="col-md-4 col-sm-6 content-card">
            <div className="shadow-lg">
              <div
                className="card card-just-text border-0"
                data-background="color"
                data-color="green"
                data-radius="none"
              >
                <div className="content">
                 
                  <h4 className="title">
                    <span className="home-text">Join Us</span>
                  </h4>
                  <p className="description">
                    Join us to share your innovative ideas and gain inspiration
                    from others. Register today and let your imagination soar
                  </p>
                </div>
              </div>{" "}
             
            </div>
          </div>
          <div className="col-md-4 col-sm-6 content-card">
            <div className="shadow">
              <div
                className="card card-just-text border-0 "
                data-background="color"
                data-color="blue"
                data-radius="none"
              >
                <div className="content">
                 
                  <h4 className="title">
                    <span className="home-text">Register Today</span>
                  </h4>
                  <p className="description">
                    Register now and unleash your creativity! Explore your ideas
                    and discover endless possibilities
                  </p>
                </div>
              </div>
            
            </div>
          </div>

          <div className="col-md-4 col-sm-6 content-card">
            <div className="shadow-lg">
              <div
                className="card card-just-text border-0"
                data-background="color"
                data-color="yellow"
                data-radius="none"
              >
                <div className="content">
                 
                  <h4 className="title">
                    <span className="home-text">Are you Ready</span>
                  </h4>
                  <p className="description">
                    Ready to turn your ideas into reality? Sign up now to
                    connect with a community of like-minded individuals and
                    explore innovative projects.
                  </p>
                </div>
              </div>{" "}
             
            </div>
          </div>

          <div className="col-md-4 col-sm-6 content-card">
            <div className="shadow-lg">
              <div
                className="card card-just-text border-0"
                data-background="color"
                data-color="purple"
                data-radius="none"
              >
                <div className="content">
           
                  <h4 className="title">
                    <span className="home-text">Start Innovations</span>
                  </h4>
                  <p className="description">
                    Start your innovation journey today! Register to share your
                    ideas, gain valuable feedback, and be inspired by the
                    creativity of others.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4 col-sm-6 content-card">
            <div className="shadow-lg">
              <div
                className="card card-just-text border-0"
                data-background="color"
                data-color="brown"
                data-radius="none"
              >
                <div className="content">
                 
                  <h4 className="title">
                    <span className="home-text">Unlock Today</span>
                  </h4>
                  <p className="description">
                    Embark on span journey of innovation! Register to unlock a
                    world of ideas and collaborate with fellow visionaries.
                  </p>
                </div>
              </div>{" "}
             
            </div>
          </div>
          <div className="col-md-4 col-sm-6 content-card">
            <div className="shadow-lg">
              <div
                className="card card-just-text border-0"
                data-background="color"
                data-color="orange"
                data-radius="none"
              >
                <div className="content">
                  
                  <h4 className="title">
                    <span className="home-text">Join Community</span>
                  </h4>
                  <p className="description">
                    Join our community of thinkers and doers! Register now to
                    share your ideas, learn from others, and make meaningful
                    connections.
                  </p>
                </div>
              </div>{" "}
              
            </div>
          </div>
        </div> */}
      </div>
      <Footers1 />
      {/* <div className="footer-position">
        <footer className="footerHeight bg-dark text-white py-3  ">
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
              <i className="fa fa-location-dot  me-2"></i>
              <span className="">1234 Innovation Ave, City, Country</span>
            </div>
          </div>
        </footer>
      </div> */}
    </div>
  );
};

export default Home;
