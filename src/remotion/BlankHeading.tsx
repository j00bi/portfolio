import { AbsoluteFill } from "remotion";

export const BlankHeading = () => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#ffffff",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Arial, Helvetica, sans-serif",
      }}
    >
      <h1
        style={{
          color: "#111111",
          fontSize: 96,
          fontWeight: 700,
          margin: 0,
        }}
      >
        Hello HUsni
      </h1>
    </AbsoluteFill>
  );
};
