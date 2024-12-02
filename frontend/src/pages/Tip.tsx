import TipHeading from "../components/TipHeading";
import CommunityRating from "../components/CommunityRating";
import CommentBox from "../components/CommentBox";
import WelcomeIcon from "../components/WelcomeIcon";
import PosterDetails from "../components/PosterDetails";
import UpvoteDownvote from "../components/UpvoteDownvote";
import TipTags from "../components/TipTags";
import FavouriteButton from "../components/FavouriteButton/FavouriteButton";

export const Tip = () => {
  return (
    <div id="tip-page-container" className="flex h-full flex-col items-center">
      <div id="tip-header-container" className="my-5 flex w-3/5">
        <a
          href="/"
          className="inline-block text-lg underline underline-offset-4"
        >
          &lt; Back to Home
        </a>

        <WelcomeIcon
          firstName="Jane"
          profilePic="https://i.pinimg.com/236x/57/3a/46/573a46c7818f8cca76e394ac5af72542.jpg"
        />
      </div>
      <div id="tip-post-container" className="flex w-1/2 flex-col">
        <div className="flex">
          <div className="ml-0 mr-auto inline-block w-4/5">
            <TipHeading>This is my tip hello hello hello hello</TipHeading>
          </div>
          <div className="my-auto ml-auto mr-0 inline-block w-1/5">
            <CommunityRating initialRating={3} />
          </div>
        </div>

        <PosterDetails
          name="John Doe"
          profilePic="https://i.pinimg.com/236x/93/27/52/932752831eb277a92480d9830b4c072d.jpg"
          date={new Date("2024-10-22")}
        />

        <TipTags
          tags={[
            "#lorem",
            "#ipsum",
            "#dolor",
            "#sit_amet_consectetur",
            "#elit",
            "#magnam",
            "#libero",
            "#adipisci",
            "#corporis",
            "#quae",
            "#suscipit",
            "#natus",
            "#rem",
          ]}
        ></TipTags>

        <hr className="my-2" />
        <div>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magnam
            inventore ipsum officiis id provident blanditiis numquam
            exercitationem, atque molestiae porro, amet tempora saepe
            consequuntur eius adipisci perspiciatis fugiat sunt at minus? Sunt,
            porro nobis. Error dolorem at veritatis quam, sequi eligendi, vitae
            consequuntur distinctio voluptatum quod voluptate ut? Excepturi
            nesciunt inventore iste culpa ratione reiciendis ducimus porro, ut
            exercitationem commodi nobis vel minus minima enim cumque nostrum
            laborum! Cumque dicta nemo animi suscipit tenetur dolore architecto
            in adipisci aut quam! Aliquid, ut sed quidem possimus exercitationem
            voluptatem repudiandae, vel necessitatibus corporis rem modi iste!
            Libero natus eius dolor quam similique.
          </p>
          <br />
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quam
            debitis expedita numquam consequuntur id magni molestias quae
            repellendus aut laudantium vero quaerat in repellat impedit
            suscipit, reprehenderit sit dolore! Nostrum nam sequi, velit dolor
            dolorem unde minima consequatur quisquam facilis perspiciatis sint
            suscipit ea debitis aliquam omnis, eaque possimus nobis!
          </p>
        </div>

        <div className="my-4 flex flex-row items-center">
          <div className="ml-0 mr-auto inline-block w-4/5">
            <UpvoteDownvote upvotes={5} downvotes={710} />
          </div>
          <div className="ml-auto mr-0 inline-block w-1/5">
            <FavouriteButton />
          </div>
        </div>
      </div>

      <div className="flex w-1/2 flex-col justify-center">
        <div className="mb-8 ml-0 mr-auto inline-block w-4/5">
          <TipHeading>COMMENTS</TipHeading>
        </div>

        <div className="mb-6 rounded-[26px]">
          <textarea
            placeholder="Add a comment"
            className="mb-4 flex h-20 w-full rounded-[26px] border border-black p-5"
          ></textarea>
          <button className="ml-auto flex rounded-[26px] border border-black bg-[#63C779] pb-2 pl-5 pr-5 pt-2 text-white hover:bg-[#518004]">
            Comment
          </button>
        </div>

        <div>
          <CommentBox
            name="Some name1"
            text="To be continued.."
            profilePic="https://i.pinimg.com/236x/57/3a/46/573a46c7818f8cca76e394ac5af72542.jpg"
            date={new Date("2024-10-26")}
          />
          <CommentBox
            name="Some name2"
            text="This is a comment!2"
            profilePic="https://i.pinimg.com/474x/ca/f7/67/caf7677c71e8a7bf115c77ff8761fec5.jpg"
            date={new Date("2024-10-26")}
          />
          <CommentBox
            name="Some name3"
            text="This is a very long comment. This is a very long comment. This is a very long comment. This is a very long comment. This is a very long comment."
            date={new Date("2024-10-26")}
          />
        </div>
      </div>
    </div>
  );
};
