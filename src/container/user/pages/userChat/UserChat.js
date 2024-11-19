// import React, { useEffect, useRef, useState } from "react";

// import DataService from "../../../../config/DataService";
// import { Api } from "../../../../config/Api";
// import Index from "../../../Index";
// import PageIndex from "../../../pageIndex";
// import moment from "moment";
// import { io } from "socket.io-client";
// import { useSelector } from "react-redux";
// import { useOutletContext } from "react-router-dom";
// // // const ENDPOINT = "http://192.168.1.7:3032";
// // // const ENDPOINT = "https://bett.appworkdemo.com";
// // const ENDPOINT = "https://betting.appworkdemo.com";

// var socket;


// const UserChat = ({ setOpen }) => {


//   const user = useSelector((state) => state.UserReducer.userData);
//   const userToken = useSelector((state) => state?.UserReducer?.token);
//   // const socket = useSocket();
//   const messagesEndRef = useRef(null);
//   const [message, setMessage] = useState("");
//   const imageInputRef = useRef(null);

//   const [selectedImage, setSelectedImage] = useState(null);
//   const [chat, setChat] = useState([]);
//   const [isImage, setIsImage] = useState(false);
//   const [
//     openLoginModal,
//     setOpenLoginModal,
//     gameRules,
//     setGameRules, 
//     userGameId,
//     setUserGameId,
//     date,
//     setDate,
//     gameRuleError,
//     setGameRuleError,
//     totalAmount,
//     setTotalAmount,
//     openModal,
//     setOpenModal,
//     walletAddress,
//     setWalletAddress,
//     openDeposit,
//     setOpenDeposit,
//     handleOpen,
//     openChatDrawer,
//     setOpenChatDrawer
//   ] = useOutletContext();
//   const executeScroll = () => {
//     messagesEndRef.current?.scrollIntoView();
//   };
//   const referralCode = useSelector(
//     (state) => state?.UserReducer?.userData?.referralCode
//   );

//   useEffect(() => {
//     socket = io(Api.common.BASE_URL);

//     setTimeout(() => {
//       executeScroll();
//     }, 100);

//     return () => {
//       socket.disconnect();
//     };
//   }, []);

//   useEffect(() => {
//     let data = {
//       room_id: 1,
//       user_id: user?._id,
//     };
//     socket.emit("JoinChat", data);

//     // Listen for messages
//     socket.on("Message", (chat) => {
//       setChat(chat);
//       messagesEndRef?.current?.scrollTo(0, messagesEndRef?.current?.scrollHeight);
//     });

//     // Clean up event listener
//     return () => {
//       socket.off("Message");
//     };
//   }, [isImage]);

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     setSelectedImage(file);
//   };
//   const handleCameraButtonClick = () => {
//     imageInputRef.current.click();
//   };

//   const SendMessage = (e) => {
//     e.preventDefault();
//     if (message != "") {
//       let data = {
//         room_id: 1,
//         user_id: user?._id,
//         message: message,
//       };
//       setMessage("");
//       socket.emit("NewMessage", data);
//     }

//     if (selectedImage) {
//       const data = new FormData();
//       data.append("image", selectedImage);
//       data.append("user_id", user?._id);
//       data.append("room_id", 1);
//       data.append("message", message);
//       DataService.post(Api.common.CHAT_IMAGE_UPLOAD, data)
//         .then((res) => {
//           // toast.success("Image uploaded");
//           setIsImage(true);
//           setChat(res?.data?.data[0].messages);
//           setSelectedImage(null);
//         })
//         .catch((err) => {
//           console.log(err);
//         });
//     }

//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//     executeScroll();
//   };

//   const getRandomNoFromStr = (str) => {
//     if (!str) return;
//     let n = "";
//     for (let char of str) {
//       if (!isNaN(char)) n += char;
//     }
//     return n + "-BD";
//   };

//   const [screenSize, setScreenSize] = useState({
//     width: 0,
//     height: 0,
//   });

//   // Function to update screen size
//   const updateScreenSize = () => {
//     setScreenSize({
//       width: window.innerWidth,
//       height: window.innerHeight,
//     });
//   };

//   useEffect(() => {
//     updateScreenSize();
//   }, []);

//   const formatTime = (timeStamp) => {
//     const now = moment(); // current date and time
//     const messageDate = moment(timeStamp);
//     const formattedTime = now.isSame(messageDate, "day")
//       ? messageDate.calendar() // today
//       : messageDate.format("DD/MM/YYYY h:mm A");
//     return formattedTime;
//   };

//   // useEffect(() => {
//   //   const handleResize = () => {
//   //     const isMobile = window.innerWidth < 992;
//   //     messagesEndRef?.current?.scrollTo(0, messagesEndRef?.current?.scrollHeight);
//   //     setOpenChatDrawer(isMobile ? true : false); // Close the drawer on mobile, open on desktop
//   //   };

