import { use, useState } from "react";
import { useEffect } from "react";
import Welcome from './Welcome';
import ChooseTopic from './ChooseTopic';
import LearningHistory from './LearningHistory';


function Login() {

    const [username, setUsername] = useState("");
    const [exsist, setExsist] = useState(false);
    const [userphone, setUserPhone] = useState("");
    const [needToLogin, setNeedToLogin] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [errorMessagePhone, setErrorMessagePhone] = useState("");
    const [userId, setUserId] = useState("");

    // useEffect(() => {
    //     if (userId) {
    //         console.log("userId was updated: ", userId);
    //     }
    // }, [userId]);

    const logUp = async () => {
        const user = {
            name: username,
            phone: userphone
        };
        console.log(user);

        try {
            const response = await fetch(`http://localhost:5084/api/User/CreateUser`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
            });

            if (response.ok) {
                const createdUser = await response.json(); // כאן יש את id שהשרת יצר
                console.log("user created", createdUser);
                setUserId(createdUser.id);  // ✅ משתמשים ב-id מהשרת
                console.log("userId set to: ", createdUser.id);
                setLoggedIn(true);
            } else {
                console.log("error creating user");
            }
        } catch (err) {
            console.error("Fetch error:", err);
        }
    }




    const checkIfExsist = async () => {
        try {
            const response = await fetch(`http://localhost:5084/api/User/byName/${username}`);

            if (response.status === 404) {
                // setNeedToLogin(true);
                setExsist(false);
                setErrorMessage("user name is not exsist");
                console.log("kkk ", errorMessage);
                return;
            }

            if (!response.ok) {
                console.error("server error", response.status);
                setErrorMessage("שגיאת שרת, נסה שוב מאוחר יותר");
                return;
            }

            setExsist(true);
            setErrorMessage(""); // מנקים שגיאה אם נמצא
            const data = await response.json();
            console.log("משתמש נמצא:", data);

        } catch (error) {
            console.error("שגיאה ברשת:", error);
            setErrorMessage("שגיאת רשת, נסה שוב");
        }
    };

    const checkIfCorrectPhone = async () => {
        try {
            const response = await fetch(`http://localhost:5084/api/User/byPhone/${userphone}`);

            if (response.status === 404) {
                setErrorMessagePhone("phone is not correct")
                console.log("phone is not correct");
                return;
            }

            if (!response.ok) {
                setErrorMessage("שגיאת שרת, נסה שוב מאוחר יותר");
                console.error("server error", response.status);
                return;
            }
            setErrorMessage(""); // מנקים שגיאה אם נמצא
            const data = await response.json();
            console.log("found user", data);
            setLoggedIn(true);
            setUserId(data.id); // ✅ משתמשים ב-id מהשרת


        } catch (error) {
            console.error("שגיאה ברשת:", error);
        }
    };

    useEffect(() => {
        if (userId) {
            console.log("✅ userId was updated:", userId);
        }
    }, [userId]);


    return (
        <>
            {!loggedIn ? (!needToLogin ? (<div className="Login">
                <h2>Login Page</h2>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="insert your username"
                />
                <p style={{ color: "red" }}>{errorMessage}</p>
                <button onClick={checkIfExsist}>ok</button>
                <button onClick={() => setNeedToLogin(true)}>log up</button>
                {exsist && <><input
                    type="text"
                    value={userphone}
                    onChange={(e) => setUserPhone(e.target.value)}
                    placeholder="insert your phone number"
                />
                    <p style={{ color: "red" }}>{errorMessagePhone}</p>
                    <button onClick={checkIfCorrectPhone}>insert</button></>}

            </div>) : (
                <>
                    <h3>log up</h3>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="insert your username"
                    />
                    <input
                        type="text"
                        value={userphone}
                        onChange={(e) => setUserPhone(e.target.value)}
                        placeholder="insert your phone number"
                    />
                    <button onClick={logUp}>log up</button>
                </>
            )) : (
                <>
                    <Welcome />
                    <ChooseTopic userId={userId} />
                    <LearningHistory userId={userId} />
                </>
            )}



        </>

    );
}



export default Login;