import { createSlice,PayloadAction } from "@reduxjs/toolkit";
import {Session,User} from "@supabase/supabase-js"

interface AuthState {
  user: User | null;
  session: Session | null;
  isLoading : boolean;
  role: string
}

const initialState: AuthState = {
  user: null,
  session: null,
  isLoading: true,
  role: ""
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers:{
    setSession(state,action:PayloadAction<Session|null>){
        state.session = action.payload;
        state.user= action.payload?.user || null
    },
    setisLoading(state,action:PayloadAction<boolean>){
      state.isLoading = action.payload
    },
    setRole(state,action:PayloadAction<string>){
       state.role = action.payload
    }
  }
})

export default authSlice.reducer
export const {setSession,setisLoading,setRole} = authSlice.actions