import Date from "../Date"

interface PosterDetailsObj {
    profilePic?: string;
    name: string;
    date: Date;
};

const PosterDetails = (props: PosterDetailsObj) => {

    return (
        <div className="p-2 flex items-start space-x-4 mt-3">
            <div className="flex items-center">
                <img
                    src={props.profilePic || "https://i.pinimg.com/550x/18/b9/ff/18b9ffb2a8a791d50213a9d595c4dd52.jpg"}
                    className="w-8 h-8 rounded-full mb-2 mr-4"
                />
                <h3 className="underline text-base mr-1">{props.name}</h3>
                <h3 className="text-base">·&nbsp;</h3>
                <Date date={props.date} />
              
            </div>
        </div>
    );
};
  
export default PosterDetails;