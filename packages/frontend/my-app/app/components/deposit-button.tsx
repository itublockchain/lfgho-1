import React, { useState } from "react";


const DepositButton = () => {
  const [open, setOpen] = useState(false);
    return (
        <div>
      <button className="bg-[#99DDE2] text-black font-sans  font-bold border-black border-[3px]
          border-solid px-6 py-1 rounded-2xl textcolor-white"
      onClick={() => setOpen(true)}>
        <a href="/deposit">Home</a>
      </button></div>
    )
}

export default DepositButton;