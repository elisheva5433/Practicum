import OpenAI from "openai";
import { useState } from "react";
import axios from "axios";



function Prompt({ category, subCategory, userId }) {
    console.log("user id commes like: ", userId);

    const [prompt, setPrompt] = useState("");
    const [response, setResponse] = useState("");

    async function sendPrompt(prompt) {
        var response = await sendPromptToOpenAI(prompt);

        const promptData = {
            "UserId": userId.userId,
            "CategoryId": category,
            "SubcategoryId": subCategory,
            "PromptText": prompt,
            "Response": response,
            "CreatedAt": new Date().toISOString()
        }
            console.log("Sending prompt data:", promptData);
            try {
                console.log("userId: ",userId);
                const response = await axios.post("http://localhost:5084/api/Prompts/CreatePrompt", promptData);
                console.log("response:", response.data);
            } catch (error) {
                console.error("Error posting prompt data:", error);
                return;
            }

    }

    const sendPromptToOpenAI = async (prompt) => {
        try {
            const response = await axios.post(`http://localhost:5084/api/OpenAI/GenerateText`, {
                "userId": userId.userId,
                "categoryId": category,
                "subcategoryId": subCategory,
                "promptText":prompt,
                "response": "",
                "createdAt": new Date().toISOString()
            });
            console.log("AI response:", response.data);
            setResponse(response.data);
            return response.data;
        } catch (error) {
            console.error("Error sending prompt to OpenAI:", error);
        }
    }




    return (
        <div>
            <h2>write what you want to know:</h2>
            <input
                type="text"
                placeholder="Type your prompt here..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)} />
            <button onClick={() => sendPrompt(prompt)}>send</button>
            <h4>here what you want to know: </h4>
            <p>{response}</p>
        </div>
    );
}
export default Prompt;