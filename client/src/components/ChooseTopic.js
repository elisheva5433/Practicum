import React, { useState } from "react";

const subtopics = {
    Mathematics: ["Algebra", "Geometry", "Calculus"],
    Science: ["Physics", "Chemistry", "Biology"],
    History: ["Ancient", "Modern", "World Wars"],
    Literature: ["Poetry", "Novels", "Drama"]
};

function ChooseTopic() {
    const [selectedTopic, setSelectedTopic] = useState("");
    const [selectedSubtopic, setSelectedSubtopic] = useState("");

    const handleTopicChange = (e) => {
        setSelectedTopic(e.target.value);
        setSelectedSubtopic(""); // Reset subtopic when topic changes
    };

    return (
        <div>
            <h2>Choose a topic to learn about:</h2>
            <select
                value={selectedTopic}
                onChange={handleTopicChange}
            >
                <option value="">-- Select a topic --</option>
                <option value="Mathematics">Mathematics</option>
                <option value="Science">Science</option>
                <option value="History">History</option>
                <option value="Literature">Literature</option>
            </select>

            {selectedTopic && (
                <>
                    <h3>Choose a subtopic:</h3>
                    <select
                        value={selectedSubtopic}
                        onChange={e => setSelectedSubtopic(e.target.value)}
                    >
                        <option value="">-- Select a subtopic --</option>
                        {subtopics[selectedTopic].map(sub => (
                            <option key={sub} value={sub}>{sub}</option>
                        ))}
                    </select>
                </>
            )}

            {selectedSubtopic && (
                <p>
                    You selected: {selectedTopic} - {selectedSubtopic}
                </p>
            )}
        </div>
    );
}

export default ChooseTopic;