import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  if(!localStorage.getItem('user')){
    console.log('inside local store')
    return localStorage.getItem('user');
  }
  else{  
  const response = await fetch("https://reqres.in/api/users?page=1");
  const users = await response.json();
  localStorage.setItem('user',users);
  console.log('insode api')
  return users;
  }
});

const usersSlice = createSlice({
  name: "users",
  initialState: {
    entities: [],
    loading: false,
  },
  reducers: {
    userAdded(state, action) {
      state.entities.push(action.payload);
    },
    userUpdated(state, action) {
      console.log(action.payload,'hfzhjdffsd');
      const { id, email,name,lastname} = action.payload;
      const existingUser = state.entities.find((user) => user.id === id);
      if (existingUser) {
        existingUser.first_name = name;
        existingUser.email = email;
        existingUser.last_name =lastname;
        
      }
    },
    userDeleted(state, action) {
      const { id } = action.payload;
      const existingUser = state.entities.find((user) => user.id === id);
      if (existingUser) {
        state.entities = state.entities.filter((user) => user.id !== id);
      }
    },
  },
  extraReducers: {
    [fetchUsers.pending]: (state, action) => {
      state.loading = true;
    },
    [fetchUsers.fulfilled]: (state, action) => {
      console.log(action.payload.data,'@@@slice');
      state.loading = false;
      state.entities = [...state.entities, ...action.payload.data];
    },
    [fetchUsers.rejected]: (state, action) => {
      state.loading = false;
    },
  },
});

export const { userAdded, userUpdated, userDeleted } = usersSlice.actions;

export default usersSlice.reducer;
