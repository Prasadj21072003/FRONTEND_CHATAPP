import { create } from "zustand";

const Useconversation = create((set) => ({
  selectedconversation: null,
  setSelectedconversation: (conversation) =>
    set({ selectedconversation: conversation }),
  getconversations: [],
  setgetconversations: (conversations) =>
    set({ getconversations: conversations }),
  message: [],
  setmessage: (message) => set({ message: message }),
  convo: false,
  setconvo: (convo) => set({ convo: convo }),
}));

export default Useconversation;
