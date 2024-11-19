import React from "react";
import { MaticBetting,USDT,BNBBetting,BUSDT,ETHBetting,EUSDT } from "./AddressHelper";
import MaticBettingABi from "./abis/MaticBetting.json";
import usdt from "./abis/usdt.json";
import BNBBettingabi from "../Connectivity/abis/BNBBetting.json"
import BUSDTAbi from "./abis/BUSDT.json"
import ETHBettingAbi from "./abis/ETHBetting.json"
import EUSDTAbi from "./abis/EUSDT.json"
import { Signer, ethers } from "ethers";


export const DepositAndWithdrawObj = async (Signer) => {
    return new ethers.Contract(MaticBetting, MaticBettingABi.abi, Signer);
}

export const USDTObj = async(Signer) =>{
    return new ethers.Contract(USDT,usdt.abi,Signer);
}

export const BNBBettingObje = async(Signer) =>{
    return new ethers.Contract(BNBBetting,BNBBettingabi.abi,Signer)
}

export const BUSDTObj = async (Signer)=>{
    return new ethers.Contract(BUSDT,BUSDTAbi.abi,Signer)
}

export const ETHBettingObj = async (Signer) =>{
    return new ethers.Contract(ETHBetting,ETHBettingAbi.abi,Signer)
}

export const EUSDTObj = async(Signer) =>{
    return new ethers.Contract(EUSDT,EUSDTAbi.abi,Signer)
}
