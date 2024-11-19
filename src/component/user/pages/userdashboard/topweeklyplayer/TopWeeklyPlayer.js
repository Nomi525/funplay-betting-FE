// import React from 'react'
// import Index from '../../../../Index'
// import PageIndex from '../../../../PageIndex'

// export default function TopWeeklyPlayer({type,data}) {
//   console.log(data,"data");
//   function hideEmail(email) {
//     if (!email || email === undefined || email === "") {
//       return "-";
//     } else {
//       const [username, domain] = email?.split("@");
//       if (username && username.length >= 2) {
//         const hiddenUsername = username.substring(0, 2) + "*".repeat(username.length - 2);
//         return hiddenUsername + "@" + domain;
//       } else {
//         // Handle the case where the username is too short to hide
//         return email;
//     }
//   }
// }
// return (
//   <>

//       <Index.Box className="top-weekly-main-component">
//         <Index.Box className="top-weekly-box-main">
//           <Index.Box className="top-weekly-box-inner">
//               <Index.Box className="top-weekly-main-details">
//                   <Index.Typography component='h5' variant='h5' className="title-top-review-player">Top {type} Player</Index.Typography>
//               </Index.Box>
//               <Index.Box className="top-weekly-card-main-details">
//                 <Index.List className="top-week-list">
//                   {data?.map((ele)=>{
//                     return(
//                       <Index.ListItem className="top-week-listitem">
//                       <Index.Box className="card-week-main">
//                           <Index.Box className="top-week-user-main">
//                               <img src={process.env.REACT_APP_IMG + ele?.profile} className='weeklytop' alt="weeklytop"/>
//                               <Index.Box className="verified-email-main">
//                                   <img src={PageIndex.Png.verified} className='verified' alt="verified"/>
//                               </Index.Box>
//                           </Index.Box>
//                           <Index.Box className="top-week-user-details">
//                             <Index.Typography className="week-top-name-title">{ele?.fullName}</Index.Typography>
//                             <Index.Typography className="week-top-id-name">{hideEmail(ele?.email)}</Index.Typography>
//                             <Index.Box className="diamond-score-week">
//                                 <img src={PageIndex.Png.diamond} className='diamond' alt="diamond"/>
//                                 <Index.Typography component='p' variant='p'>12,000 Score</Index.Typography>
//                             </Index.Box>
//                           </Index.Box>

//                       </Index.Box>
//                   </Index.ListItem>
//                     )
//                   })}

//                 </Index.List>
//               </Index.Box>
//           </Index.Box>
//         </Index.Box>
//       </Index.Box>

//     </>
//   )
// };

import React from "react";
import Index from "../../../../Index";
import PageIndex from "../../../../PageIndex";

