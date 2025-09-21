import { use, useState } from "react";
import { useEffect } from "react";
import Welcome from './Welcome';
import ChooseTopic from './ChooseTopic';
import LearningHistory from './LearningHistory';
import UserManagement from "./UserManagement";
import Nuv from './Nuv';


function Login() {

    const [username, setUsername] = useState("");
    const [exsist, setExsist] = useState(false);
    const [userphone, setUserPhone] = useState("");
    const [needToLogin, setNeedToLogin] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [errorMessagePhone, setErrorMessagePhone] = useState("");
    const [userId, setUserId] = useState("");
    const [admin, setAdmin] = useState(false);



    // useEffect(() => {
    //     if (userId) {
    //         console.log("userId was updated: ", userId);
    //     }
    // }, [userId]);

    const logUp = async () => {
        //בדיקת תקינות קלט
        if (!username || username.trim().length < 1) {
            setErrorMessage("Username must contain at least 1 character");
            return;

        }
        
        const phoneRegex = /^\+?[0-9]{7,15}$/; 
        if (!phoneRegex.test(userphone)) {
            setErrorMessagePhone("Please enter a valid phone number");
            return;
        }

        const user = {
            name: username,
            phone: userphone
        };
        console.log(user);

        //יצירת אובייקט של משתמש במסד הנתונים
        try {
            const response = await fetch(`http://localhost:5084/api/User/CreateUser`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
            });

            if (response.ok) {
                const createdUser = await response.json(); 
                // console.log("user created", createdUser);
                setUserId(createdUser.id);
                // console.log("userId set to: ", createdUser.id);
                setLoggedIn(true);
            } else {
                console.log("error creating user");
            }
        } catch (err) {
            console.error("Fetch error:", err);
        }
        alert("You loged successfully") ;
    }




    //פונקציה לבדיקת קיום שם משתמש
    const checkIfExsist = async () => {
        //בדיקת קלט תקין
        if (!username || username.trim().length < 1) {
            setErrorMessage("Username must contain at least 1 character");
            return;
        }

        const phoneRegex = /^\+?[0-9]{7,15}$/; // תומך במספרים עם או בלי '+' ואורך סביר
        if (!phoneRegex.test(userphone)) {
            setErrorMessagePhone("Please enter a valid phone number");
            return;
        }
        //בדיקה האם אדמין
        if(userphone==="0527105433"){
            setAdmin(true);
        }
        //נגשים לשרת לבדיקת קיום שם המשתמש
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
                setErrorMessage("connection error, try again later");
                return;
            }

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
            setErrorMessage(""); 
            const data = await response.json();
            console.log("found user", data);
            setLoggedIn(true);
            setUserId(data.id);


        } catch (error) {
            console.error("שגיאה ברשת:", error);
        }

            // setExsist(true);
            setErrorMessage(""); 
            // const data = await response.json();
            // console.log("user found:", data);

        } catch (error) {
            console.error("error:", error);
            setErrorMessage("connection error, try again");
        }
    };

    //בדיקה האם הטלפון שהוכנס תואם לנתונים
    // const checkIfCorrectPhone = async () => {
    //     //בדיקת תקינות
        
    //     //נגשים לשרת לבדוק אם קיים נתון כזה במסד הנתונים
        
    // };

    //עדכון בכל רינדור
    useEffect(() => {
        if (userId) {
            console.log("userId was updated:", userId);
        }
    }, [userId]);


    return (
        <>
            {!loggedIn ? (<div className="Login">
                <h2>Login Page</h2>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="insert your username"
                />
                <p style={{ color: "red" }}>{errorMessage}</p>
                
                <input
                    type="text"
                    value={userphone}
                    onChange={(e) => setUserPhone(e.target.value)}
                    placeholder="insert your phone number"
                />
                <p style={{ color: "red" }}>{errorMessagePhone}</p>
                <button onClick={checkIfExsist}>ok</button>
                <button onClick={logUp}>log up</button>
                </div>
                ) : (//לאחר תהליך הרישום או הכניסה יוצגו רכיבי המערכת
                    <>
                        {/* <Nuv></Nuv> */}
                        <Welcome />
                        <ChooseTopic userId={userId} />
                        <LearningHistory userId={userId} />
                        {admin &&
                        <UserManagement/>}
                    </>
                
                )}
        </>     
    );
}
   


export default Login;
























// import { use, useState } from "react";
// import { useEffect } from "react";
// import Welcome from './Welcome';
// import ChooseTopic from './ChooseTopic';
// import LearningHistory from './LearningHistory';
// import UserManagement from "./UserManagement";
// import Nuv from './Nuv';


// function Login() {

//     const [username, setUsername] = useState("");
//     const [exsist, setExsist] = useState(false);
//     const [userphone, setUserPhone] = useState("");
//     const [needToLogin, setNeedToLogin] = useState(false);
//     const [loggedIn, setLoggedIn] = useState(false);
//     const [errorMessage, setErrorMessage] = useState("");
//     const [errorMessagePhone, setErrorMessagePhone] = useState("");
//     const [userId, setUserId] = useState("");
//     const [admin, setAdmin] = useState(false);



//     // useEffect(() => {
//     //     if (userId) {
//     //         console.log("userId was updated: ", userId);
//     //     }
//     // }, [userId]);

