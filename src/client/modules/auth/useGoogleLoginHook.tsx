import { useGoogleLogin } from "@react-oauth/google";
import useUserStore from "../../store/user/userStore";
import EventTracker from "../analytics/EventTracker";

export default function useGoogleLoginHook(): {
  onClickGoogleLogin: () => void;
  loading: boolean;
  error: string | null;
  succeeded: boolean;
} {
  // stores
  const userStore = useUserStore();

  async function onSuccessGoogleLogin(code: any) {
    EventTracker.signInWithGoogle();

    await userStore.loginWithGoogle(code);
  }

  const onClickGoogleLogin = useGoogleLogin({
    onSuccess: onSuccessGoogleLogin,
    onError: (error) => {},
    flow: "auth-code",
    ux_mode: "popup",
  });

  return {
    onClickGoogleLogin,
    loading: userStore.loading,
    error: userStore.error,
    succeeded: userStore.data.user.userParmId !== "",
  };
}