export default function TopWeeklyPlayer({ type, data }) {
  console.log({ type, data });
  return (
    <>
      <Index.Box className="top-weekly-main-component">
        <Index.Box className="top-weekly-box-main">
          <Index.Box className="top-weekly-box-inner">
            <Index.Box className="top-weekly-main-details">
              <Index.Typography
                component="h5"
                variant="h5"
                className="title-top-review-player"
              >
                Top {type} Player
              </Index.Typography>
            </Index.Box>
            <Index.Box className="top-weekly-card-main-details">
              <Index.List className="top-week-list">
                {data?.map((player) => (
                  <Index.ListItem className="top-week-listitem">
                    <Index.Box className="card-week-main">
                      <Index.Box className="top-week-user-main">
                        <img
                          src={
                            player?.profile
                              // ? "http://localhost:3032/api/images/" + player?.profile
                               ? process.env.REACT_APP_IMG + player?.profile
                              : PageIndex.Png.weeklytop
                          }
                          className="weeklytop"
                          alt="weeklytop"
                        />
                   
                      </Index.Box>
                      <Index.Box className="top-week-user-details">
                          <img
                            src={PageIndex.Png.verified}
                            className="verified"
                            alt="verified"
                          />
                        
                        <Index.Typography className="week-top-name-title">
                          {player?.fullName ||
                            (player?._id
                              ? `CB-99X-${player._id.toString().slice(-2)} `
                              : "")}
                        </Index.Typography>
                        <Index.Typography className="week-top-id-name">
                          
                        </Index.Typography>
                        {/* <Index.Box className="diamond-score-week">
                          <img
                            src={PageIndex.Png.diamond}
                            className="diamond"
                            alt="diamond"
                          />
                          <Index.Typography component="p" variant="p">
                          </Index.Typography>
                        </Index.Box> */}
                      </Index.Box>
                    </Index.Box>
                  </Index.ListItem>
                ))}

                {/* <Index.ListItem className="top-week-listitem">
                  <Index.Box className="card-week-main">
                    <Index.Box className="top-week-user-main">
                      <img
                        src={PageIndex.Png.weeklytop}
                        className="weeklytop"
                        alt="weeklytop"
                      />
                      <Index.Box className="verified-email-main">
                        <img
                          src={PageIndex.Png.verified}
                          className="verified"
                          alt="verified"
                        />
                      </Index.Box>
                    </Index.Box>
                    <Index.Box className="top-week-user-details">
                      <Index.Typography className="week-top-name-title">
                        Simons lomes
                      </Index.Typography>
                      <Index.Typography className="week-top-id-name">
                        @simonslomes_13
                      </Index.Typography>
                      <Index.Box className="diamond-score-week">
                        <img
                          src={PageIndex.Png.diamond}
                          className="diamond"
                          alt="diamond"
                        />
                        <Index.Typography component="p" variant="p">
                          12,000 Score
                        </Index.Typography>
                      </Index.Box>
                    </Index.Box>
                  </Index.Box>
                </Index.ListItem>
                <Index.ListItem className="top-week-listitem">
                  <Index.Box className="card-week-main">
                    <Index.Box className="top-week-user-main">
                      <img
                        src={PageIndex.Png.weeklytop}
                        className="weeklytop"
                        alt="weeklytop"
                      />
                      <Index.Box className="verified-email-main">
                        <img
                          src={PageIndex.Png.verified}
                          className="verified"
                          alt="verified"
                        />
                      </Index.Box>
                    </Index.Box>
                    <Index.Box className="top-week-user-details">
                      <Index.Typography className="week-top-name-title">
                        Simons lomes
                      </Index.Typography>
                      <Index.Typography className="week-top-id-name">
                        @simonslomes_13
                      </Index.Typography>
                      <Index.Box className="diamond-score-week">
                        <img
                          src={PageIndex.Png.diamond}
                          className="diamond"
                          alt="diamond"
                        />
                        <Index.Typography component="p" variant="p">
                          12,000 Score
                        </Index.Typography>
                      </Index.Box>
                    </Index.Box>
                  </Index.Box>
                </Index.ListItem>
                <Index.ListItem className="top-week-listitem">
                  <Index.Box className="card-week-main">
                    <Index.Box className="top-week-user-main">
                      <img
                        src={PageIndex.Png.weeklytop}
                        className="weeklytop"
                        alt="weeklytop"
                      />
                      <Index.Box className="verified-email-main">
                        <img
                          src={PageIndex.Png.verified}
                          className="verified"
                          alt="verified"
                        />
                      </Index.Box>
                    </Index.Box>
                    <Index.Box className="top-week-user-details">
                      <Index.Typography className="week-top-name-title">
                        Simons lomes
                      </Index.Typography>
                      <Index.Typography className="week-top-id-name">
                        @simonslomes_13
                      </Index.Typography>
                      <Index.Box className="diamond-score-week">
                        <img
                          src={PageIndex.Png.diamond}
                          className="diamond"
                          alt="diamond"
                        />
                        <Index.Typography component="p" variant="p">
                          12,000 Score
                        </Index.Typography>
                      </Index.Box>
                    </Index.Box>
                  </Index.Box>
                </Index.ListItem>
                <Index.ListItem className="top-week-listitem">
                  <Index.Box className="card-week-main">
                    <Index.Box className="top-week-user-main">
                      <img
                        src={PageIndex.Png.weeklytop}
                        className="weeklytop"
                        alt="weeklytop"
                      />
                      <Index.Box className="verified-email-main">
                        <img
                          src={PageIndex.Png.verified}
                          className="verified"
                          alt="verified"
                        />
                      </Index.Box>
                    </Index.Box>
                    <Index.Box className="top-week-user-details">
                      <Index.Typography className="week-top-name-title">
                        Simons lomes
                      </Index.Typography>
                      <Index.Typography className="week-top-id-name">
                        @simonslomes_13
                      </Index.Typography>
                      <Index.Box className="diamond-score-week">
                        <img
                          src={PageIndex.Png.diamond}
                          className="diamond"
                          alt="diamond"
                        />
                        <Index.Typography component="p" variant="p">
                          12,000 Score
                        </Index.Typography>
                      </Index.Box>
                    </Index.Box>
                  </Index.Box>
                </Index.ListItem> */}
              </Index.List>
            </Index.Box>
          </Index.Box>
        </Index.Box>
      </Index.Box>
    </>
  );
}
