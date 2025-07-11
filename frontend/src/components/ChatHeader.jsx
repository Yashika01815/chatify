import { X } from "lucide-react";
import { useAuthStore } from "../store/useAuthstore";
import { useChatStore } from "../store/useChatStore";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  return (
    <div className="p-2.5 border-b border-base-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          
         <div className="avatar">
         <div className="w-10 h-10 rounded-full relative overflow-hidden border border-gray-300">
         <img
        src={selectedUser.profilePic || "/avatar.png"}
        alt={selectedUser.fullName}
        className="w-full h-full object-cover"
        />
       </div>
      </div>

          {/* User info */}
          <div>
            <h3 className="font-medium">{selectedUser.fullName}</h3>
            <p className="text-sm text-base-content/70">
              {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
            </p>
          </div>
        </div>

        {/* Close button */}
        <button onClick={() => setSelectedUser(null)}>
          <X />
        </button>
      </div>
    </div>
  );
};
export default ChatHeader;