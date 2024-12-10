import TipTags from "../TipTags/TipTags";
import CommunityRating from "../CommunityRating/CommunityRating";

interface GridCardProps {
  title: string;
  tags: string[];
  rating: number;
  description: string;
  isDeath?: boolean;
}

const GridCard = ({ title, tags, rating, description, isDeath = false }: GridCardProps) => {
  const borderColor = isDeath ? "border-[#F52A2A]" : "border-[#63C779]";
  const bgColor = isDeath ? "bg-[#222222]" : "bg-white";
  const textColor = isDeath ? "text-white" : "text-black";
  const descriptionColor = isDeath ? "text-gray-300" : "text-gray-700";
  const shadowColor = isDeath ? "shadow-[#F52A2A]/10" : "shadow-[#63C779]/10";

  return (
    <div className="relative">
      {/* Main Card */}
      <div className={`
        relative z-10 flex h-full flex-col gap-2
        rounded-3xl border ${borderColor} ${bgColor}
        p-4 shadow-lg ${shadowColor}
      `}>
        {/* Title */}
        <h1 className={`
          text-2xl font-bold leading-tight
          ${textColor} line-clamp-2
        `}>
          {title}
        </h1>

        {/* Tags */}
        <div className="flex gap-1 overflow-x-auto">
          <TipTags tags={tags} />
        </div>

        {/* Description */}
        <p className={`
          flex-grow text-lg leading-snug
          ${descriptionColor} line-clamp-2
        `}>
          {description}
        </p>

        {/* Rating */}
        <div className="pt-2">
          <CommunityRating initialRating={rating} showText={false} />
        </div>
      </div>

      {/* Background Block */}
      <div className={`
        absolute inset-0 z-0 translate-x-1 translate-y-1
        rounded-3xl ${isDeath ? "bg-[#F52A2A]" : "bg-[#63C779]"}
      `} />
    </div>
  );
};

export default GridCard;
