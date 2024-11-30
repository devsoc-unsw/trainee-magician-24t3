import TipHeading from "../components/TipHeading";

export const Tip = () => {
  return (
    <div
      id="tip-page-container"
      className="flex h-full items-center justify-center border border-red-400"
    >
      <div id="tip-post-container">
        <TipHeading>This is my tip</TipHeading> 
      </div>
    </div>
  );
};
