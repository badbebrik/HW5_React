import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { Box, Typography, Avatar } from "@mui/material";

const ProfilePage: React.FC = () => {
  const user = useSelector((state: RootState) => state.user);
  return (
    <Box p={3} display="flex" alignItems="center" flexDirection="column">
      <Avatar src={user.avatar} sx={{ width: 80, height: 80, mb: 2 }} />
      <Typography variant="h5">{user.username}</Typography>
      <Typography variant="subtitle1">{user.email}</Typography>
      <Typography variant="subtitle2">{user.group}</Typography>
    </Box>
  );
};

export default ProfilePage;
