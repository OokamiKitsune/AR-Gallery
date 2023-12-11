import React, { useContext } from "react";

const UserDashboard = () => {
  const { user } = useContext(UserContext);
  return (
    <div>
      <h1>Welcome {user.name}</h1>
    </div>
  );
};
