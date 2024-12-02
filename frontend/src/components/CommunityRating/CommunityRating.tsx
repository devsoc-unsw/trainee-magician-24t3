interface CommunityRatingProps {
  rating?: string;
  showText?: boolean;
}

const CommunityRating = (props: CommunityRatingProps) => {
  const ratingComponentList = [];
  let numRating = 0;
  if (props.rating !== undefined) {
    numRating = parseInt(props.rating);
  }

  // reset rating to min or max if invalid input
  if (numRating >= 5) numRating = 5;
  if (numRating < 0) numRating = 0;

  // add filled / unfilled circle components
  for (let i = 0; i < numRating; i++) {
    ratingComponentList.push(
      <div className="m-1 flex h-5 w-5 rounded-full border border-black bg-[#63C779]"></div>
    );
  }
  for (let i = 0; i < 5 - numRating; i++) {
    ratingComponentList.push(
      <div className="m-1 flex h-5 w-5 rounded-full border border-black bg-white"></div>
    );
  }

  return (
    <div className="flex flex-col justify-center">
      {props.showText !== false && (
        <h3 className="m-auto text-lg font-semibold text-[#555555]">
          Community Rating
        </h3>
      )}
      <div className="flex flex-row justify-center">
        {ratingComponentList}
      </div>
    </div>
  );
};

export default CommunityRating;
