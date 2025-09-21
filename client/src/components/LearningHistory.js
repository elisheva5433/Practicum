import React, { useState, useEffect } from "react";

const categoryMap = {
  1: "Mathematic",
  2: "Science",
  3: "History",
  4: "Literature",
};

const LearningHistory = ({userId}) => {
  const [items, setItems] = useState([]);
  const [filterCategory, setFilterCategory] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5084/api/Prompts");
        const data = await response.json();
        setItems(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

   const filteredItems = items
    .filter(item => item.userId === userId)
    .filter(item => !filterCategory || item.categoryId === filterCategory);

  return (
    <div style={{ fontFamily: "Arial", padding: "20px" }}>
      <h2 style={{ marginBottom: "10px" }}>My history learning</h2>

      {/* כפתורי סינון */}
      <div style={{ marginBottom: "15px" }}>
        {Object.entries(categoryMap).map(([id, name]) => (
          <button
            key={id}
            onClick={() => setFilterCategory(Number(id))}
            style={{
              margin: "5px",
              padding: "8px 12px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              cursor: "pointer",
            }}
          >
            {name}
          </button>
        ))}
        <button
          onClick={() => setFilterCategory(null)}
          style={{
            margin: "5px",
            padding: "8px 12px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            cursor: "pointer",
            backgroundColor: "#f5f5f5",
          }}
        >
          select all
        </button>
      </div>

      {/* הצגת פריטים */}
      <div style={{ display: "grid", gap: "10px" }}>
        {filteredItems.map((item) => (
          <div
            key={item.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "10px",
              padding: "12px",
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
              backgroundColor: "#fff",
            }}
          ><p style={{ margin: 0, color: "#555" }}>
              category: {categoryMap[item.categoryId] || "unknown"}
            </p>
            <p style={{ margin: "0 0 5px 0", fontWeight: "bold", color: "#555" }}>
              promp text: {item.promptText}
            </p>
            <p style={{ margin: 0, color: "#555" }}>
              date: {new Date(item.createdAt).toLocaleString() || "unknown"}
            </p>
            
            
          </div>
        ))}
      </div>
    </div>
  );
};

export default LearningHistory;

















// import React, { useState, useEffect } from "react";

// const LearningHistory = () => {
//   const [items, setItems] = useState([]);
//   const [filterCategory, setFilterCategory] = useState(null);

//   // טעינת הנתונים מהשרת
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch("http://localhost:5084/api/Prompts"); // כתובת API לדוגמה
//         const data = await response.json();
//         setItems(data);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   // סינון הנתונים לפי קטגוריה (דינמי)
//   const filteredItems = filterCategory
//     ? items.filter(item => item.categoryId === filterCategory)
//     : items;

//   return (
//     <div>
//       <h2>רשימה דינמית משרת</h2>

//       {/* כפתורים לסינון */}
//       <button onClick={() => setFilterCategory(1)}>קטגוריה 1</button>
//       <button onClick={() => setFilterCategory(2)}>קטגוריה 2</button>
//       <button onClick={() => setFilterCategory(3)}>קטגוריה 3</button>
//       <button onClick={() => setFilterCategory(4)}>קטגוריה 4</button>
      
//       <button onClick={() => setFilterCategory(null)}>הצג הכל</button>

//       <ul>
//         {filteredItems.map(item => (
//           <li key={item.id}>
//             {item.promptText} - Category {item.categoryId}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default LearningHistory;