//   //   // Add resize event listener to update state on window resize
//   //   window.addEventListener("resize", handleResize);

//   //   // Initial setup on component mount
//   //   handleResize();

//   //   // Cleanup event listener on component unmount
//   //   return () => {
//   //     window.removeEventListener("resize", handleResize);
//   //   };
//   // }, []);

//   const isGuestUser = ()=>{
//     if(!referralCode){
//       setOpenLoginModal(true);
//       return true;
//     }
//     return false;
//   }


// console.log("openChatDrawer: ", openChatDrawer)

//   return (
//     <>

//       <Index.Box
//         onClick={() => {
//           document.body.classList[!openChatDrawer ? "add" : "remove"](
//             "chat-override"
//           );
//           // setOpen(false);
//           // setOpenChatDrawer(!openChatDrawer)
//         }}
//         class={!openChatDrawer ? "chat-overlay-section chat-mobile-show chat-overlay-mobile-active" : "chat-overlay-section chat-mobile-show"
//         }
//         id="overlays"
//       >
//         {" "}
//       </Index.Box>

//       <Index.Box
//         className="chat-details-inner"
//         id={"chat-content"}
//       >
//         <Index.Box class="chat-container">
//           <Index.Box className="main-chat-back">
//             <Index.Box className="chat-head">
//               <Index.Box className="chat-heading-text">
//                 <Index.Typography className="chat-heading-main-text">
//                   <Index.Box className="chat-betting-main">
//                     <img
//                       src={PageIndex.Svg.chat}
//                       className="chat-icon"
//                       alt="chat"
//                     />
//                   </Index.Box>
//                   Community chat
//                 </Index.Typography>
//                 <Index.Button className="add-chat-cancel"
//                   onClick={() => {
//                     setOpenChatDrawer(!openChatDrawer)
//                   }}
//                 >
//                   <img src={PageIndex.Png.close} className="close-icons"></img>
//                 </Index.Button>
//               </Index.Box>
//             </Index.Box>
//             <Index.Box class="chatbox" ref={messagesEndRef}>
//               {chat?.map((row) => (
//                 <Index.Box className="chat-gaming-content">
//                   {/* me */}
//                   {/* <Index.Box className="common-chat-content-details right-user-chat">
//                     <Index.Box className="chat-user-flex">
//                       <Index.Box className="user-icons-chat">
//                         <img
//                           src={PageIndex.Png.usericon}
//                           className="chat-icon-list"
//                         ></img>
//                       </Index.Box>
//                       <Index.Typography
//                         variant="p"
//                         component="p"
//                         className="description-chat-live"
//                       >
//                         <span className="user-chat-timing"> 5:30 PM</span>
//                         <span className="user-naming">Zoya</span>
//                         Lorem Ipsum{" "}
//                       </Index.Typography>
//                     </Index.Box>
//                   </Index.Box> */}
//                   {row?.user_id?._id === user?._id ? (
//                     // me
//                     <Index.Box className="common-chat-content-details">
//                       <Index.Box className="chat-user-flex chat-right">
//                         {/* <Index.Box className="user-icons-chat">
//                           <img
//                             src={PageIndex.Png.usericon}
//                             className="chat-icon-list"
//                           ></img>
//                         </Index.Box> */}
//                         <Index.Typography
//                           variant="p"
//                           component="p"
//                           className="description-chat-live"
//                         >
//                           <Index.Box className="chat-images">
//                             {row?.image && (
//                               <img
//                                 // src={"http://localhost:3032/api/images/" + row?.image}
//                                 src={process.env.REACT_APP_IMG + row?.image}
//                                 className="uploaded-img"
//                               />
//                             )}
//                           </Index.Box>
//                           <Index.Box className="user-chat-msg">
//                             {row.message}
//                           </Index.Box>
//                           <Index.Box className="user-chat-timing">
//                             {/* {moment(row?.time).calendar()} */}
//                             {formatTime(row?.time)}
//                           </Index.Box>
//                         </Index.Typography>
//                       </Index.Box>
//                     </Index.Box>
//                   ) : (
//                     // sender
//                     <Index.Box className="common-chat-content-details left-user-chat">
//                       <Index.Box className="chat-user-flex">
//                         <Index.Box className="user-icons-chat">
//                           <img
//                             src={
//                               row.user_id?.profile
//                                 ? process.env.REACT_APP_IMG + row.user_id?.profile
//                                 // ? "http://localhost:3032/api/images/" + row.user_id?.profile
//                                 : PageIndex.Png.usericon
//                             }
//                             className="chat-icon-list"
//                           ></img>
//                         </Index.Box>
//                         <Index.Typography
//                           variant="p"
//                           component="p"
//                           className="description-chat-live"
//                         >
//                           <Index.Box className="user-naming">
//                             {row?.from ||
//                               (row?.user_id
//                                 ? `CB-99X-${row.user_id.toString().slice(-2)} `
//                                 : "")}
//                           </Index.Box>
//                           <Index.Box className="chat-images">
//                             {row?.image && (
//                               <img
//                                 // src={"http://localhost:3032/api/images/" + row?.image}
//                                 src={process.env.REACT_APP_IMG + row?.image}
//                                 className="uploaded-img"
//                               />
//                             )}
//                           </Index.Box>
//                           <Index.Box className="user-chat-msg">
//                             {row.message}
//                           </Index.Box>
//                           <Index.Box className="user-chat-timing">
//                             {/* {moment(row?.time).calendar()} */}
//                             {formatTime(row?.time)}
//                           </Index.Box>
//                         </Index.Typography>
//                       </Index.Box>
//                     </Index.Box>
//                   )}
//                 </Index.Box>
//               ))}

