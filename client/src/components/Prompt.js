import OpenAI from "openai";
import { useState } from "react";

// const client = new OpenAI({
//   apiKey: process.env.REACT_APP_OPENAI_API_KEY
// });


// export async function sendPromptToOpenAI(prompt, topic, subtopic) {
//     const response = await client.chat.completions.create({
//         model: "gpt-4o-mini",
//         messages: [{ role: "user", content: `${prompt} in topic ${topic} in sub topic ${subtopic}` }]
//     });
//     return response.choices[0].message.content;

// }



function Prompt(topic, subtopic) {

    const handleSend = (prompt) => {
        // const response=sendPromptToOpenAI(prompt, topic, subtopic)
    }

    const [prompt, setPrompt] = useState("");
    return (
        <div>
            <h2>write what you want to know:</h2>
            <input
                type="text"
                placeholder="Type your prompt here..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)} />
            <button onSubmit={handleSend}>Submit</button>
        </div>
    );
}
export default Prompt;