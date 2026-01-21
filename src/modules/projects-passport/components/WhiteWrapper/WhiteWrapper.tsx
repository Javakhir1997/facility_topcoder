import { CSSProperties, ReactNode } from "react";

export default function WhiteWrapper({ children }: { children: ReactNode }) {

  const wrapperStyle:CSSProperties={
    backgroundColor:"white",
    padding:" 20px 30px",

  }
  return <div style={wrapperStyle}>{children}</div>;
}
