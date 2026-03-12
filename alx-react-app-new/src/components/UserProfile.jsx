import React from "react";

function UserProfile(props) {
  return (
    <div style={{
      border: "1px solid gray",
      padding: "10px",
      margin: "10px",
      borderRadius: "8px",
      backgroundColor: "#f4f4f4"
    }}>
      
      <h2 style={{ color: "blue", fontSize: "24px" }}>
        {props.name}
      </h2>

      <p>
        Age: 
        <span style={{ fontWeight: "bold", marginLeft: "5px" }}>
          {props.age}
        </span>
      </p>

      <p style={{ color: "#555" }}>
        Bio: {props.bio}
      </p>

    </div>
  );
}

export default UserProfile;