import { ReactNode } from "react";

interface TipHeadingProps {
  children?: ReactNode;
  isDeath?: boolean;
}

const TipHeading = ({ children, isDeath }: TipHeadingProps) => {
  return (
    <div>
      <h1
        className={`text-5xl font-bold ${isDeath ? "text-[#F52A2A]" : "text-[#63C779]"}`}
      >
        {(children as string).toUpperCase()}
      </h1>
    </div>
  );
};

export default TipHeading;
