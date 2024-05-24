import clsx from "clsx";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import useGoogleLoginHook from "../../modules/auth/useGoogleLoginHook";
import {
  LoginCard,
  LoginCardWrapper,
  LoginHeader,
  OrLine,
} from "../wrappers/LoginShell";
import { FormLabel } from "../atoms/input/FormLabel";
import useUserStore from "../../store/user/userStore";

export default function LoginPage(props: {}) {
  // stores
  const userStore = useUserStore();
  // hooks
  const googleLogin = useGoogleLoginHook();
  // states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onClickSignup = () => {
    if (!email || !password) {
      window.alert("Please fill in the email and password fields.");
      return;
    }

    userStore.loginWithEmail(email, password);
  };

  useEffect(() => {
    if (googleLogin.succeeded) {
      window.location.href = "/";
    }
  }, [googleLogin.succeeded]);

  return (
    <LoginCardWrapper login>
      <LoginCard>
        <div className="w-full">
          <div className="text-center font-bold font-serif mb-6">
            Welcome back!
          </div>

          <button
            className={clsx(
              "btn btn-large btn-white w-full",
              userStore.loading && "btn-disabled"
            )}
            onClick={googleLogin.onClickGoogleLogin}
          >
            <img src="/img/icons/google.svg" className="w-[16px] mr-2" />
            Continue with Google
          </button>

          {/* Or line */}
          <OrLine />

          {/* Email & Password */}
          <FormLabel text="Email" />
          <input
            className="form w-full mb-2"
            placeholder="example@mail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <FormLabel text="Password" />
          <input
            className="form w-full mb-5"
            type="password"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            className={clsx(
              "btn w-full btn-large",
              userStore.loading && "btn-disabled"
            )}
            onClick={onClickSignup}
          >
            Login
          </button>
        </div>
      </LoginCard>
    </LoginCardWrapper>
  );
}
