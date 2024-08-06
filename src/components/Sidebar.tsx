import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { useAuthcontext } from "../Context/Authcontext";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Useconversation from "../zustand/Useconversation";
import Names from "./Names";

const Sidebar = () => {
  const { setauthuser, authuser } = useAuthcontext();
  const {
    getconversations,
    setgetconversations,
    setSelectedconversation,
    convo,
  } = Useconversation();

  type conversationtype = {
    id: string;
    fullName: string;
    profilepic: string;
  };

  const [searchinput, setsearchinput] = useState("");

  const handlelogout = async () => {
    const res = await axios.post(
      "https://backend-for-chat-app-b16y.onrender.com/api/auth/logout"
    );
    console.log(res);
    setauthuser(null);
  };

  const getconversation = async () => {
    try {
      const res = await axios.get(
        "https://backend-for-chat-app-b16y.onrender.com/api/message/conversations",
        {
          headers: {
            token: `${authuser?.acesstoken}`,
          },
        }
      );

      setgetconversations(res?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getconversation();
  }, []);

  const search = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(getconversations);

    getconversations.map((item: conversationtype) => {
      if (item.fullName.toLowerCase().includes(searchinput.toLowerCase()))
        if (item.fullName.toLowerCase() === searchinput.toLowerCase()) {
          setSelectedconversation(item);
          console.log(item);
          setsearchinput("");
        }
    });
    console.log(searchinput);
  };

  return (
    <div
      className={`flex flex-col   h-full w-[330px] ${
        convo ? "max-md:hidden" : "max-md:visible"
      } `}
    >
      <div className=" flex items-center h-[90px] justify-evenly px-[10px]">
        <input
          type="text"
          name=""
          id=""
          value={searchinput}
          onChange={(e) => setsearchinput(e.target.value)}
          className="bg-slate-700 w-[80%]  px-[10px] py-[10px]  border-none text-sm rounded-lg text-white focus:outline-none"
        />
        <span onClick={() => search}>
          <SearchOutlinedIcon className="text-white l cursor-pointer" />
        </span>
      </div>
      <div className="h-[73%]   ">
        <Names data={getconversations} />
      </div>
      <div
        className="px-[20px] cursor-pointer h-[70px] flex items-center  "
        onClick={handlelogout}
      >
        <LogoutOutlinedIcon className="text-white" />
      </div>
    </div>
  );
};

export default Sidebar;
