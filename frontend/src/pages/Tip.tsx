import TipHeading from "../components/TipHeading";
import CommunityRating from "../components/CommunityRating";

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
    </div>
  );
};
