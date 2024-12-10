import Date from "../Date";

interface PosterDetailsObj {
  profilePic?: string;
  name: string;
  date: Date;
}

const PosterDetails = (props: PosterDetailsObj) => {
  return (
    <div className="mt-5 flex items-center">
      <img
        src={
          props.profilePic ||
          "https://i.pinimg.com/550x/18/b9/ff/18b9ffb2a8a791d50213a9d595c4dd52.jpg"
        }
        className="mr-4 h-8 w-8 rounded-full"
      />
      <h3 className="mr-1 text-base underline">{props.name}</h3>
      <h3 className="text-base">·&nbsp;</h3>
      <Date date={props.date} />
    </div>
  );
};

export default PosterDetails;
