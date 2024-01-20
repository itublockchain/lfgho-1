"use client";
import React from "react";
import dynamic from "next/dynamic";
import { useModal } from "connectkit";
import { useAccount, useDisconnect } from "wagmi";
// import { ConnectButton } from "orangekit";
import Image from "next/image";

const Page = () => {
    
    const { isConnected, address, isConnecting } = useAccount();
  const { setOpen } = useModal();
  const { disconnect } = useDisconnect();
  
  
  
  
  
  
  // if (isConnecting) return <p>Connecting...</p>;
  return (
    <div id="anasayfa" className="p=20 flex justify-between    ">
      <>
        <div className="flex   space-x-8 justify-center items-center  ">
          <Image
            src={"/boo.png"}
            alt=""
            width={100}
            height={50}
            className="pb-10"
          ></Image>
          <button className="bg-[#99DDE2] text-black font-sans  font-bold border-black border-[3px]
          border-solid px-6 py-1 rounded-2xl textcolor-white"
      onClick={() => setOpen(true)}>
        <a href="/">Home</a>
      </button>
      <button className="bg-[#ffffff] text-black font-sans  font-bold border-black border-[3px]
          border-solid px-6 py-1 rounded-2xl textcolor-white"
      onClick={() => setOpen(true)}>
        <a href="/payback">Payback</a>
      </button>
        </div>

        <div className="flex space-x-5  mt-10 mr-8">
          {!isConnected && (
            <button
              className="bg-[#99DDE2] text-black font-sans font-bold border-black border-[3px]
          border-solid border-l-8 border-b-8  rounded-md textcolor-white px-5 py-1 h-11
          "
              onClick={() => setOpen(true)}
            >
              Connect Wallet
            </button>
          )}
          {isConnected && (
            <div>
              <p>Connected Wallet: {address}</p>
              <button onClick={() => disconnect()}>Disconnect</button>
            </div>
          )}

          <div
            className="absolute top-[40%] left-[50%] translate-y-[-50%] translate-x-[-50%] text-sm/[24px] font-bold
       bg-[#8AF3FB] p-30 rounded-[10px] shadow-[100px_35px_35px_-15px_rgba(0,0,0,0)]  border-l-8 border-b-8 border-black text-center mb-32 
        w-[500px] h-[300px]  justify-center  flex flex-col items-center   "
          >
            <div className="flex mb-14  space-x-8">
              <div className="flex-col flex">
                <div className="bg-white border-black border-[3px] rounded-full h-[77px] bg-[url('/BTC_LOGO.jpeg')] bg-center bg-no-repeat bg-cover  "></div>
                <p className="text-black font-bold font-sans mt-6">Bitcoin</p>
                <div className=" bg-[#99DDE2] border-[3px] border-black rounded-md mt-3 px-2 py-1">
                  0,23242
                </div>
              </div>
              <Image src={"/Arrow.png"} alt="" width={170} height={10} className=" h-[16px] mt-6"></Image>
              <div className="flex-col flex">
                <div className="bg-white rounded-full border-[3px] border-black border-1 h-[77px] bg-[url('/GHO_LOGO.jpeg')] bg-center bg-no-repeat bg-cover "></div>
                <p className="text-black font-bold font-sans mt-6">GHO Token</p>
                <div className=" bg-[#99DDE2] border-[3px] border-black rounded-md mt-3 px-2 py-1">
                  0,23242
                </div>
              </div>
            </div>
            <button className="bg-[#b4faff] rounded-md border-[3px] px-4 py-1 mb-4 border-black">
              Payback
            </button>
          </div>

          {/* <ConnectButton /> */}
        </div>
      </>
    </div>
  );
    
}
export default dynamic(() => Promise.resolve(Page), {
  ssr: false,
});