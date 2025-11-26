import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { supabase } from "../supabaseCl";
import { setSession, setRole } from "../features/AuthSlice";
import Loader from "../component/Loader";
import { setisLoading } from "../features/AuthSlice";
import { Navigate } from "react-router-dom";

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();
  const { isLoading, session, role } = useSelector((state: any) => state.auth);

  useEffect(() => {
    supabase.auth
      .getSession()
      .then(({ data: { session } }) => {
        dispatch(setSession(session));
        dispatch(setRole(session?.user.user_metadata.role));
        dispatch(setisLoading(false));
      })
      .catch((err) => {
        dispatch(setSession(null));
        dispatch(setisLoading(false));
        if (err) throw new Error(err.message);
      });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      dispatch(setSession(session));
      dispatch(setRole(session?.user.user_metadata.role));
    });

    return () => subscription?.unsubscribe();
  }, [dispatch]);

  if (isLoading) return <Loader />;

  return <>{children}</>;
}
