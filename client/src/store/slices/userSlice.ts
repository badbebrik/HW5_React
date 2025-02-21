import { createSlice } from "@reduxjs/toolkit";

interface UserState {
  username: string;
  email: string;
  group: string;
  avatar: string;
}

const initialState: UserState = {
  username: "Серикова Виктория",
  email: "vaserikova@edu.hse.ru",
  group: "Студент",
  avatar:
    "https://avatars.mds.yandex.net/i?id=281dea9dcc7ba4266735104bc6292a03_l-9833405-images-thumbs&n=13",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
});

export default userSlice.reducer;
