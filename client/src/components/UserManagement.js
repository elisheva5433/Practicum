import React, { useState, useEffect } from "react";

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [userHistory, setUserHistory] = useState([]);

  // טוענים את כל המשתמשים
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:5084/api/User");
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  // טוענים את ההיסטוריה של המשתמש הנבחר
  useEffect(() => {
    if (!selectedUserId) return;

   const fetchHistory = async () => {
  try {
    const response = await fetch(
      `http://localhost:5084/api/Prompts/GetPromptById/${selectedUserId}`
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      console.warn("No history:", errorData?.message || "No data");
      setUserHistory([]); // שלא ייפול ב־map
      return;
    }

    const data = await response.json();
    setUserHistory(Array.isArray(data) ? data : []);
  } catch (error) {
    console.error("Error fetching user history:", error);
  }
};

    fetchHistory();
  }, [selectedUserId]);

  return (
    <div>
      <h2>Users List</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <button onClick={() => setSelectedUserId(user.id)}>
              {user.name}
            </button>
          </li>
        ))}
      </ul>

      {selectedUserId && (
        <div>
          <h3>History for user: {selectedUserId}</h3>
          <ul>
            {userHistory.map((item) => (
              <li key={item.id}>
                {item.promptText} - {new Date(item.createdAt).toLocaleString()}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default UserManagement;