//     const logUp = async () => {
//         //בדיקת תקינות קלט
//         if (!username || username.trim().length < 1) {
//             setErrorMessage("Username must contain at least 1 character");
//             return;

//         }
        
//         const phoneRegex = /^\+?[0-9]{7,15}$/; 
//         if (!phoneRegex.test(userphone)) {
//             setErrorMessagePhone("Please enter a valid phone number");
//             return;
//         }

//         const user = {
//             name: username,
//             phone: userphone
//         };
//         console.log(user);

//         //יצירת אובייקט של משתמש במסד הנתונים
//         try {
//             const response = await fetch(`http://localhost:5084/api/User/CreateUser`, {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json"
//                 },
//                 body: JSON.stringify(user)
//             });

//             if (response.ok) {
//                 const createdUser = await response.json(); 
//                 // console.log("user created", createdUser);
//                 setUserId(createdUser.id);
//                 // console.log("userId set to: ", createdUser.id);
//                 setLoggedIn(true);
//             } else {
//                 console.log("error creating user");
//             }
//         } catch (err) {
//             console.error("Fetch error:", err);
//         }
//     }




//     //פונקציה לבדיקת קיום שם משתמש
//     const checkIfExsist = async () => {
//         //בדיקת קלט תקין
//         if (!username || username.trim().length < 1) {
//             setErrorMessage("Username must contain at least 1 character");
//             return;
//         }

//         //נגשים לשרת לבדיקת קיום שם המשתמש
//         try {
//             const response = await fetch(`http://localhost:5084/api/User/byName/${username}`);

//             if (response.status === 404) {
//                 // setNeedToLogin(true);
//                 setExsist(false);
//                 setErrorMessage("user name is not exsist");
//                 console.log("kkk ", errorMessage);
//                 return;
//             }

//             if (!response.ok) {
//                 console.error("server error", response.status);
//                 setErrorMessage("connection error, try again later");
//                 return;
//             }

//             setExsist(true);
//             setErrorMessage(""); 
//             const data = await response.json();
//             console.log("user found:", data);

//         } catch (error) {
//             console.error("error:", error);
//             setErrorMessage("connection error, try again");
//         }
//     };

//     //בדיקה האם הטלפון שהוכנס תואם לנתונים
//     const checkIfCorrectPhone = async () => {
//         //בדיקת תקינות
//         const phoneRegex = /^\+?[0-9]{7,15}$/; // תומך במספרים עם או בלי '+' ואורך סביר
//         if (!phoneRegex.test(userphone)) {
//             setErrorMessagePhone("Please enter a valid phone number");
//             return;
//         }
//         //בדיקה האם אדמין
//         if(userphone==="0527105433"){
//             setAdmin(true);
//         }
//         //נגשים לשרת לבדוק אם קיים נתון כזה במסד הנתונים
//         try {
//             const response = await fetch(`http://localhost:5084/api/User/byPhone/${userphone}`);

//             if (response.status === 404) {
//                 setErrorMessagePhone("phone is not correct")
//                 console.log("phone is not correct");
//                 return;
//             }

//             if (!response.ok) {
//                 setErrorMessage("שגיאת שרת, נסה שוב מאוחר יותר");
//                 console.error("server error", response.status);
//                 return;
//             }
//             setErrorMessage(""); 
//             const data = await response.json();
//             console.log("found user", data);
//             setLoggedIn(true);
//             setUserId(data.id);


//         } catch (error) {
//             console.error("שגיאה ברשת:", error);
//         }
//     };

//     //עדכון בכל רינדור
//     useEffect(() => {
//         if (userId) {
//             console.log("userId was updated:", userId);
//         }
//     }, [userId]);


//     return (
//         <>
//             {!loggedIn ? (!needToLogin ? (<div className="Login">
//                 <h2>Login Page</h2>
//                 <input
//                     type="text"
//                     value={username}
//                     onChange={(e) => setUsername(e.target.value)}
//                     placeholder="insert your username"
//                 />
//                 <p style={{ color: "red" }}>{errorMessage}</p>
//                 <button onClick={checkIfExsist}>ok</button>
//                 <button onClick={() => setNeedToLogin(true)}>log up</button>
//                 {exsist && <><input
//                     type="text"
//                     value={userphone}
//                     onChange={(e) => setUserPhone(e.target.value)}
//                     placeholder="insert your phone number"
//                 />
//                     <p style={{ color: "red" }}>{errorMessagePhone}</p>
//                     <button onClick={checkIfCorrectPhone}>insert</button></>}

//             </div>) : (
//                 <>
//                     <h3>log up</h3>
//                     <input
//                         type="text"
//                         value={username}
//                         onChange={(e) => setUsername(e.target.value)}
//                         placeholder="insert your username"
//                     />
//                     <input
//                         type="text"
//                         value={userphone}
//                         onChange={(e) => setUserPhone(e.target.value)}
//                         placeholder="insert your phone number"
//                     />
//                     <button onClick={logUp}>log up</button>
//                 </>
//             )) : (//לאחר תהליך הרישום או הכניסה יוצגו רכיבי המערכת
//                 <>
//                     {/* <Nuv></Nuv> */}
//                     <Welcome />
//                     <ChooseTopic userId={userId} />
//                     <LearningHistory userId={userId} />
//                     {admin &&
//                     <UserManagement/>}
//                 </>
//             )}
//         </>

//     );
// }



// export default Login;