import React from "react";

function IndividualChatSectionHeader(props) {
  return (
    <header className="MessageSectionHeader">
      <h2 className="RoomName-FriendName">{props.el.UserName}</h2>
      <div className="DropDown">
        <button
          className="MessageSectionHeaderDropDownBtn"
          onClick={() => props.setIsDropDownOpen(!props.isDropDownOpen)}
        >
          <i className="fa fa-ellipsis-v"></i>
        </button>
      </div>
    </header>
  );
}

export default IndividualChatSectionHeader;
