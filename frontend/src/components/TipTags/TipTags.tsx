interface TipTagsProps {
  tags?: string[];
}

const letterToColourMap = new Map([
  ["A", "#DC2626"], // Red
  ["B", "#EA580C"], // Orange
  ["C", "#FCD34D"], // Yellow
  ["D", "#EEC94B"], // Yellow-Gold
  ["E", "#84CC16"], // Lime Green
  ["F", "#22C55E"], // Green
  ["G", "#10B981"], // Teal
  ["H", "#06B6D4"], // Light Blue
  ["I", "#2563EB"], // Blue
  ["J", "#4F46E5"], // Indigo
  ["K", "#7C3AED"], // Purple
  ["L", "#A855F7"], // Lavender
  ["M", "#EC4899"], // Hot Pink
  ["N", "#DB2777"], // Deep Pink
  ["O", "#D946EF"], // Magenta
  ["P", "#9F1239"], // Deep Red
  ["Q", "#C026D3"], // Bright Magenta
  ["R", "#D97706"], // Dark Orange
  ["S", "#B91C1C"], // Crimson Red
  ["T", "#0D9488"], // Turquoise
  ["U", "#4338CA"], // Deep Blue
  ["V", "#256D85"], // Blue-Green
  ["W", "#FACC15"], // Bright Yellow
  ["X", "#10A37F"], // Forest Green
  ["Y", "#9333EA"], // Deep Violet
  ["Z", "#0284C7"]  // Sky Blue
]);

const TipTags = (props: TipTagsProps) => {
  const tags: string[] = props.tags ?? [];

  return (
    <div className="mt-2 flex flex-row flex-wrap">
      {tags.map((tagString) => {
        console.log(letterToColourMap);
        console.log(tagString);
        console.log(letterToColourMap.get(tagString.charAt(1).toUpperCase()));
        return (
          <div className={`my-auto rounded-lg border border-neutral-400 bg-[${ letterToColourMap.get(tagString.charAt(1).toUpperCase()) ?? '#000000' }] px-2`}>
            <span className="text-white">{tagString}</span>
          </div>
        );
      })}
    </div>
  );
};

export default TipTags;
