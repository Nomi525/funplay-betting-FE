import React, { useEffect, useRef, useState } from "react";
import Index from "../../../Index";
import PageIndex from "../../../PageIndex";
import moment from "moment";
import { Api } from "../../../../config/Api";
import DataService from "../../../../config/DataService";
import { io } from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getTotalCoins } from "../../../../redux/user/userReducer";

// const ENDPOINT = "http://192.168.1.7:3032";
const ENDPOINT = "https://bett.appworkdemo.com";
var socket;
const UserNotificationPanel = ({
  open,
  handleNotificationPanel,
  setShowNotificationBadge,
}) => {
  const [notifications, setNotifications] = useState([]);
  const user = useSelector((state) => state.UserReducer.userData);
  const dispatch = useDispatch();
  const getNotifications = async () => {
    await DataService.get(Api.User.GET_NOTIFICATIONS)
      .then((res) => {
        // setLoading(false);
        setNotifications(res?.data?.data);
        // setFilterData(res?.data?.data);
      })
      .catch((err) => {
        // setLoading(false);
        console.log(err);
      });
  };

  const clearNotifications = async () => {
    try {
      const res = await DataService.post(Api.User.DELETE_NOTIFICATION);
      if (res?.data?.status === 200) {
        // toast.success(res?.data?.message);
        await getNotifications();
      }
    } catch (e) {
      toast.error(
        e.response?.data?.message ? e.response?.data?.message : e.message
      );
    }
  };

  // useEffect(() => {
  //   socket = io(ENDPOINT);
  //   return () => {
  //     socket.disconnect();
  //   };
  // }, []);
  useEffect(() => {
    getNotifications();
  }, [open]);

  useEffect(() => {
    getNotifications();
    socket = io(Api.common.BASE_URL);
    let data = {
      room_id: 2,
      userId: user?._id,
    };
    socket.emit("join-notification-room", data);
    socket.on("new-notification", async (notifcation) => {
      console.log("47 new notification");
      await getNotifications();
      dispatch(getTotalCoins());
      setShowNotificationBadge(true);
    });
    return () => {
      socket.off("new-notification");
    };
  }, []);

  // useEffect(()=>{
  //   socket.on("new-notification", async (notifcation) => {
  //     await getNotifications()
  //   });
  // })

  const showShortName = (text) =>{
      const [name, ext] = text.split(".");
      return name.substring(0, 5) + "." + ext;
  }

  return (
    <Index.Drawer
      anchor="right"
      open={open}
      onClose={handleNotificationPanel}
      className="notification-drawer"
    >
      <Index.Box className="notification-container">
        <Index.Box className="notification-head">
          <Index.Box className="notification-heading-text">
            {notifications?.length ? (
              <PageIndex.BlueButton
                btnLabel="Clear Notifications"
                className="notification-btn"
                type="button"
                onClick={clearNotifications}
              />
            ) : (
              <Index.Typography className="" color="#fff">
                No new notifications
              </Index.Typography>
            )}
          </Index.Box>
        </Index.Box>
        <Index.Box className="notification-list">
          {notifications?.map((row) => {
            return (
              <Index.Box key={row._id} className={`notification-box`}>
                {/* <Index.Box className=""> */}
                <Index.Box className="user-name-box">
                  <Index.Typography className="title">
                    {row.title}
                  </Index.Typography>
                  <Index.Typography className="notification-description">
                    {row?.description}
                  </Index.Typography>
                  {row?.image && (
                    <Index.Typography pt="2px">
                      <span className="notification-img"
                        onClick={() => {
                          window.open(
                            `${process.env.REACT_APP_IMG + row?.image}`
                          );
                        }}
                        // onClick={() => {
                        //   window.open(
                        //     `${
                        //       "http://localhost:3032/api/images/" +
                        //       row?.image
                        //     }`
                        //   );
                        // }}
                      >
                        {row?.image != "" ? showShortName(row?.image) : "-"}
                      </span>
                    </Index.Typography>
                  )}
                </Index.Box>
                <Index.Typography className="timestamp">
                  {moment(row?.createdAt).calendar()}
                </Index.Typography>
                {/* </Index.Box> */}
              </Index.Box>
            );
          })}
        </Index.Box>
      </Index.Box>
    </Index.Drawer>
  );
};

export default UserNotificationPanel;
