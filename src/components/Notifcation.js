import React from "react";

const Notifcation = ({ showNotification }) => {
  return (
    <div
      className={`notification-container ${showNotification ? "show" : " "}`}
      id="notifcation-container"
    >
      <p>You have already enter this letter</p>
    </div>
  );
};

export default Notifcation;
