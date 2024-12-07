
interface WelcomeIconProps {
    profilePic?: string;
    firstName: string;
};

const WelcomeIcon = (props: WelcomeIconProps) => {

    return (
        <div className="flex inline-block mr-0 ml-auto">
          <div className="mr-4">
            <span className="text-lg">Welcome, {props.firstName}</span>
            <br />
            <span className="text-sm underline text-gray-500">See profile</span>
          </div>
          <img
            src={props.profilePic || "https://i.pinimg.com/550x/18/b9/ff/18b9ffb2a8a791d50213a9d595c4dd52.jpg"}
            className="w-16 h-16 rounded-full mb-2"
          />
        </div>
    );
};
  
export default WelcomeIcon;
