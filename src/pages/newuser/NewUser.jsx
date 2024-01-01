import React, { useState } from "react";
import "./newUser.css";
import { addUser } from "../../redux/apiCalls";
import { useDispatch } from "react-redux";
import { Publish } from "@mui/icons-material";
import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";

const NewUser = (props) => {

    const [inputs, setInputs] = useState({});
    const [file, setFile] = useState(null);
    const dispatch = useDispatch();

    const handleChange = (e) => {
        setInputs(prev => {
            return { ...prev, [e.target.name]: e.target.value }
        })
    }

    const handleClick = async (e) => {
        e.preventDefault();
        const fileName = new Date().getTime() + file.name;
        const storage = getStorage(app);
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log("Upload is " + progress + "% done");
                switch (snapshot.state) {
                    case "paused":
                        console.log("Upload is paused");
                        break;
                    case "running":
                        console.log("Upload is running");
                        break;
                    default:
                }
            },
            (error) => {
                // Handle unsuccessful uploads
            },
            async () => {
                try {
                    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                    const newUserData = {
                        ...inputs,
                        img: downloadURL,
                    };

                    // Call the updateTheProduct function
                    addUser(newUserData, dispatch);
                    window.alert("New User Data is Created See the Uer Table");
                } catch (error) {
                    console.error("Error getting download URL:", error);
                }
            }
        );
    };

    return (
        <div className="newUser">
            <div className="newUser">
                <h1 className="newUserTitle">New User</h1>
                <form className="newUserForm">
                    <div className="newUserItem">
                        <label>Username</label>
                        <input name="username" type="text" placeholder="john" onChange={handleChange} />
                    </div>
                    <div className="newUserItem">
                        <label>Full Name</label>
                        <input name="name" type="text" placeholder="John Smith" onChange={handleChange} />
                    </div>
                    <div className="newUserItem">
                        <label>Email</label>
                        <input name="email" type="email" placeholder="john@gmail.com" onChange={handleChange} />
                    </div>
                    <div className="newUserItem">
                        <label>Password</label>
                        <input name="password" type="password" placeholder="password" onChange={handleChange} />
                    </div>
                    <div className="newUserItem">
                        <label>Phone</label>
                        <input name="mob" type="text" placeholder="+1 123 456 78" onChange={handleChange} />
                    </div>
                    <div className="newUserItem">
                        <label>Address</label>
                        <input name="addr" type="text" placeholder="New York | USA" onChange={handleChange} />
                    </div>
                    <div className="newUserItem">
                        <label>Gender</label>
                        <div className="newUserGender">
                            <input type="radio" name="gender" id="male" value="male" />
                            <label for="male">Male</label>
                            <input type="radio" name="gender" id="female" value="female" />
                            <label for="female">Female</label>
                            <input type="radio" name="gender" id="other" value="other" />
                            <label for="other">Other</label>
                        </div>
                    </div>
                    <div className="newUserItem">
                        <label>Active</label>
                        <select className="newUserSelect" name="active" id="active">
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                        </select>
                    </div>
                    <div className="newUserItem">
                        <img
                            className="userUpdateImg"
                            src={"https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif"}
                            alt=""
                        />
                        <label htmlFor="file">
                            <Publish className="userUpdateIcon" />
                        </label>
                        <input type="file" id="file" style={{ display: "none" }} onChange={e => setFile(e.target.files[0])} />
                        <button className="newUserButton" onClick={handleClick}>Create</button>
                    </div>
                </form>
            </div>
        </div>
    )
};

export default NewUser;
