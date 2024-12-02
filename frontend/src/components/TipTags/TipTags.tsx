interface TipTagsProps {
  tags?: string[];
}

const letterToColourMap = new Map([
  ["A", "#F87171"], // Pastel Red
  ["B", "#FB923C"], // Pastel Orange
  ["C", "#FACC15"], // Pastel Yellow
  ["D", "#FBBF24"], // Warm Yellow-Gold
  ["E", "#A3E635"], // Lime Green
  ["F", "#4ADE80"], // Pastel Green
  ["G", "#34D399"], // Pastel Teal
  ["H", "#22D3EE"], // Pastel Light Blue
  ["I", "#3B82F6"], // Pastel Blue
  ["J", "#6366F1"], // Pastel Indigo
  ["K", "#8B5CF6"], // Pastel Purple
  ["L", "#C084FC"], // Lavender
  ["M", "#EC4899"], // Hot Pink
  ["N", "#DB2777"], // Deep Pink
  ["O", "#D946EF"], // Magenta
  ["P", "#E11D48"], // Deep Red
  ["Q", "#C026D3"], // Bright Magenta
  ["R", "#FB923C"], // Pastel Dark Orange
  ["S", "#F43F5E"], // Crimson Red
  ["T", "#14B8A6"], // Turquoise
  ["U", "#4F46E5"], // Deep Blue
  ["V", "#2DD4BF"], // Blue-Green
  ["W", "#FACC15"], // Bright Yellow
  ["X", "#34D399"], // Forest Green
  ["Y", "#A855F7"], // Deep Violet
  ["Z", "#38BDF8"], // Sky Blue
]);

const TipTags = (props: TipTagsProps) => {
  const tags: string[] = props.tags ?? [];

  return (
    <div className="mt-2 flex flex-row flex-wrap">
      {tags.map((tagString, index) => {
        return (
          <div
            key={index}
            className="mx-px my-auto rounded-lg border border-neutral-400 px-2"
            style={{
              backgroundColor:
                letterToColourMap.get(tagString.charAt(1).toUpperCase()) ??
                "#000000",
            }}
          >
            <a className="text-white" href={`/tags/${tagString.substring(1)}`}>
              {tagString}
            </a>
          </div>
        );
      })}
    </div>
  );
};

export default TipTags;
