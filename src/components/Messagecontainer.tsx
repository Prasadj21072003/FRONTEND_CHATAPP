import ArrowCircleUpOutlinedIcon from "@mui/icons-material/ArrowCircleUpOutlined";

import Useconversation from "../zustand/Useconversation";
import { useEffect, useRef, useState } from "react";
import { useAuthcontext } from "../Context/Authcontext";
import axios from "axios";
import Messages from "./Messages";
import Uselistenmsg from "./Uselistenmsg";
import { usesocketcontext } from "../Context/Socketcontext";
import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";
import { ThreeCircles } from "react-loader-spinner";

const Messagecontainer = () => {
  const { authuser } = useAuthcontext();
  const [inputmsg, setinputmsg] = useState("");
  const [clearinput, setclearinput] = useState("");
  const [loading, setloading] = useState(false);

  const { onilneusers }: any = usesocketcontext();

  const { selectedconversation, message, setmessage, convo, setconvo } =
    Useconversation();
  const ref = useRef() as React.MutableRefObject<HTMLDivElement>;

  const getmsg = async () => {
    try {
      const res = await axios.get(
        `https://backend-for-chat-app-b16y.onrender.com/api/message/${selectedconversation.id}`,
        {
          headers: {
            token: `${authuser?.acesstoken}`,
          },
        }
      );

      setmessage(res?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const newinput = async () => {
    try {
      setclearinput("");
      if (inputmsg !== "") {
        setloading(true);
        const res = await axios.post(
          `https://backend-for-chat-app-b16y.onrender.com/api/message/sendmsg/${selectedconversation.id}`,
          { message: inputmsg },
          {
            headers: {
              token: `${authuser?.acesstoken}`,
            },
          }
        );
        console.log(res?.data);
        setinputmsg("");
        setloading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getmsg();
  }, [selectedconversation, newinput]);

  useEffect(() => {
    const refcurrent = ref?.current;
    if (refcurrent) {
      refcurrent.scrollTop = refcurrent.scrollHeight;
    }
  }, [message]);

  Uselistenmsg();

  const online = onilneusers?.includes(selectedconversation.id);

  return (
    <div
      className={` border-l-[1px] border-slate-700  xl:w-[700px] lg:w-[600px] ${
        convo ? "max-md:visible" : "max-md:hidden"
      } max-lg:w-[330px]  relative`}
    >
      <div className=" border px-[20px] h-[60px] w-full border-t-[1px] border-slate-700 flex items-center cursor-pointer ">
        {convo && (
          <span
            className="text-white mr-[10px] md:hidden"
            onClick={() => setconvo(false)}
          >
            <ArrowCircleLeftOutlinedIcon />
          </span>
        )}
        <img
          src={selectedconversation?.profilepic}
          alt=""
          width={30}
          height={30}
          className="rounded-full"
        />
        <div
          className={` flex ${
            online ? "flex-col" : "justify-center items-center"
          }   h-[45px]  `}
        >
          <span className="text-white font-semibold ml-[20px]">
            {selectedconversation?.fullName}
          </span>
          {online && (
            <span
              className={`text-white font-thin ml-[20px] italic text-[13px] relative bottom-[2px] `}
            >
              online
            </span>
          )}
        </div>
      </div>
      <div
        className=" w-full h-[525px] py-[10px] px-[20px] overflow-y-auto relative flex flex-col   "
        ref={ref}
      >
        {message?.map((item: any, i: string | null | undefined) => (
          <Messages key={i} msg={item} />
        ))}
      </div>
      <div className=" absolute bottom-[0px] border px-[20px] h-[60px] w-full border-t-[1px] border-slate-700 flex items-center cursor-pointer ">
        <input
          type="text"
          name=""
          id=""
          value={clearinput}
          placeholder="send message"
          onChange={(e) => {
            setinputmsg(e.target.value);
            setclearinput(e.target.value);
          }}
          className="bg-slate-800 w-full mr-[20px]  px-[10px] py-[11px]  border-none text-sm rounded-lg text-white focus:outline-none"
        />
        {loading ? (
          <ThreeCircles
            visible={true}
            height="25"
            width="25"
            color="#B1AFFF"
            ariaLabel="three-circles-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        ) : (
          <span className="text-white  " onClick={newinput}>
            <ArrowCircleUpOutlinedIcon fontSize="medium" />
          </span>
        )}
      </div>
    </div>
  );
};

export default Messagecontainer;
