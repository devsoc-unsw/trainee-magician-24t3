import TipHeading from "../components/TipHeading";
import CommunityRating from "../components/CommunityRating";

export const Tip = () => {
  return (
    <div
      id="tip-page-container"
      className="flex flex-col h-full items-center border border-red-400"
    >
      <div id="tip-header-container" className="flex w-3/5 my-5 border border-blue-400">
        <a href="google.com" className="inline-block text-lg underline underline-offset-4">&lt; Back to Home</a>
        <div className="inline-block mr-0 ml-auto">
          <span className="text-lg">Welcome, Jane</span>
          <br />
          <span className="text-sm underline text-gray-500">See profile</span>
        </div>
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
        <hr className="my-2" />
        <div>
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magnam inventore ipsum officiis id provident blanditiis numquam exercitationem, atque molestiae porro, amet tempora saepe consequuntur eius adipisci perspiciatis fugiat sunt at minus? Sunt, porro nobis. Error dolorem at veritatis quam, sequi eligendi, vitae consequuntur distinctio voluptatum quod voluptate ut? Excepturi nesciunt inventore iste culpa ratione reiciendis ducimus porro, ut exercitationem commodi nobis vel minus minima enim cumque nostrum laborum! Cumque dicta nemo animi suscipit tenetur dolore architecto in adipisci aut quam! Aliquid, ut sed quidem possimus exercitationem voluptatem repudiandae, vel necessitatibus corporis rem modi iste! Libero natus eius dolor quam similique.</p>
          <br />
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quam debitis expedita numquam consequuntur id magni molestias quae repellendus aut laudantium vero quaerat in repellat impedit suscipit, reprehenderit sit dolore! Nostrum nam sequi, velit dolor dolorem unde minima consequatur quisquam facilis perspiciatis sint suscipit ea debitis aliquam omnis, eaque possimus nobis!</p>
        </div>
      </div>
    </div>
  );
};
