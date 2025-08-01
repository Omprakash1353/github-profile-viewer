import { Tabs, Tab } from "@mui/material";
import { FC } from "react";

interface ProfileTabsProps {
  currentTab: number;
  setCurrentTab: (tab: number) => void;
}

export const ProfileTabs: FC<ProfileTabsProps> = ({ currentTab, setCurrentTab }) => (
  <Tabs
    value={currentTab}
    onChange={(_, val) => setCurrentTab(val)}
    sx={{ mb: 4 }}
  >
    <Tab label="Overview" />
    <Tab label="Repositories" />
    <Tab label="Analytics" />
  </Tabs>
);