//               {/* {chat?.map((row) => {
//                 console.log(row?.time, "114");
//                 return (
//                   <>
//                     <Index.Box className="msg-details-chat">
//                       <Index.Box className="msg">
//                         <Index.Box className="chat-img-box">
//                           <img src={PageIndex.Png.usericon} alt="" />
//                         </Index.Box>

//                         <Index.Box className="msg-box">
//                           <Index.Box className="user-name-box">
//                             <Index.Typography className="user-name">
//                               {row?.from ||
//                                 (row?.user_id
//                                   ? `CB-99X-${row.user_id
//                                     .toString()
//                                     .slice(-2)} `
//                                   : "")}
//                             </Index.Typography>
//                             <Index.Typography className="message">
//                               {row?.image && (
//                                 <img
//                                   src={process.env.REACT_APP_IMG + row?.image}
//                                   className="uploaded-img"
//                                 />
//                               )}
//                               {row?.message}
//                             </Index.Typography>
//                           </Index.Box>
//                           <Index.Typography className="timestamp">
//                             {moment(row?.time).calendar()}
//                           </Index.Typography>
//                         </Index.Box>
//                       </Index.Box>
//                     </Index.Box>
//                   </>
//                 );
//               })} */}

//               <div ref={messagesEndRef} className="scrolldiv" />
//             </Index.Box>
//           </Index.Box>

//           <Index.Box className="bottom-sent-chat">
//             {/* <Index.Box className="upload-main-user">
//                 <Index.Box className="upload-image-box">
//                   {selectedImage ? (
//                     <img
//                       src={URL.createObjectURL(selectedImage)}
//                       className="uploaded-img"
//                     />
//                   ) : (
//                     <></>
//                   )}
//                 </Index.Box>
//               </Index.Box> */}
//             <form
//               onSubmit={(e) => {
//                 e.preventDefault();
//               }}
//             >
//               <Index.Box className="input-design-div user-chat-input-main with-border chat-top-border" onClick={isGuestUser}>
//                 <Index.TextField
//                   className="admin-input-design input-placeholder user-chat-input"
//                   fullWidth
//                   placeholder="Enter your message..."
//                   // disabled={!userToken}
//                   value={message}
//                   onKeyUp={(e) => {
//                     if (e.key == "Enter") SendMessage(e);
//                   }}
//                   onChange={(e) => {
//                     if(!isGuestUser()){
//                       setMessage(e.target.value);
//                     }
//                   }}
//                 // InputProps={{
//                 //   endAdornment: (
//                 //     <Index.InputAdornment position="end">
//                 //       <input
//                 //         type="file"
//                 //         accept="image/*"
//                 //         hidden
//                 //         onChange={(e) => handleImageChange(e)}
//                 //         ref={imageInputRef}
//                 //       />

//                 //     </Index.InputAdornment>
//                 //   ),
//                 // }}
//                 />
//                 <Index.Box className="chat-icon-details">
//                   <input
//                     type="file"
//                     accept="image/*"
//                     hidden
//                     onChange={(e) => handleImageChange(e)}
//                     ref={imageInputRef}
//                   />
//                   <Index.IconButton
//                     type="button"
//                     edge="end"
//                     className="camera-icon-box"
//                     onClick={() => handleCameraButtonClick()}
//                     disabled={!userToken}
//                   >
//                     <Index.UploadFileIcon className="camera-icon" />
//                   </Index.IconButton>
//                   <Index.IconButton
//                     edge="end"
//                     className="send-icon-box"
//                     type="button"
//                     disabled={!userToken}
//                   >
//                     <Index.SendIcon
//                       className="send-icon"
//                       onClick={(e) => SendMessage(e)}
//                     />
//                   </Index.IconButton>
//                 </Index.Box>
//               </Index.Box>
//             </form>
//           </Index.Box>
//         </Index.Box>
//       </Index.Box>
//     </>

//     // <></>
//   );
// };

// export default UserChat;
