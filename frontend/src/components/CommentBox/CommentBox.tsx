import Date from "../Date"
import DefaultCharacter from "./default_character.jpg"

interface CommentBoxProps {
    profilePic?: string;
    name: string;
    text: string;
    date: Date;
}

const CommentBox = ({ profilePic, name, text, date }: CommentBoxProps) => {
    return (
        <div className="mb-6 flex items-start space-x-4 rounded-[26px] border border-black p-5">
            <div className="flex flex-col items-center">
                <img
                    src={profilePic || DefaultCharacter}
                    alt={`${name}'s profile`}
                    className="mb-2 h-12 w-12 rounded-full object-cover"
                />
                <h3 className="text-base underline">{name}</h3>
                <div className="flex">
                    <h3 className="text-base">Posted&nbsp;</h3>
                    <Date date={date} />
                </div>
            </div>
            
            <div className="flex-1">
                <p className="text-xl break-words">{text}</p>
            </div>
        </div>
    );
};
  
export default CommentBox;

