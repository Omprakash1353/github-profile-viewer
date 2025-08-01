import { Box } from "@mui/material";
import { FC } from "react";

export const Background: FC = () => (
  <>
    <Box
      sx={{
        position: 'absolute',
        top: '10%',
        left: '5%',
        width: '200px',
        height: '200px',
        background: 'radial-gradient(circle, rgba(25,118,210,0.1) 0%, rgba(25,118,210,0) 70%)',
        borderRadius: '50%',
        filter: 'blur(40px)',
      }}
    />
    <Box
      sx={{
        position: 'absolute',
        bottom: '10%',
        right: '5%',
        width: '300px',
        height: '300px',
        background: 'radial-gradient(circle, rgba(25,118,210,0.1) 0%, rgba(25,118,210,0) 70%)',
        borderRadius: '50%',
        filter: 'blur(40px)',
      }}
    />
  </>
);
