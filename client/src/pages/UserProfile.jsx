import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const UserProfile = () => {
  const { user } = useContext(AuthContext);
   
  console.log(user)
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      
      {/* Main Profile Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        
        {/* User Stories Section */}
        <div className="md:col-span-2 bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold">Home</h3>
          <div className="mt-4">
            {user?.stories?.length ? (
              user.stories.map((story, index) => (
                <div key={index} className="p-4 border-b">
                  <h4 className="font-semibold">{story.title}</h4>
                  <p className="text-gray-600">{story.content}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No stories</p>
            )}
          </div>
        </div>
        {/* Profile Info */}
        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
          <div className="w-24 h-24 bg-pink-300 rounded-full flex items-center justify-center overflow-hidden">
            {user?.data.profilePic ? <img
              className="w-24 h-24 rounded-full"
              src={user.profilePicture || "https://banner2.cleanpng.com/20180603/jx/avomq8xby.webp"}
              alt="Profile"
            /> : null}
          </div>
          <h2 className="text-lg font-semibold mt-4">{user?.data.fullName || "Profile Name"}</h2>
          <p className="text-sm text-green-500 cursor-pointer">Edit Profile</p>
        </div>

      </div>


      {/* Reading List */}
      <div className="bg-white p-6 rounded-lg shadow-md mt-6">
        <h3 className="text-lg font-semibold">Posts</h3>
        <p className="text-gray-500">No stories</p>
      </div>
    </div>
  );
};

export default UserProfile;
