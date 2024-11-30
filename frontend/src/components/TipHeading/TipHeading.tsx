import { ReactNode } from "react";

interface TipHeadingProps {
  children?: ReactNode;
}

const TipHeading = (props: TipHeadingProps) => {
  return (
    <div>
      <h1 className="text-6xl font-bold text-[#63C779]">
        {(props.children as String).toUpperCase()}
      </h1>
    </div>
  );
};

export default TipHeading;
