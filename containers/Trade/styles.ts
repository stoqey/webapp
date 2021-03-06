import { styled } from "baseui";

export const DesktopOrderBookWrapper = styled("div", ({ $theme }) => ({
  position: "absolute",
  top: "20%",
  right: "-310px",
  width: "300px",
  height: "80%",
  overflow: "scroll",
  backgroundColor: $theme.colors.backgroundSecondary,
  "@media only screen and (max-width: 1200px)": {
    display: "block",
  },
  "@media only screen and (max-width: 767px)": {
    display: "none",
  },
}));

export const MobileOrderBookWrapper = styled("div", ({ $theme }) => ({
  display: "none",
  marginTop: "50px",
  width: "100%",
  "@media only screen and (max-width: 1200px)": {
    display: "none",
  },
  "@media only screen and (max-width: 767px)": {
    display: "block",
  },
}));
