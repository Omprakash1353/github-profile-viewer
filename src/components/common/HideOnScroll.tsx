import { Slide, useScrollTrigger } from "@mui/material";
import { FC, ReactElement } from "react";

interface HideOnScrollProps {
  children: ReactElement;
}

export const HideOnScroll: FC<HideOnScrollProps> = ({ children }) => {
  const trigger = useScrollTrigger();
  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
};
