import React from "react";
import { Link } from "react-router-dom";
import DropDown from "../../StyledComponents/DropdownDiv";

function MessageSectionHeader(props) {
  return (
    <header className="MessageSectionHeader">
      <h2 className="RoomName-FriendName">#Room 1</h2>
      <div className="DropDown">
        <button
          className="MessageSectionHeaderDropDownBtn"
          onClick={() => props.setIsDropDownOpen(!props.isDropDownOpen)}
        >
          <i className="fa fa-ellipsis-v"></i>
        </button>
        <DropDown isOpen={props.isDropDownOpen}>
          <button
            className="MessageSectionDropDownContent"
            onClick={() => {
              props.setIsDropDownOpen(false);
            }}
          >
            Edit Room
          </button>
          <Link className="MessageSectionDropDownContent">Leave Room</Link>
        </DropDown>
      </div>
    </header>
  );
}

export default MessageSectionHeader;
