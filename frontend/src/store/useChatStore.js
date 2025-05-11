import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuthstore";

export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,

  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/messages/users");
      set({ users: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessages: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/messages/${userId}`);
      set({ messages: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isMessagesLoading: false });
    }
  },
  sendMessage: async (messageData) => {
  const { selectedUser, messages } = get();
  if (!selectedUser?._id) return toast.error("No user selected");

    try {
      const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData);
      set({ messages: [...messages, res.data] });
  } catch (error) {
    toast.error(error?.response?.data?.message || "Send message failed");
  }
},


  //This function is used to listen for real-time incoming messages from the user you are currently chatting with. When you open a chat with a user (let's call them User A), this function sets up a WebSocket listener that waits for a "newMessage" event from the server. Whenever a new message is received, it checks if that message is from User A (the selected user). If it is, the message gets added to the existing list of messages in your chat window. If it’s from someone else, it’s ignored — because you’re not chatting with that person at the moment. This way, your chat updates instantly when a message arrives, without needing to refresh the page.

  subscribeToMessages: () => {
  const { selectedUser } = get();
  if (!selectedUser) return;

  const socket = useAuthStore.getState().socket;
  if (!socket) return console.warn("Socket not connected");

  socket.off("newMessage"); // prevent duplicates
  socket.on("newMessage", (newMessage) => {
    const isMessageSentFromSelectedUser = newMessage.senderId === selectedUser._id;
    if (!isMessageSentFromSelectedUser) return;

    set({ messages: [...get().messages, newMessage] });
  });
},


//This function is used to turn off or clean up the message listener when it’s no longer needed. For example, if you switch from chatting with User A to User B, you don’t want to keep listening for messages from User A. So this function removes the "newMessage" listener from the WebSocket connection. It’s a good habit to do this because keeping old listeners active can cause bugs — like messages showing up in the wrong chat — and it also helps your app use memory more efficiently.

  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    socket.off("newMessage");
  },

  setSelectedUser: (selectedUser) => set({ selectedUser }),
}));