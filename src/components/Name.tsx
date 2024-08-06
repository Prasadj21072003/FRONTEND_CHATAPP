import { usesocketcontext } from "../Context/Socketcontext";
import Useconversation from "../zustand/Useconversation";

type conversationtype = {
  id: string;
  fullName: string;
  profilepic: string;
};

const Name = ({ conversation }: { conversation: conversationtype }) => {
  const { setSelectedconversation, selectedconversation, setconvo } =
    Useconversation();
  const { onilneusers }: any = usesocketcontext();

  const online = onilneusers?.includes(conversation?.id);

  return (
    <div
      className={`relative px-[20px] h-[70px] w-full border-t-[1px] border-slate-700 flex items-center cursor-pointer ${
        conversation.id === selectedconversation?.id ? "bg-blue-500" : ""
      } `}
      onClick={(e) => {
        e.preventDefault();
        setSelectedconversation(conversation);
        setconvo(true);
      }}
    >
      <img
        src={conversation?.profilepic}
        alt=""
        width={50}
        height={50}
        className="rounded-full"
      />

      <span className="text-white font-semibold ml-[20px]">
        {conversation?.fullName}
      </span>
      <span
        className={`${
          online ? "visible" : "hidden"
        } bg-orange-500 w-[10px] h-[10px] rounded-full absolute right-[20px]`}
      />
    </div>
  );
};

export default Name;
