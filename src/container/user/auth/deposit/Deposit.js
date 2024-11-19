import PageIndex from "../../../../component/PageIndex";
import Index from "../../../Index";
import React, { useState, useEffect } from "react";
import {
  DepositAndWithdrawObj,
  USDTObj,
  BNBBettingObje,
} from "../../../../component/user/Connectivity/ContractObject";
import { useEthersSigner } from "../../../../component/user/Connectivity/WalletSignerprovider";
import { useAccount } from "wagmi";
import { ethers } from "ethers";
import { MaticBetting } from "../../../../component/user/Connectivity/AddressHelper";
import { useSelector } from "react-redux";

const Deposit = () => {
  const userToken = useSelector((state) => state?.UserReducer?.token);
  const [walletAddress, setWalletAddress] = useState("");
  const [signeraccount, setsigneraccount] = useState();
  const [selectedValue, setSelectedValue] = useState("");
  const [depositAmount, setDepositAmount] = useState("");
  const account = useAccount();
  const signer = useEthersSigner();

  useEffect(() => {
    if (account) {
      setWalletAddress(account.address);
      setsigneraccount(signer);
    }
  }, [account]);

  const handleItemClick = (value) => {
    setSelectedValue(value);
  };
  const changeHandle = (e) => {
    setDepositAmount(e.target.value);
  };
  const Deposit = async () => {
    try {
      const depositobj = await DepositAndWithdrawObj(signeraccount);

      const usdtobj = await USDTObj(signeraccount);
      const bnbobj = await BNBBettingObje(signeraccount);
      const priceInWei = ethers.utils.parseEther(depositAmount).toString();
      let deposit;
      let approve1;
      let bnbDeposit;
      if (selectedValue === 0) {
        deposit = await depositobj.Deposit(selectedValue, priceInWei, {
          value: priceInWei,
        });
      } else if (selectedValue === 1) {
        approve1 = await usdtobj.approve(MaticBetting, priceInWei);
        await approve1.wait();
        deposit = await depositobj.Deposit(selectedValue, priceInWei);
      } else if (selectedValue === 3) {
        bnbDeposit = await bnbobj.Deposit(priceInWei, { value: priceInWei });
      }
    } catch (error) {}
  };
  return (
    <Index.Box className="signin-main-content">
      <Index.Box className="signin-content-details">
        <Index.Typography
          className="user-auth-title-comman"
          variant="h6"
          component="h6"
        >
          Deposit
        </Index.Typography>
      </Index.Box>

      <Index.Box className="comman-details-auth-user">
        <Index.Box className="form-control-details-auth mb-30px-form">
          <Index.Typography
            className="user-auth-details-comman user-login-password"
            variant="p"
            component="p"
          >
            Network
          </Index.Typography>
          <Index.Box className="icon-position-rel  deposit_network ">
            <Index.FormControl className="formcontrol_login ">
              <Index.Select displayEmpty>
                <Index.MenuItem
                  value={"BNB"}
                  onClick={() => handleItemClick(3)}
                >
                  Binance Coin(BNB)
                </Index.MenuItem>
                <Index.MenuItem value={"BTC"}>Bitcoin(BTC)</Index.MenuItem>
                <Index.MenuItem
                  value={" USDT "}
                  onClick={() => handleItemClick(1)}
                >
                  USDT
                </Index.MenuItem>
                <Index.MenuItem
                  value={" matic "}
                  onClick={() => handleItemClick(0)}
                >
                  Poylgon(matic)
                </Index.MenuItem>
              </Index.Select>
            </Index.FormControl>
          </Index.Box>
          <Index.Box className="icon-position-rel">
            <Index.Typography
              className="user-auth-details-comman user-login-password"
              variant="p"
              component="p"
            >
              value
            </Index.Typography>
            <Index.TextField
              className="form-control custom-auth-user-control form-control-icon-left"
              onChange={changeHandle}
            />

            <Index.Box className="icon-pos-top-control">
              <img src={PageIndex.Svg.mailicon} className="mail-icon-main" />
            </Index.Box>
          </Index.Box>
        </Index.Box>
        <Index.Box className="form-control-details-auth mb-30px-form"></Index.Box>
        <Index.Box className="btn-list-login-content">
          <Index.Box className="login-btn-list">
            <PageIndex.BlueButton
              type="submit"
              className="blue-btn-content"
              btnLabel="Submit"
              onClick={() => Deposit()}
            />
          </Index.Box>
        </Index.Box>
      </Index.Box>
    </Index.Box>
  );
};

export default Deposit;
