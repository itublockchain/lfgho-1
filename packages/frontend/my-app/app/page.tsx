"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useContractRead, useAccount, useContractWrite } from "wagmi";
import { fetchSigned } from "../utils/util";
import oracleABI from "./abis/oracleABI.json";
import minterABI from "./abis/minterABI.json";

export default function Home() {
  const { data, isLoading, isSuccess, write } = useContractWrite({
    address: "0x6CdC0cD78816531e4D3D54019F0D947b133F7b0A",
    abi: minterABI,
    functionName: "mintFromBtcTransaction",
  });
  const unisat = (window as any).unisat;
  const bitaddress = localStorage.getItem("bitAddress");
  const { address: evmAddress } = useAccount();
  const handleCreateUTXO = async (bitaddress: any, familykitadd: any) => {
    try {
      const fetchedDatas = await fetchSigned(unisat, bitaddress, familykitadd);
      fetchedDatas.hex = `0x${fetchedDatas.hex}`;
      write({
        args: [
          fetchedDatas.hex,
          "0x6100000000000000000000000000000000000000000000000000000000000000",
          [
            "0x02000000000101f9096321ad16c3ac335cc79dbf7b1111150f594710a0ca3658",
          ],
        ],
      });
    } catch (error) {
      console.error("Error fetching Unisat accounts:", error);
    }
  };

  const [inputValue, setInputValue] = useState(1);

  const handleInputChange = (e: any) => {
    setInputValue(e.target.value);
  };

  const { data: decimalrate } = useContractRead({
    address: "0x65dae2712abae2120a39ca362b0dc73db4ef2630",
    abi: oracleABI,
    functionName: "getPrice",
  });
  const rate = ((Number(inputValue) * Number(decimalrate)) / 1e8).toFixed(1);
  return (
    <div id="home" className="flex justify-between">
      <>
        <div className="flex flex-col">
          <div
            className="absolute top-[40%] left-[50%] translate-y-[-50%] translate-x-[-50%] text-sm/[24px] font-bold
       bg-[#8AF3FB] p-30 rounded-[10px] shadow-[100px_35px_35px_-15px_rgba(0,0,0,0)]  border-l-8 border-b-8 border-black text-center mb-32 
        w-[500px] h-[300px]  justify-center  flex flex-col items-center   "
          >
            <div className="flex mb-14  space-x-8">
              <div className="flex-col flex">
                <div className="bg-white border-black border-[3px] rounded-full h-[77px] w-[77px] bg-[url('/BTC_LOGO.jpeg')] bg-center bg-no-repeat bg-cover mt-12 "></div>
                <p className="text-black font-bold font-sans mt-6">Bitcoin</p>
                <input
                  type="text"
                  value={inputValue}
                  onChange={handleInputChange}
                  className="bg-[#99DDE2] border-[3px] border-black rounded-md mt-3 py-1 w-[85px] text-center font-bold"
                />
              </div>
              <Image
                src={"/Arrow.png"}
                alt=""
                width={170}
                height={10}
                className=" h-[16px] mt-20"
              ></Image>
              <div className="flex-col flex items-center">
                <div className="bg-white border-black border-[3px] rounded-full h-[77px] w-[77px] bg-[url('/GHO_LOGO.jpeg')] bg-center bg-no-repeat bg-cover mt-12 "></div>
                <p className="text-black font-bold font-sans mt-6">GHO</p>
                <input
                  type="number"
                  value={rate}
                  readOnly
                  className="bg-[#99DDE2] border-[3px] border-black rounded-md mt-3 py-1 w-[85px] text-center indent-2 items-center font-bold"
                />
              </div>
            </div>
            <button
              className="bg-[#99DDE2] rounded-md border-[4px] px-4 py-1 mb-12 border-black font-bold"
              onClick={() => handleCreateUTXO(bitaddress, evmAddress)}
            >
              Deposit
            </button>
          </div>
        </div>
      </>
    </div>
  );
}
