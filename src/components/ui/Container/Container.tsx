import "./Container.scss";
import { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  width?: string;
  margin?: string;
  justify?:
    | "flex-start"
    | "flex-end"
    | "center"
    | "space-between"
    | "space-around"
    | "space-evenly";
  align?: "flex-start" | "flex-end" | "center" | "baseline" | "stretch";
  direction?: "row" | "row-reverse" | "column" | "column-reverse";
  color?: string;
}

export function Container({
  children,
  justify,
  align,
  direction,
  color,
  width,
  margin,
}: ContainerProps) {
  return (
    <div
      className="container"
      style={{
        width: width ? width : "100%",
        margin: margin ? margin : "0",
        justifyContent: justify ? justify : "flex-start",
        alignItems: align ? align : "flex-start",
        flexDirection: direction ? direction : "row",
        backgroundColor: color ? color : "transparent",
      }}
    >
      {children}
    </div>
  );
}
