import { useState } from "react";
import GridCard from "../../components/GridCard/GridCard";
import styles from "./ProfilePage.module.css";

export const ProfilePage = () => {
    const profilePic = "https://i.pinimg.com/236x/57/3a/46/573a46c7818f8cca76e394ac5af72542.jpg";

    // State to store user information
    const [userInfo, setUserInfo] = useState({
        username: "SomeCoolUsername101",
        fullName: "Random Person",
        email: "random.person789@gmail.com",
    });

    const [isEditing, setIsEditing] = useState(false);
    // Temporary state to hold edited profile information
    const [editInfo, setEditInfo] = useState({ ...userInfo });

    const handleEdit = () => setIsEditing(true);
    const handleSave = () => {
        setUserInfo({ ...editInfo });
        setIsEditing(false);
    };
    const handleCancel = () => {
        setEditInfo({ ...userInfo });
        setIsEditing(false);
    };
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditInfo((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <div>
            {/* Personal Info */}
            <div className={`flex items-center justify-start p-4 ${styles.personalInfoContainer}`}>
                <div className="flex ml-80">
                    <img
                        src={profilePic}
                        alt="Profile"
                        className={`w-16 h-16 rounded-full mb-4 ${styles.profileImage}`}
                    />
                </div>

                <div className="ml-12 text-black">
                    <h2 className="text-2xl font-bold mb-1">Profile</h2>

                    {isEditing ? (
                        // Edit Mode
                        <>
                            <div className="flex mb-2">
                                <p className="w-32">Username</p>
                                <input
                                    type="text"
                                    name="username"
                                    value={editInfo.username}
                                    onChange={handleChange}
                                    className="ml-2 border border-gray-300 rounded-lg p-1 w-[300px] h-6"
                                />
                            </div>
                            <div className="flex mb-2">
                                <p className="w-32">Full Name</p>
                                <input
                                    type="text"
                                    name="fullName"
                                    value={editInfo.fullName}
                                    onChange={handleChange}
                                    className="ml-2 border border-gray-300 rounded-lg p-1 w-[300px] h-6"
                                />
                            </div>
                            <div className="flex mb-2">
                                <p className="w-32">Email</p>
                                <input
                                    type="email"
                                    name="email"
                                    value={editInfo.email}
                                    onChange={handleChange}
                                    className="ml-2 border border-gray-300 rounded-lg p-1 w-[300px] h-6"
                                />
                            </div>

                            {/* Save and Cancel Buttons */}
                            <div className="mt-4">
                                <button
                                    onClick={handleSave}
                                    className={`px-4 py-2 text-white rounded mr-2 ${styles.editButtonStyle}`}
                                >
                                    Save
                                </button>
                                <button
                                    onClick={handleCancel}
                                    className={`px-4 py-2 text-white rounded ${styles.editButtonStyle} ${styles["button-cancel"]}`}
                                >
                                    Cancel
                                </button>
                            </div>
                        </>
                    ) : (
                        // View Mode
                        <>
                            <div className="flex mb-2">
                                <p className="w-32">Username</p>
                                <p className="ml-2">{userInfo.username}</p>
                            </div>
                            <div className="flex mb-2">
                                <p className="w-32">Full Name</p>
                                <p className="ml-2">{userInfo.fullName}</p>
                            </div>
                            <div className="flex mb-2">
                                <p className="w-32">Email</p>
                                <p className="ml-2">{userInfo.email}</p>
                            </div>

                            {/* Edit Button */}
                            <div
                                onClick={handleEdit}
                                className={`mt-4 px-5 py-2 flex items-center text-white cursor-pointer ${styles.editButtonStyle}`}
                            >
                                <img
                                    src="https://www.citypng.com/public/uploads/preview/hd-white-angle-pencil-icon-png-701751695040455ni7fjxt6ug.png"
                                    alt="Edit Icon"
                                    className={`mr-2 ${styles.editIcon}`}
                                />
                                <span>EDIT PROFILE</span>
                            </div>
                        </>
                    )}
                </div>
            </div>

            <div className={styles.savedContainer}>
                {/* Tips Section */}
                <div className="flex gap-5 ml-64">
                    <div className="text-center mt-6">
                        <p className="mb-2">Tips Created</p>
                        <div className={styles.tipsCreatedBar}></div>
                    </div>
                    <div className="text-center mt-6">
                        <p className="mb-2">Tips Saved</p>
                        <div className={styles.tipsSavedBar}></div>
                    </div>
                </div>

                {/* GridCards Section */}
                <div className={`grid mt-6 ml-64 ${styles.gridContainer}`}>
                    {Array.from({ length: 8 }).map((_, index) => (
                        <div key={index} className={styles.gridCardWrapper}>
                            <GridCard
                                title="Drink Water Everyday"
                                tags={["health", "drink"]}
                                rating="3.5"
                                description="Study shows that everyone who drinks water everyday lives longer than those who never drinks."
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};