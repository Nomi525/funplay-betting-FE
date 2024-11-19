import { Magic } from "magic-sdk"


export const magic = new Magic("pk_live_8D2E6BBD24A02DD4", {
  network: {
    rpcUrl: "https://rpc-mumbai.maticvigil.com/",
    chainId: 80001,
  },
})