import { memo } from "react";
import GridCard from "../GridCard";
import { TipData } from "../../types/tip";

interface TipsGridProps {
  tips: TipData[];
  isDeath: boolean;
}

const TipsGrid = memo(({ tips, isDeath }: TipsGridProps) => {
  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {tips.map((tip) => (
        <div
          key={tip.tipId}
          className="cursor-pointer transition-transform hover:-translate-y-1"
          onClick={() => (window.location.href = `/tip/${tip.tipId}`)}
        >
          <GridCard
            title={tip.title}
            tags={tip.tags}
            rating={
              tip.ratings?.reduce((acc, curr) => acc + curr.value, 0) /
                (tip.ratings?.length || 1) || 0
            }
            description={tip.description}
            isDeath={isDeath}
          />
        </div>
      ))}
    </div>
  );
});

export default TipsGrid; 