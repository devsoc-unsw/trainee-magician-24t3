interface CommentObj {
    profilePic?: string;
    name: string;
    text: string;
};

const CommentBox = (props: CommentObj) => {

    return (
        <div className="border p-4 flex items-start space-x-4">
            <img
                src={props.profilePic || "https://i.pinimg.com/550x/18/b9/ff/18b9ffb2a8a791d50213a9d595c4dd52.jpg"}
                className="w-12 h-12 rounded-full"
            />
            <div>
                <h3 className="font-bold">{props.name}</h3>
                <p className="text-gray-700">{props.text}</p>
            </div>
        </div>
    );
};
  
export default CommentBox;

