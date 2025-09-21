import React from "react";

function Nuv() {
  return (
    <nav style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "10px 20px",
      backgroundColor: "#007bff",
      color: "#fff"
    }}>
      {/* <div style={{ fontWeight: "bold", fontSize: "18px" }}>MyApp</div> */}
      <div>
        <input style={{ margin: "0 5px", padding: "5px 10px" }} placeholder="log in as admin"/>
        
        <input style={{ margin: "0 5px", padding: "5px 10px" }} placeholder="log in"/>
        {/* <input style={{ margin: "0 5px", padding: "5px 10px" }}/> */}

        {/* <button style={{ margin: "0 5px", padding: "5px 10px" }}>log in as admin</button>
        <button style={{ margin: "0 5px", padding: "5px 10px" }}>log in</button> */}
      </div>
    </nav>
  );
}

export default Nuv;
















// import React from "react";

// function Nav({ currentUser, onNavigate }) {
//   return (
//     <nav style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>
//       <button onClick={() => onNavigate("register")}>Register</button>

//       {currentUser?.role === "admin" && (
//         <>
//           <button onClick={() => onNavigate("adminRegister")}>
//             Admin Register
//           </button>
//           <button onClick={() => onNavigate("usersList")}>Users List</button>
//         </>
//       )}
//     </nav>
//   );
// }

// export default Nav;
