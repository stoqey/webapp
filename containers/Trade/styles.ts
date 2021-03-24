import { styled } from "baseui";

export const DesktopOrderBookWrapper = styled("div", ({ $theme }) => ({
  position: "absolute",
  top: "20%",
  right: "-310px",
  width: "300px",
  backgroundColor: $theme.colors.backgroundSecondary,
}));
