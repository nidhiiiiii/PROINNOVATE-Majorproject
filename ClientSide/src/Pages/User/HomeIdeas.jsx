import React, { useEffect, useState } from "react";
import AxiosAPI, { url } from "../../AxiosAPI";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const HomeIdeas = () => {
  const [isLiked, setIsLiked] = useState(false);

  const handleLikeClick = () => {
    setIsLiked(!isLiked); // Toggle the like state
  };
  const [projects, setProjects] = useState();
  const [loading, setLoading]=useState(false);
  const getAllProjects = async () => {
    setLoading(true)
    try {
      const results = await AxiosAPI.get("groups");
    console.log(results.data.Groups, "regsv");
   // setProjects(results.data.Groups);
    } catch (error) {
      
    } finally{
    setLoading(false)
  }
  };
  useEffect(() => {
    getAllProjects();
  }, []);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  const user = JSON.parse(localStorage.getItem("user"));
  
  const handleLike = async (id, projectId) => {
    const like = localStorage.getItem(`liked_${id}_${user.id}`);
    if (!like) {
      try {
        // Update UI optimistically
        setLiked(!isLiked);
        setLikeCount((prevCount) => (isLiked ? prevCount - 1 : prevCount + 1));

        // Send data to backend
        const response = await AxiosAPI.put(`groups/like/${id}/${projectId}`);
        localStorage.setItem(`liked_${id}_${user.id}`, 'true');
        getAllProjectsWithoutGroup();
        console.log(response, "my respo");
      } catch (error) {
        // Handle error, revert UI changes if necessary
        console.error("Error while updating like:", error);
        setLiked(liked); // Revert back to the previous state
        setLikeCount((prevCount) => (isLiked ? prevCount + 1 : prevCount - 1)); // Revert like count
      }
    }
  };
  // const showStaticMessageCard =
  //   projects &&
  //   projects.some((project) => !project.valid && !project.achievements);
  const relatedDocsDownload = async (filename) => {
    try {
      window.open(`${url}projects/download/${filename}`, "_blank");
      // const newWindow = window.open( response.data, '_blank', 'noopener,noreferrer');
    } catch (error) {
      console.log(error);
    }
  };
  const joinGroups = async (groupId) => {
    try {
      const response = await AxiosAPI.post(`groups/${groupId}/join/${user.id}`);
      console.log(response);
      toast("Joined");
    } catch (error) {
      toast.error("Could not join , Already joined");
      console.log(error);
    }
  };
  const [project1, setProject1] = useState();
  const getAllProjectsWithoutGroup = async () => {
    const results = await AxiosAPI.get("projects");
    console.log(results.data, "projeccts");
    // setProject1
 setProjects(results.data)
  };
  useEffect(() => {
    getAllProjectsWithoutGroup();
  }, []);
  return (
    <div>
      <div className="container">
      {loading&&<i className=" spinner-border text-primary mt-3 "></i>}
        {projects &&
          projects.map((item) => (
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
        {/* <div className="artboard">
  <div className="card1">
    <div className="card__side card__side--back">
      <div className="card__cover">
        <h4 className="card__heading">
          <span className="card__heading-span">Explore Exclusive Content </span>
        </h4>
      </div>
      <div className="card__details">
        <p>
        Welcome back! Dive into exclusive content curated just
                           for you. Discover new ideas and get inspired by our
                           community of innovators. 
        </p>
        <ul>
          <li>Advanced JS and CSS</li>
          <li>JS/CSS Preprocessors</li>
          <li>JS Frameworks</li>
          <li>Advanced Animations</li>
          <li>Deployment Pipelines</li>
          <li>Large Apps Architectures</li>
          <li>Naming Conventions</li>
        </ul>
      </div>
    </div>
    <div className="card__side card__side--front">
      <div className="card__theme">
        <div className="card__theme-box">
          <p className="card__subject">Explore Exclusive Content</p>
          <p className="card__title">Hello World!</p>
        </div>
      </div>
    </div>
  </div>
</div> */}
        <style jsx="true">
          {`
            .artboard {
              display: flex;
              flex-flow: row;
              align-items: center;
              justify-content: center;

              height: 100%;
              position: relative;
            }
            @media (max-width: 37.5em) {
              .artboard {
                padding: 1rem;
              }
            }

            .card1 {
              flex: initial;
              position: relative;
              height: 150px;
              width: 25rem;
              -moz-perspective: 200rem;
              perspective: 200rem;
              margin: 2rem;
            }
            .card__side {
              height: 15rem;
              transition: all 0.8s ease;
              position: absolute;
              top: 0;
              left: 0;
            
              width: 100%;
              -webkit-backface-visibility: hidden;
              /* We don't want to see the back part of the element. */
              backface-visibility: hidden;
              /* We don't want to see the back part of the element. */
              border-radius: 3px;
             
              /* overflow: hidden; The image is overflowing the parent.box-shadow: 0 2rem 6rem rgba(0, 0, 0, 0.15); */
            }
            .card__side--front {
              background-image: linear-gradient(
                  to right bottom,
                  rgba(205, 243, 247, 0.65),
                  rgba(12, 79, 237, 0.7)
                ),
                url(https://media.istockphoto.com/id/1440711342/photo/3d-render-of-happy-pongal-holiday-harvest-festival-of-tamil-nadu-south-india-product-display.jpg?s=1024x1024&w=is&k=20&c=stB1fryth1izzFNoaoVVa4jwQgxpKHKjFmg6lcvJXOQ=);
            }
            .card__side--back {
              background-color: #fff;
              transform: rotateY(180deg);
            }
            .card1:hover .card__side--back {
              transform: rotateY(0);
            }
            .card1:hover .card__side--front {
              transform: rotateY(-180deg);
            }
            .card__theme {
              position: relative;

              transform: translate(-50%, -50%);
              text-align: center;
            }
            .card__theme-box {
              color: #fff;
            }
            .card__subject {
              position: relative;
              top: 130px;
              left: 135px;
              font-size: larger;
            }
            .card__title {
              font-family: "VT323", monospace;
              text-transform: uppercase;
              font-size: 6rem;
              font-weight: 100;
            }
            .card__cover {
              position: relative;
              background-size: cover;
              height: 100px;
              -webkit-clip-path: polygon(0 0, 100% 0, 100% 85%, 0 100%);
              clip-path: polygon(0 0, 100% 0, 100% 85%, 0 100%);
              border-top-left-radius: 3px;
              border-top-right-radius: 3px;
              background-image: linear-gradient(
                  to top right,
                  rgba(30, 11, 54, 0.65),
                  rgba(202, 55, 130, 0.65)
                ),
                url(https://cdn.spacetelescope.org/archives/images/screen/heic0406a.jpg);
            }
            .card__heading {
            }
            .card__heading-span {
            }
            .card__details {
            }
            .card__details ul {
            }
            .card__details ul li {
            }
            .card__details ul li:not(:last-child) {
            }
            @media only screen and (max-width: 37.5em),
              only screen and (hover: none) {
              .card {
                height: auto;
                border-radius: 3px;
                background-color: #fff;
                box-shadow: 0 2rem 6rem rgba(0, 0, 0, 0.15);
              }
              .card__side {
                height: auto;
                position: relative;
                box-shadow: none;
              }
              .card__side--front {
                clip-path: polygon(0 15%, 100% 0, 100% 100%, 0 100%);
              }
              .card__side--back {
                transform: rotateY(0);
              }
              .card:hover .card__side--front {
                transform: rotateY(0);
              }
              .card__details {
              }
              .card__theme {
                position: relative;
                top: 0;
                left: 0;
                transform: translate(0);
                width: 100%;
                padding: 5rem 4rem 1.5rem 4rem;
                text-align: right;
              }
              .card__theme-box {
                margin-bottom: 1.5rem;
              }
              .card__title {
                font-size: 4rem;
              }
            }
          `}
        </style>
        <div className="container margin-top mb-5 pb-5 ">
          <div className="row  ">
            <div className="col-md-4 col-sm-6 ">
              <div className="artboard">
                <div className="card1">
                  <div className="card__side card__side--back">
                    <div className="card__cover">
                      <h4 className="card__heading">
                        <span className="home-text text-center m-1 p-1">
                          Explore Exclusive Content!
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="24"
                            viewBox="0 -960 960 960"
                            width="24"
                          >
                            <path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480v320q0 33-23.5 56.5T800-80H480Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 23 3 45t9 43l148-148 132 111 131-131h-63v-80h200v200h-80v-63L456-320 325-432 207-314q42 69 113.5 111.5T480-160Zm300 20q17 0 28.5-11.5T820-180q0-17-11.5-28.5T780-220q-17 0-28.5 11.5T740-180q0 17 11.5 28.5T780-140ZM455-480Z" />
                          </svg>
                        </span>
                      </h4>
                    </div>
                    <div className="card__details text-center ">
                      <p>
                        Welcome back! Dive into exclusive content curated just
                        for you. Discover new ideas and get inspired by our
                        community of innovators.
                      </p>
                    </div>
                  </div>
                  <div className="card__side card__side--front bg-warning">
                    <div className="card__theme  ">
                      <div className="card__theme-box">
                        <p className="card__subject home-text typed text-center text-white  ">
                          Explore Content{" "}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="24"
                            viewBox="0 -960 960 960"
                            width="24"
                          >
                            <path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480v320q0 33-23.5 56.5T800-80H480Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 23 3 45t9 43l148-148 132 111 131-131h-63v-80h200v200h-80v-63L456-320 325-432 207-314q42 69 113.5 111.5T480-160Zm300 20q17 0 28.5-11.5T820-180q0-17-11.5-28.5T780-220q-17 0-28.5 11.5T740-180q0 17 11.5 28.5T780-140ZM455-480Z" />
                          </svg>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4 col-sm-6 ">
              <div className="artboard">
                <div className="card1">
                  <div className="card__side card__side--back">
                    <div className="card__cover">
                      <h4 className="card__heading">
                        <span className="home-text text-center m-1 p-1">
                          Feeling inspired?{" "}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="24"
                            viewBox="0 -960 960 960"
                            width="24"
                          >
                            <path d="M240-80v-172q-57-52-88.5-121.5T120-520q0-150 105-255t255-105q125 0 221.5 73.5T827-615l52 205q5 19-7 34.5T840-360h-80v120q0 33-23.5 56.5T680-160h-80v80h-80v-160h160v-200h108l-38-155q-23-91-98-148t-172-57q-116 0-198 81t-82 197q0 60 24.5 114t69.5 96l26 24v208h-80Zm254-360Zm-54 80h80l6-50q8-3 14.5-7t11.5-9l46 20 40-68-40-30q2-8 2-16t-2-16l40-30-40-68-46 20q-5-5-11.5-9t-14.5-7l-6-50h-80l-6 50q-8 3-14.5 7t-11.5 9l-46-20-40 68 40 30q-2 8-2 16t2 16l-40 30 40 68 46-20q5 5 11.5 9t14.5 7l6 50Zm40-100q-25 0-42.5-17.5T420-520q0-25 17.5-42.5T480-580q25 0 42.5 17.5T540-520q0 25-17.5 42.5T480-460Z" />
                          </svg>
                        </span>
                      </h4>
                    </div>
                    <div className="card__details text-center ">
                      <p>
                        Start a new project and invite others to join you!
                        Whether it's a passion project or a groundbreaking idea,
                        bring it to life with the support
                        {/* of our community. */}
                      </p>
                    </div>
                  </div>
                  <div className="card__side card__side--front">
                    <div className="card__theme">
                      <div className="card__theme-box">
                        <p className="card__subject home-text typed text-center text-white">
                          Feeling inspired?{" "}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="24"
                            viewBox="0 -960 960 960"
                            width="24"
                          >
                            <path d="M240-80v-172q-57-52-88.5-121.5T120-520q0-150 105-255t255-105q125 0 221.5 73.5T827-615l52 205q5 19-7 34.5T840-360h-80v120q0 33-23.5 56.5T680-160h-80v80h-80v-160h160v-200h108l-38-155q-23-91-98-148t-172-57q-116 0-198 81t-82 197q0 60 24.5 114t69.5 96l26 24v208h-80Zm254-360Zm-54 80h80l6-50q8-3 14.5-7t11.5-9l46 20 40-68-40-30q2-8 2-16t-2-16l40-30-40-68-46 20q-5-5-11.5-9t-14.5-7l-6-50h-80l-6 50q-8 3-14.5 7t-11.5 9l-46-20-40 68 40 30q-2 8-2 16t2 16l-40 30 40 68 46-20q5 5 11.5 9t14.5 7l6 50Zm40-100q-25 0-42.5-17.5T420-520q0-25 17.5-42.5T480-580q25 0 42.5 17.5T540-520q0 25-17.5 42.5T480-460Z" />
                          </svg>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4 col-sm-6 ">
              <div className="artboard">
                <div className="card1">
                  <div className="card__side card__side--back">
                    <div className="card__cover">
                      <h4 className="card__heading">
                        <span className="home-text text-center m-1 p-1">
                          Ready to level up?
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="24"
                            viewBox="0 -960 960 960"
                            width="24"
                          >
                            <path d="M440-800v-120h80v120h-80Zm0 760v-120h80v120h-80Zm360-400v-80h120v80H800Zm-760 0v-80h120v80H40Zm708-252-56-56 70-72 58 58-72 70ZM198-140l-58-58 72-70 56 56-70 72Zm564 0-70-72 56-56 72 70-58 58ZM212-692l-72-70 58-58 70 72-56 56Zm268 452q-100 0-170-70t-70-170q0-100 70-170t170-70q100 0 170 70t70 170q0 100-70 170t-170 70Zm0-80q67 0 113.5-46.5T640-480q0-67-46.5-113.5T480-640q-67 0-113.5 46.5T320-480q0 67 46.5 113.5T480-320Zm0-160Z" />
                          </svg>
                        </span>
                      </h4>
                    </div>
                    <div className="card__details text-center ">
                      <p>
                        Ready to level up? Connect with mentors within the
                        community who can offer guidance and support as you
                        navigate your innovation journey.
                      </p>
                    </div>
                  </div>
                  <div className="card__side card__side--front bg-warning">
                    <div className="card__theme">
                      <div className="card__theme-box">
                        <p className="card__subject home-text typed text-center text-white">
                          Ready to level up?{" "}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="24"
                            viewBox="0 -960 960 960"
                            width="24"
                          >
                            <path d="M440-800v-120h80v120h-80Zm0 760v-120h80v120h-80Zm360-400v-80h120v80H800Zm-760 0v-80h120v80H40Zm708-252-56-56 70-72 58 58-72 70ZM198-140l-58-58 72-70 56 56-70 72Zm564 0-70-72 56-56 72 70-58 58ZM212-692l-72-70 58-58 70 72-56 56Zm268 452q-100 0-170-70t-70-170q0-100 70-170t170-70q100 0 170 70t70 170q0 100-70 170t-170 70Zm0-80q67 0 113.5-46.5T640-480q0-67-46.5-113.5T480-640q-67 0-113.5 46.5T320-480q0 67 46.5 113.5T480-320Zm0-160Z" />
                          </svg>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4 col-sm-6 ">
              <div className="artboard">
                <div className="card1">
                  <div className="card__side card__side--back">
                    <div className="card__cover">
                      <h4 className="card__heading">
                        <span className="home-text text-center m-1 p-1">
                          Share Progress{" "}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="24"
                            viewBox="0 -960 960 960"
                            width="24"
                          >
                            <path d="M580-360q33 0 56.5-23.5T660-440q0-33-23.5-56.5T580-520q-15 0-28.5 5.5T527-500l-107-54v-12l107-54q11 9 24.5 14.5T580-600q33 0 56.5-23.5T660-680q0-33-23.5-56.5T580-760q-33 0-56.5 23.5T500-680v6l-107 54q-11-9-24.5-14.5T340-640q-33 0-56.5 23.5T260-560q0 33 23.5 56.5T340-480q15 0 28.5-5.5T393-500l107 54v6q0 33 23.5 56.5T580-360ZM80-80v-720q0-33 23.5-56.5T160-880h640q33 0 56.5 23.5T880-800v480q0 33-23.5 56.5T800-240H240L80-80Zm126-240h594v-480H160v525l46-45Zm-46 0v-480 480Z" />
                          </svg>
                        </span>
                      </h4>
                    </div>
                    <div className="card__details text-center ">
                      <p>
                        Share your progress with the community! Update your
                        profile with your latest innovations and achievements to
                        inspire others.
                      </p>
                    </div>
                  </div>
                  <div className="card__side card__side--front">
                    <div className="card__theme">
                      <div className="card__theme-box">
                        <p className="card__subject home-text typed text-center text-white">
                          Share Your Progress{" "}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="24"
                            viewBox="0 -960 960 960"
                            width="24"
                          >
                            <path d="M580-360q33 0 56.5-23.5T660-440q0-33-23.5-56.5T580-520q-15 0-28.5 5.5T527-500l-107-54v-12l107-54q11 9 24.5 14.5T580-600q33 0 56.5-23.5T660-680q0-33-23.5-56.5T580-760q-33 0-56.5 23.5T500-680v6l-107 54q-11-9-24.5-14.5T340-640q-33 0-56.5 23.5T260-560q0 33 23.5 56.5T340-480q15 0 28.5-5.5T393-500l107 54v6q0 33 23.5 56.5T580-360ZM80-80v-720q0-33 23.5-56.5T160-880h640q33 0 56.5 23.5T880-800v480q0 33-23.5 56.5T800-240H240L80-80Zm126-240h594v-480H160v525l46-45Zm-46 0v-480 480Z" />
                          </svg>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4 col-sm-6 ">
              <div className="artboard">
                <div className="card1">
                  <div className="card__side card__side--back">
                    <div className="card__cover">
                      <h4 className="card__heading">
                        <span className="home-text text-center m-1 p-1">
                          Join Discussions{" "}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="24"
                            viewBox="0 -960 960 960"
                            width="24"
                          >
                            <path d="M640-280q83 0 141.5-58.5T840-480q0-83-58.5-141.5T640-680q-27 0-52.5 7T540-653q29 36 44.5 80t15.5 93q0 49-15.5 93T540-307q22 13 47.5 20t52.5 7Zm-160-80q19-25 29.5-55.5T520-480q0-34-10.5-64.5T480-600q-19 25-29.5 55.5T440-480q0 34 10.5 64.5T480-360Zm-160 80q27 0 52.5-7t47.5-20q-29-36-44.5-80T360-480q0-49 15.5-93t44.5-80q-22-13-47.5-20t-52.5-7q-83 0-141.5 58.5T120-480q0 83 58.5 141.5T320-280Zm0 80q-117 0-198.5-81.5T40-480q0-117 81.5-198.5T320-760q45 0 85.5 13t74.5 37q34-24 74.5-37t85.5-13q117 0 198.5 81.5T920-480q0 117-81.5 198.5T640-200q-45 0-85.5-13T480-250q-34 24-74.5 37T320-200Z" />
                          </svg>
                        </span>
                      </h4>
                    </div>
                    <div className="card__details text-center ">
                      <p>
                        Engage in meaningful discussions! Participate in forums
                        and join conversations with fellow members to exchange
                        insights and feedback.
                      </p>
                    </div>
                  </div>
                  <div className="card__side card__side--front bg-warning ">
                    <div className="card__theme">
                      <div className="card__theme-box">
                        <p className="card__subject home-text typed text-center text-white">
                          Join Discussions{" "}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="24"
                            viewBox="0 -960 960 960"
                            width="24"
                          >
                            <path d="M640-280q83 0 141.5-58.5T840-480q0-83-58.5-141.5T640-680q-27 0-52.5 7T540-653q29 36 44.5 80t15.5 93q0 49-15.5 93T540-307q22 13 47.5 20t52.5 7Zm-160-80q19-25 29.5-55.5T520-480q0-34-10.5-64.5T480-600q-19 25-29.5 55.5T440-480q0 34 10.5 64.5T480-360Zm-160 80q27 0 52.5-7t47.5-20q-29-36-44.5-80T360-480q0-49 15.5-93t44.5-80q-22-13-47.5-20t-52.5-7q-83 0-141.5 58.5T120-480q0 83 58.5 141.5T320-280Zm0 80q-117 0-198.5-81.5T40-480q0-117 81.5-198.5T320-760q45 0 85.5 13t74.5 37q34-24 74.5-37t85.5-13q117 0 198.5 81.5T920-480q0 117-81.5 198.5T640-200q-45 0-85.5-13T480-250q-34 24-74.5 37T320-200Z" />
                          </svg>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4 col-sm-6 ">
              <div className="artboard">
                <div className="card1">
                  <div className="card__side card__side--back">
                    <div className="card__cover">
                      <h4 className="card__heading">
                        <span className="home-text text-center m-1 p-1">
                          Explore Exclusive Content!{" "}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="text-warning"
                            height="24"
                            viewBox="0 -960 960 960"
                            width="24"
                          >
                            <path d="M480-80q-26 0-47-12.5T400-126q-33 0-56.5-23.5T320-206v-142q-59-39-94.5-103T190-590q0-121 84.5-205.5T480-880q121 0 205.5 84.5T770-590q0 77-35.5 140T640-348v142q0 33-23.5 56.5T560-126q-12 21-33 33.5T480-80Zm-80-126h160v-36H400v36Zm0-76h160v-38H400v38Zm-8-118h58v-108l-88-88 42-42 76 76 76-76 42 42-88 88v108h58q54-26 88-76.5T690-590q0-88-61-149t-149-61q-88 0-149 61t-61 149q0 63 34 113.5t88 76.5Zm88-162Zm0-38Z" />
                          </svg>
                        </span>
                      </h4>
                    </div>
                    <div className="card__details text-center ">
                      <p>
                        Welcome back! Dive into exclusive content curated just
                        for you. Discover new ideas and get inspired by our
                        community of innovators.
                      </p>
                    </div>
                  </div>
                  <div className="card__side card__side--front  ">
                    <div className="card__theme ">
                      <div className="card__theme-box  ">
                        <p className="card__subject home-text typed text-center text-white">
                          Explore {/*  Exclusive Content */}{" "}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="text-warning"
                            height="24"
                            viewBox="0 -960 960 960"
                            width="24"
                          >
                            <path d="M480-80q-26 0-47-12.5T400-126q-33 0-56.5-23.5T320-206v-142q-59-39-94.5-103T190-590q0-121 84.5-205.5T480-880q121 0 205.5 84.5T770-590q0 77-35.5 140T640-348v142q0 33-23.5 56.5T560-126q-12 21-33 33.5T480-80Zm-80-126h160v-36H400v36Zm0-76h160v-38H400v38Zm-8-118h58v-108l-88-88 42-42 76 76 76-76 42 42-88 88v108h58q54-26 88-76.5T690-590q0-88-61-149t-149-61q-88 0-149 61t-61 149q0 63 34 113.5t88 76.5Zm88-162Zm0-38Z" />
                          </svg>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*
          
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
                      <span className="home-text">Feeling inspired?</span>
                    </h4>
                    <p className="description">
                      Start a new project and invite others to join you! Whether
                      it's a passion project or a groundbreaking idea, bring it
                      to life with the support of our community.
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
                  data-color="purple"
                  data-radius="none"
                >
                  <div className="content">
                   
                    <h4 className="title">
                      <span className="home-text">Ready to level up?</span>
                    </h4>
                    <p className="description">
                      Ready to level up? Connect with mentors within the
                      community who can offer guidance and support as you
                      navigate your innovation journey.
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
                  data-color="brown"
                  data-radius="none"
                >
                  <div className="content">
                   
                    <h4 className="title">
                      <span className="home-text">Share Your Progress</span>
                    </h4>
                    <p className="description">
                      Share your progress with the community! Update your
                      profile with your latest innovations and achievements to
                      inspire others.
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
                      <span className="home-text">Join Discussions</span>
                    </h4>
                    <p className="description">
                      Engage in meaningful discussions! Participate in forums
                      and join conversations with fellow members to exchange
                      insights and feedback.
                    </p>
                  </div>
                </div>{" "}
                
              </div>
            </div>
        <div className="row mt-2 ">
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

export default HomeIdeas;
