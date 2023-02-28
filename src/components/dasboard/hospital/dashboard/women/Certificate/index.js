import React from "react";

const Certificate = ({ child, hospitalName, motherName }) => {
  return (
    <div
      id="certificate-content"
      style={{
        textAlign: "center",
        padding: "20px",
        backgroundColor: "#fff",
        border: "2px solid #000",
        borderRadius: "10px",
        margin: "50px",
        maxWidth: "800px",
        boxShadow: "5px 5px 5px #ccc",
      }}
    >
      <h3>Certificate of Birth</h3>
      <hr />
      <h4>Congratulations!</h4>
      <p>
        This certifies that {child.firstName} {child.lastName} was born on{" "}
        {new Date(child.createdAt).toLocaleDateString()} at {hospitalName}.
      </p>
      <p>Mother's name: {motherName}</p>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ width: "50%" }}>
          <p style={{ marginBottom: "5px" }}>Weight:</p>
          <h4>{child.weight} kgs</h4>
        </div>
        <div style={{ width: "50%" }}>
          <p style={{ marginBottom: "5px" }}>Height:</p>
          <h4>{child.height} m</h4>
        </div>
      </div>
    </div>
  );
};

export default Certificate;
