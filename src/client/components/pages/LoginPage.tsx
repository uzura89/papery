import clsx from "clsx";
import { Fragment, useEffect, useState } from "react";

import useGoogleLoginHook from "../../modules/auth/useGoogleLoginHook";
import { LoginCard, LoginHeader } from "../wrappers/LoginShell";
import { FormLabel } from "../atoms/input/FormLabel";
import useUserStore from "../../store/user/userStore";

export default function LoginPage(props: {}) {
  const userStore = useUserStore();
  // hooks
  const googleLogin = useGoogleLoginHook();
  // states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onClickSignup = () => {
    userStore.loginWithEmail(email, password);
  };

  useEffect(() => {
    if (googleLogin.succeeded) {
      window.location.href = "/";
    }
  }, [googleLogin.succeeded]);

  return (
    <Fragment>
      {/* Header Text */}
      <LoginHeader title="Login to Papery" />

      {/* Login Card */}
      <LoginCard>
        {/* Button */}
        <div className="w-full">
          <button
            className="btn btn-large btn-white w-full"
            onClick={googleLogin.onClickGoogleLogin}
          >
            <img src="/img/icons/google.svg" className="w-[16px] mr-2" />
            Continue with Google
          </button>

          {/* Or line */}
          <div className="flex items-center justify-stretch gap-4 my-3">
            <span className="h-[1px] bg-border w-full" />
            <span className="text-[#9d9a94] text-sm">Or</span>
            <span className="h-[1px] bg-border w-full" />
          </div>

          {/* Email & Password */}
          <FormLabel text="Email" />
          <input
            className="form"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <FormLabel text="Password" />
          <input
            className="form"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            className={clsx("btn", userStore.loading && "btn-disabled")}
            onClick={onClickSignup}
          >
            Login
          </button>
        </div>
      </LoginCard>
    </Fragment>
  );
}
