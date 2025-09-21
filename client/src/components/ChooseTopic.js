



import React, { useState } from "react";
import Prompt from "./Prompt";

const topicsData = {
  1: { name: "Mathematics", subcategories: { 101: "Algebra", 102: "Geometry", 103: "Calculus" } },
  2: { name: "Science", subcategories: { 201: "Physics", 202: "Chemistry", 203: "Biology" } },
  3: { name: "History", subcategories: { 301: "Ancient", 302: "Modern", 303: "World Wars" } },
  4: { name: "Literature", subcategories: { 401: "Poetry", 402: "Novels", 403: "Drama" } },
};

function ChooseTopic(userId) {
  const [selectedTopicId, setSelectedTopicId] = useState("");
  const [selectedSubtopicId, setSelectedSubtopicId] = useState("");

  //בחירת נושא
  const handleTopicChange = (e) => {
    setSelectedTopicId(e.target.value);
    setSelectedSubtopicId(""); // איפוס תת-הקטגוריה
  };

  //קבלת תת נושאים בהתאם לנושא שנבחר
  const getSubcategories = () => {
    if (selectedTopicId) {
      return Object.entries(topicsData[selectedTopicId].subcategories);
    }
    return [];
  };
  //קבלת שמות הנושאים ותת הנושאים
  const getTopicName = (id) => topicsData[id]?.name;
  const getSubtopicName = (topicId, subtopicId) => topicsData[topicId]?.subcategories[subtopicId];

  return (
    <div>
      <h2>Choose a topic to learn about:</h2>
      <select value={selectedTopicId} onChange={handleTopicChange}>
        <option value="">-- Select a topic --</option>
        {Object.entries(topicsData).map(([id, topic]) => (
          <option key={id} value={id}>{topic.name}</option>
        ))}
      </select>

      {selectedTopicId && (
        <>
          <h3>Choose a subtopic:</h3>
          <select
            value={selectedSubtopicId}
            onChange={(e) => setSelectedSubtopicId(e.target.value)}
          >
            <option value="">-- Select a subtopic --</option>
            {getSubcategories().map(([id, name]) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
          </select>
        </>
      )}

      {selectedSubtopicId && (
        <>
          <p>
            You selected: {getTopicName(selectedTopicId)} - {getSubtopicName(selectedTopicId, selectedSubtopicId)}
          </p>
          <Prompt
            category={selectedTopicId}
            subCategory={selectedSubtopicId}
            userId={userId}
          ></Prompt>
        </>
      )}
    </div>
  );
}

export default ChooseTopic;












// import React, { useState } from "react";
// import Prompt from "./Prompt";

// const subtopics = {
//     Mathematics: ["Algebra", "Geometry", "Calculus"],
//     Science: ["Physics", "Chemistry", "Biology"],
//     History: ["Ancient", "Modern", "World Wars"],
//     Literature: ["Poetry", "Novels", "Drama"]
// };

// function ChooseTopic() {
//     const [selectedTopic, setSelectedTopic] = useState("");
//     const [selectedSubtopic, setSelectedSubtopic] = useState("");

//     const handleTopicChange = (e) => {
//         setSelectedTopic(e.target.value);
//         setSelectedSubtopic(""); // Reset subtopic when topic changes
//     };

//     return (
//         <div>
//             <h2>Choose a topic to learn about:</h2>
//             <select
//                 value={selectedTopic}
//                 onChange={handleTopicChange}
//             >
//                 <option value="">-- Select a topic --</option>
//                 <option value="Mathematics">Mathematics</option>
//                 <option value="Science">Science</option>
//                 <option value="History">History</option>
//                 <option value="Literature">Literature</option>
//             </select>

//             {selectedTopic && (
//                 <>
//                     <h3>Choose a subtopic:</h3>
//                     <select
//                         value={selectedSubtopic}
//                         onChange={e => setSelectedSubtopic(e.target.value)}
//                     >
//                         <option value="">-- Select a subtopic --</option>
//                         {subtopics[selectedTopic].map(sub => (
//                             <option key={sub} value={sub}>{sub}</option>
//                         ))}
//                     </select>
//                 </>
//             )}

//             {selectedSubtopic && (
//                 <>
//                 <p>
//                     You selected: {selectedTopic} - {selectedSubtopic}
//                 </p>
//                 <Prompt category={selectedTopic} subCategory={selectedSubtopic}></Prompt>
//                 </>
//             )}
//         </div>
//     );
// }

// export default ChooseTopic;