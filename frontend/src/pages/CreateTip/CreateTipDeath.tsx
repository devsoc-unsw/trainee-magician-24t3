import WelcomeIcon from "../../components/WelcomeIcon";
import TipTags from "../../components/TipTags";

export function CreateTipDeath() {
    return (
        <div
            style={{
                height: "100%",
                minHeight: "100vh",
                backgroundColor: "black",
                overflowX: "hidden",
            }}
            className="flex flex-col items-center"
        >
            {/* Header Section */}
            <div id="tip-header-container" className="flex w-3/5 justify-between items-center mt-10 mb-6">
                <a
                    href="google.com"
                    className="inline-block text-lg underline underline-offset-4 text-white"
                >
                    &lt; Back to Home
                </a>

                <WelcomeIcon
                    firstName="Jane"
                    showText={false}
                    profilePic="https://i.pinimg.com/236x/57/3a/46/573a46c7818f8cca76e394ac5af72542.jpg"
                />
            </div>

            {/* Input Section */}
            <div className="w-1/2">
                {/* Title Input */}
                <input
                    type="text"
                    placeholder="Please enter a title"
                    className="w-full h-12 px-4 mb-4 border border-black rounded-lg focus:outline-none focus:border-red-500"
                />

                {/* Tags Section */}
                <div className="flex items-center mb-4">
                    <p className="text-lg font-semibold mr-2 text-white">Tags:</p>
                    <div className="flex items-center relative top-[-2px]">
                        <TipTags tags={["#tags", "#tags", "#tags"]} />
                    </div>
                </div>

                {/* Content Input */}
                <textarea
                    className="w-full h-80 px-4 py-2 border border-black rounded-lg resize-none mb-2 focus:outline-none focus:border-red-500"
                />

                {/* Upload Button */}
                <div className="flex items-center mb-5">
                    <button
                        className="flex items-center justify-center w-10 h-10 bg-white border border-black rounded-lg mr-2"
                    >
                        <span className="text-2xl">+</span>
                    </button>
                    <span className="text-white">Upload an image</span>
                </div>

                {/* Publish Button */}
                <div className="relative">
                    <div
                        className="absolute top-1 left-1 bg-black rounded-lg"
                        style={{ width: "105px", height: "48px" }}
                    ></div>
                    <button className="relative px-6 py-3 bg-red-600 text-black font-bold rounded-lg hover:bg-green-600">
                        Publish
                    </button>
                </div>
            </div>
        </div>
    );
}