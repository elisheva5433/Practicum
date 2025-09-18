import OpenAI from "openai";
import { useState } from "react";
import axios from "axios";

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


function Prompt({ category, subCategory, UserId }) {


    // const handleSend = (prompt) => {
    //     // const response=sendPromptToOpenAI(prompt, topic, subtopic)
    // }

    async function sendPrompt(prompt) {
        sendPromptToOpenAI(prompt);
        // Create an object with the data to send
        const promptData = {
            "UserId": UserId,
            "CategoryId": category,
            "SubcategoryId": subCategory,
            "PromptText": prompt,
            "Response": "string",
            "CreatedAt": new Date().toISOString()
        }

        try {
            // Post the data to the correct endpoint
            console.log("Sending prompt data:", promptData);
            try {
                //     // const response = await fetch(`http://localhost:5084/api/Prompts/CreatePrompt`, promptData)
                //     const response = await fetch(`http://localhost:5084/api/Prompts/CreatePrompt`,{
                //     method: "POST",
                //     headers: {
                //         "Content-Type": "application/json"
                //     },
                //     body: JSON.stringify(promptData)
                // });

                const response = await axios.post("http://localhost:5084/api/Prompts/CreatePrompt", promptData);
                console.log("AI response:", response.data);
            } catch (error) {
                console.error("Error posting prompt data:", error);
                return;
            }
        } catch (err) {
            console.error("Error:", err);
        }



    }

    const sendPromptToOpenAI = async (prompt) => {
        // const promptDT = {
        //     "UserId": UserId,
        //     "CategoryId": category,
        //     "SubcategoryId": subCategory,
        //     "PromptText": prompt,
        //     "Response": "string",
        //     "CreatedAt": new Date().toISOString()
        // }
        try {
            const response = await axios.post(`http://localhost:5084/api/OpenAI/GenerateText`, {
                "id": "string",
                "userId": 0,
                "categoryId": 0,
                "subcategoryId": 0,
                "promptText": "string",
                "response": "string",
                "createdAt": "2025-09-18T17:48:48.477Z"
            });
            console.log("AI response:", response.data);
            return response.data;
        } catch (error) {
            console.error("Error sending prompt to OpenAI:", error);
        }
    }
    // try {
    //     // המרת הפרומפט ל־JSON
    //     var json = JsonSerializer.Serialize(prompt);
    //     var content = new StringContent(json, Encoding.UTF8, "application/json");
    //     // שליחת הבקשה ל־API חיצוני
    //     var response = await _httpClient.PostAsync("http://localhost:5084/api/OpenAI/GenerateText", content);
    //     response.EnsureSuccessStatusCode();

    //     var responseData = await response.Content.ReadAsStringAsync();
    //     // Console.WriteLine("Response from API: " + responseData);
    // }
    // catch (error) {
    //     console.error("Error sending prompt to OpenAI:", error);

    // }



    // async function sendPrompt(prompt) {
    //     // const promptToSend = {
    //     //     categoryId: category,
    //     //     subCategoryId: subCategory,
    //     //     promptText: prompt
    //     // };

    //     try {
    //         // const response = await axios.post("http://localhost:5000/api/OpenAI/GenerateText", promptToSend);
    //         const response = await axios.post(`http://localhost:5084/api/prompts/${category}/${subCategory}/lll`);

    //         console.log("AI response:", response.data);
    //     } catch (err) {
    //         console.error("Error:", err);
    //     }
    // }


    const [prompt, setPrompt] = useState("");
    return (
        <div>
            <h2>write what you want to know:</h2>
            <input
                type="text"
                placeholder="Type your prompt here..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)} />
            <button onClick={() => sendPrompt(prompt)}>send</button>
        </div>
    );
}
export default Prompt;