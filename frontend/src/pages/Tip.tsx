import TipHeading from "../components/TipHeading";
import CommunityRating from "../components/CommunityRating";
import CommentBox from "../components/CommentBox";
import WelcomeIcon from "../components/WelcomeIcon";
import PosterDetails from "../components/PosterDetails";
import UpvoteDownvote from "../components/UpvoteDownvote";

export const Tip = () => {


  return (
    <div
      id="tip-page-container"
      className="flex flex-col h-full items-center border border-red-400"
    >
      <div id="tip-header-container" className="flex w-3/5 my-5 border border-blue-400">
        <a href="google.com" className="inline-block text-lg underline underline-offset-4">&lt; Back to Home</a>
        
        <WelcomeIcon
          firstName="Jane"
          profilePic="https://i.pinimg.com/236x/57/3a/46/573a46c7818f8cca76e394ac5af72542.jpg"
        />
      </div>
      <div id="tip-post-container" className="flex flex-col w-1/2 border border-red-400">
        <div className="flex">
          <div className="inline-block ml-0 mr-auto border border-blue-400 w-4/5">
            <TipHeading>This is my tip hello hello hello hello</TipHeading> 
          </div>
          <div className="inline-block ml-auto mr-0 my-auto w-1/5 border border-purple-400">
            <CommunityRating rating="3" />
          </div>
        </div>

        <PosterDetails
          name="John Doe"
          profilePic="https://i.pinimg.com/236x/93/27/52/932752831eb277a92480d9830b4c072d.jpg"
          date={new Date('2024-10-22')}
        />

        <hr className="my-2" />
        <div>
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magnam inventore ipsum officiis id provident blanditiis numquam exercitationem, atque molestiae porro, amet tempora saepe consequuntur eius adipisci perspiciatis fugiat sunt at minus? Sunt, porro nobis. Error dolorem at veritatis quam, sequi eligendi, vitae consequuntur distinctio voluptatum quod voluptate ut? Excepturi nesciunt inventore iste culpa ratione reiciendis ducimus porro, ut exercitationem commodi nobis vel minus minima enim cumque nostrum laborum! Cumque dicta nemo animi suscipit tenetur dolore architecto in adipisci aut quam! Aliquid, ut sed quidem possimus exercitationem voluptatem repudiandae, vel necessitatibus corporis rem modi iste! Libero natus eius dolor quam similique.</p>
          <br />
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quam debitis expedita numquam consequuntur id magni molestias quae repellendus aut laudantium vero quaerat in repellat impedit suscipit, reprehenderit sit dolore! Nostrum nam sequi, velit dolor dolorem unde minima consequatur quisquam facilis perspiciatis sint suscipit ea debitis aliquam omnis, eaque possimus nobis!</p>
        </div>

        <div className="inline-block ml-0 mr-auto w-4/5 mb-8 mt-6">
          <UpvoteDownvote
            upvotes={5}
            downvotes={710}      
          />
        </div>
      </div>

      <div className="flex flex-col justify-center w-1/2">
        <div className="inline-block ml-0 mr-auto w-4/5 mb-8">
          <TipHeading>COMMENTS</TipHeading> 
        </div>

        <div className="mb-6 rounded-[26px]">
          <textarea  placeholder="Add a comment" className="flex border border-black flex w-full h-20 p-5 flex rounded-[26px] mb-4"></textarea>
          <button className="flex border border-black pl-5 pr-5 pt-2 pb-2 ml-auto rounded-[26px] bg-[#63C779] text-white hover:bg-[#518004]">Comment</button>
        </div>

        <div>
          <CommentBox
            name="Some name1"
            text="To be continued.."
            profilePic="https://i.pinimg.com/236x/57/3a/46/573a46c7818f8cca76e394ac5af72542.jpg"
            date={new Date('2024-10-26')}
          />
          <CommentBox
            name="Some name2"
            text="This is a comment!2"
            profilePic="https://i.pinimg.com/474x/ca/f7/67/caf7677c71e8a7bf115c77ff8761fec5.jpg"
            date={new Date('2024-10-26')}
          />
          <CommentBox
            name="Some name3"
            text="This is a very long comment. This is a very long comment. This is a very long comment. This is a very long comment. This is a very long comment."
            date={new Date('2024-10-26')}
          />
        </div>
      </div>
    </div>
  );
};
