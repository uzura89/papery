import { Fragment, useEffect, useState } from "react";
import clsx from "clsx";

import useGoogleLoginHook from "../../modules/auth/useGoogleLoginHook";
import { FormLabel } from "../atoms/input/FormLabel";
import { LoginCard, LoginHeader } from "../wrappers/LoginShell";
import {
  errorCheckEmail,
  errorCheckPassword,
} from "../../../common/modules/form/FormChecker";
import useUserStore from "../../store/user/userStore";

export default function SignupPage(props: {}) {
  // stores
  const userStore = useUserStore();
  // hooks
  const googleLogin = useGoogleLoginHook();
  // local state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verificationMailSent, setVerificationMailSent] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");

  const canSubmit = () => {
    const errorEmail = errorCheckEmail(email);
    if (errorEmail) {
      window.alert(errorEmail);
      return false;
    }
    const errorPassword = errorCheckPassword(password);
    if (errorPassword) {
      window.alert(errorPassword);
      return false;
    }

    return true;
  };

  const onClickSignup = () => {
    if (!canSubmit()) {
      return;
    }

    userStore.signUpWithEmail(email, password, () => {
      setVerificationMailSent(true);
    });
  };

  const onClickVerify = () => {
    userStore.verifyEmail(email, verificationCode);
  };

  useEffect(() => {
    if (googleLogin.succeeded) {
      window.location.href = "/";
    }
  }, [googleLogin.succeeded]);

  useEffect(() => {
    if (userStore.error) {
      window.alert(userStore.error);
    }
  }, [userStore.error]);

  function renderContent() {
    if (!verificationMailSent) {
      return (
        <div className="w-full">
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
            Sign Up
          </button>
        </div>
      );
    }

    return (
      <div className="w-full">
        <p>
          A verification mail has been sent to your email. Please enter the
          verification code below.
        </p>
        <FormLabel text="Verification Code" />
        <input
          className="form"
          value={verificationCode}
          onChange={(e) => setVerificationCode(e.target.value)}
        />

        <button
          className={clsx("btn", userStore.loading && "btn-disabled")}
          onClick={onClickVerify}
        >
          Verify
        </button>
      </div>
    );
  }

  return (
    <Fragment>
      {/* Header Text */}
      <LoginHeader title="Create an Account" />

      {/* Login Card */}
      <LoginCard>{renderContent()}</LoginCard>
    </Fragment>
  );
}
