import React, { useState, useEffect, useRef } from "react";
import PagesIndex from "../../../pageIndex";
import Index from "../../../Index";
import {
  DepositAndWithdrawObj,
  USDTObj,
  BNBBettingObje,
  BUSDTObj,
  ETHBettingObj,
  EUSDTObj,
} from "../../../../component/user/Connectivity/ContractObject";
import { useEthersSigner } from "../../../../component/user/Connectivity/WalletSignerprovider";
import { useDisconnect, useWeb3ModalAccount } from "@web3modal/ethers5/react";
import { ethers } from "ethers";
import {
  MaticBetting,
  USDT,
  BNBBetting,
  BUSDT,
  ETHBetting,
  EUSDT,
} from "../../../../component/user/Connectivity/AddressHelper";
import { Formik } from "formik";
import { userWithdrawal } from "../../../../validation/Validation";
import { toast } from "react-toastify";
import DataService from "../../../../config/DataService";
import { Api } from "../../../../config/Api";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Withdrawl = ({ setOpenWithdraw, userTotalAmountData }) => {
  const [walletAddress, setWalletAddress] = useState("");
  const [signeraccount, setsigneraccount] = useState();
  const userDetail = useSelector((state) => state?.UserReducer?.userData);
  const userToken = useSelector((state) => state?.UserReducer?.token);
  const [isDisabled, setIsDisabled] = useState(false);
  const navigate = useNavigate();
  // const { address } = useAccount();
  const withdrawRef = useRef();
  const { address } = useWeb3ModalAccount();
  const signer = useEthersSigner();

  console.log(signer, "4343");

  useEffect(() => {
    if (address) {
      setWalletAddress(address);
      setsigneraccount(signer);
    }
  }, [address]);

  // user withdrawal api call
  const userWithDraw = (values) => {
  //   const selectedNetwork = networkArr?.find(
  //    (ele) => ele?.chain_id == values?.network
  //  );
    let data = {
      tokenName: values?.network,
      withdrawalAmount : values?.value,
      walletAddress: address,
      type: "Crypto Currency"
      // networkChainId:value?.Network,
      // tokenAmount:value?.value
    };

    DataService.post(Api.User.MANUAL_WITHDRAWL_REQUEST, data)
      .then((res) => {
        toast.success(res?.data?.message, {
          toastId: "customId",
        });

        setOpenWithdraw(false);
        userTotalAmountData();
        navigate("/user");
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message, {
          toastId: "customId",
        });
        // navigate("/user");
      });
  };

  let networkArr = [
    {
      chain_id: 0,
      network_type: "Bitcoin",
    },
    {
      chain_id: 97,
      network_type: "BNB",
    },

    {
      chain_id: 80001,
      network_type: "Polygon",
    },

    {
      chain_id: 11155111,
      network_type: "Ethereum",
    },
    // {
    //   chain_id: 80001,
    //   network_type: "USD(Polygon)",
    // },
    // {
    //   chain_id: 97,
    //   network_type: "BUSD",
    // },
    // {
    //   chain_id: 11155111,
    //   network_type: "USD(Ethereum)",
    // },
  ];

  // const userTotalAmountData = () => {
  //   DataService.get(Api.User.USER_AMOUNT_DEPOSIT)
  //     .then((res) => {
  //       setTotalAmount(res?.data?.data?.tokenDollorValue);
  //     })
  //     .catch((error) => { });
  // };

  // const withDrawal = async (values) => {
  //   console.log("123:",{values});
  //   setIsDisabled(true);
  //   const selectedNetwork = networkArr?.find(
  //     (ele) => ele?.chain_id == values?.network
  //   );
    
  //   navigate(
  //     `/user/withdraw?network=${selectedNetwork?.network_type}&chainId=${selectedNetwork?.chain_id}&userId=${userDetail?._id}&amount=${values.value}&code=${userToken}`
  //   );

  //   try {
  //     const depositobj = await DepositAndWithdrawObj(signer);
  //     const usdtobj = await USDTObj(signer);
  //     const bnbobj = await BNBBettingObje(signer);
  //     const busdtobj = await BUSDTObj(signer);
  //     const ethbettingobj = await ETHBettingObj(signer);
  //     const eusdt = await EUSDTObj(signer);

  //     const priceInWei = ethers.utils.parseEther(values?.value).toString();
  //     let polygonWithdraw;
  //     let maticusdtwithdraw;
  //     let bnbwithdraw;
  //     let busdtWithdraw;
  //     let ethWithdraw;
  //     let eusdtwithdraw;
  //     if (selectedNetwork.network_type === "Polygon") {
  //       polygonWithdraw = await depositobj.withdraw(address, 0, priceInWei);
  //       userWithDraw(values, selectedNetwork);
  //       setOpenWithdraw(false);
  //     } else if (selectedNetwork.network_type === "USD(Polygon)") {
  //       // approve1 = await usdtobj.approve(DepositAndWithdraw, priceInWei);
  //       // await approve1.wait();
  //       maticusdtwithdraw = await depositobj.withdraw(address, 1, priceInWei);
  //       userWithDraw(values, selectedNetwork);
  //       setOpenWithdraw(false);
  //     } else if (selectedNetwork.network_type === "BNB") {
  //       bnbwithdraw = await bnbobj.withdraw(address, 0, priceInWei);
  //       userWithDraw(values, selectedNetwork);
  //       setOpenWithdraw(false);
  //     } else if (selectedNetwork.network_type === "BUSD") {
  //       busdtWithdraw = await bnbobj.withdraw(address, 1, priceInWei);
  //       userWithDraw(values, selectedNetwork);
  //       setOpenWithdraw(false);
  //     } else if (selectedNetwork.network_type === "Ethereum") {
  //       ethWithdraw = await ethbettingobj.withdraw(address, 0, priceInWei);
  //       userWithDraw(values, selectedNetwork);
  //       setOpenWithdraw(false);
  //     } else if (selectedNetwork.network_type === "USD(Ethereum)") {
  //       eusdtwithdraw = await ethbettingobj.withdraw(address, 1, priceInWei);
  //       userWithDraw(values, selectedNetwork);
  //       setOpenWithdraw(false);
  //     } else {
  //       alert("Please Select Network");
  //     }
  //   } catch (error) {
  //     console.log(error, "error");
  //     toast.error(error?.data?.message);
  //     // alert(error?.error?.data?.message);
  //   }
  // };

  const initialValues = {
    network: "",
    value: "",
    // address: ""
  };

  return (
    <Index.Box className="signin-main-content">
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={userWithdrawal}
        onSubmit={userWithDraw}
        innerRef={withdrawRef}
      >
        {({
          values,
          handleChange,
          handleBlur,
          handleSubmit,
          touched,
          errors,
          setFieldValue,
        }) => (
          <form onSubmit={handleSubmit}>
            <Index.Box className="comman-details-auth-user">
              <Index.Box className="form-control-details-auth">
                <Index.Box className="withdrawal-details-main mb-30px-form">
                  <Index.Typography
                    className="user-auth-details-comman user-login-password"
                    variant="p"
                    component="p"
                  >
                    Network
                  </Index.Typography>
                  <Index.FormControl className="formcontrol_login ">
                    <Index.Select
                      displayEmpty
                      name="network"
                      onBlur={handleBlur}
                      value={values?.network}
                      onChange={handleChange}
                      className="network-ul-details"
                      defaultValue=""
                      renderValue={
                        values?.network !== ""
                          ? undefined
                          : () => "Select network"
                      }
                    >
                      {networkArr.map((ele) => {
                        return (
                          <Index.MenuItem
                            key={ele?.network_type}
                            value={ele?.network_type}
                            className="menuitem"
                          >
                            {ele?.network_type}
                          </Index.MenuItem>
                        );
                      })}
                    </Index.Select>
                  </Index.FormControl>
                  {errors?.network && touched?.network && (
                    <Index.FormHelperText error>
                      {errors?.network}
                    </Index.FormHelperText>
                  )}
                </Index.Box>
                <Index.Box className="mb-30px-form">
                  <Index.Typography
                    className="user-auth-details-comman user-login-password"
                    variant="p"
                    component="p"
                  >
                    value
                  </Index.Typography>
                  <Index.TextField
                    className="form-control custom-auth-user-control form-control-icon-left"
                    name="value"
                    onBlur={handleBlur}
                    value={values.value}
                    onChange={(e) => {
                      !isNaN(e?.target?.value) && handleChange(e);
                    }}
                    // inputProps={{ maxLength: 5 }}
                    placeholder="Enter value"
                  />
                  {errors?.value && touched?.value && (
                    <Index.FormHelperText error>
                      {errors?.value}
                    </Index.FormHelperText>
                  )}
                </Index.Box>

                <Index.Box className="mb-30px-form">
                  <Index.Typography
                    className="user-auth-details-comman user-login-password"
                    variant="p"
                    component="p"
                  >
                    Address
                  </Index.Typography>
                  <Index.TextField
                    className="form-control custom-auth-user-control form-control-icon-left"
                    name="address"
                    value={`${address?.slice(0, 2)}**********${address?.slice(
                      -2
                    )}`}
                    disabled
                  />
                </Index.Box>
              </Index.Box>

              <Index.Box className="btn-list-login-content">
                <Index.Box className="login-btn-list">
                  <PagesIndex.BlueButton
                    type="submit"
                    className="blue-btn-content"
                    onClick={() => setFieldValue("network", values?.network)}
                    btnLabel="Submit"
                    disabled={isDisabled}
                  />
                </Index.Box>
              </Index.Box>
            </Index.Box>
          </form>
        )}
      </Formik>
    </Index.Box>
  );
};

export default Withdrawl;
