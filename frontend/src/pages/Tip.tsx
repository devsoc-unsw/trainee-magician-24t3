import TipHeading from "../components/TipHeading";
import CommunityRating from "../components/CommunityRating";
import CommentBox from "../components/CommentBox";

export const Tip = () => {


  return (
    <div
      id="tip-page-container"
      className="flex h-full items-center justify-center border border-red-400"
    >
      <div id="tip-post-container" className="flex justify-center w-1/2 border border-red-400">
        <div className="inline-block ml-0 mr-auto border border-blue-400 w-4/5">
          <TipHeading>This is my tip hello hello hello hello</TipHeading> 
        </div>
        <div className="inline-block ml-auto mr-0 my-auto w-1/5 border border-purple-400">
          <CommunityRating rating="3" />
        </div>
      </div>

      <div className="flex flex-col justify-center w-1/2 border border-red-400">
        <div className="inline-block ml-0 mr-auto border border-blue-400 w-4/5">
          <TipHeading>COMMENTS</TipHeading> 
        </div>

        <div>
          <CommentBox
            name="Someone's name1"
            text="To be continued.."
            profilePic="https://i.pinimg.com/236x/57/3a/46/573a46c7818f8cca76e394ac5af72542.jpg"
          />
          <CommentBox
            name="Someone's name2"
            text="This is a comment!2"
            profilePic="https://i.pinimg.com/474x/ca/f7/67/caf7677c71e8a7bf115c77ff8761fec5.jpg"
          />
          <CommentBox
            name="Someone's name3"
            text="This is also a comment!3"
          />
        </div>
      </div>
    </div>
  );
};
