import Date from "../Date"

interface CommentObj {
    profilePic?: string;
    name: string;
    text: string;
    date: Date;
};

const CommentBox = (props: CommentObj) => {

    return (
        <div className="border border-black p-5 flex items-start space-x-4 rounded-[26px] mb-6">
            <div className="flex flex-col items-center">
                <img
                    src={props.profilePic || "https://i.pinimg.com/550x/18/b9/ff/18b9ffb2a8a791d50213a9d595c4dd52.jpg"}
                    className="w-12 h-12 rounded-full mb-2"
                />
                <h3 className="underline text-base">{props.name}</h3>
                <div className="flex">
                    <h3 className="text-base">Posted&nbsp;</h3>
                    <Date date={props.date} />
                </div>
            </div>
            
            <div>
                <p className="text-xl">{props.text}</p>
            </div>
        </div>
    );
};
  
export default CommentBox;

