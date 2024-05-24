import clsx from "clsx";
import { Fragment, useEffect, useState } from "react";

import useGoogleLoginHook from "../../modules/auth/useGoogleLoginHook";
import { FormLabel } from "../atoms/input/FormLabel";
import { LoginCard, LoginCardWrapper, OrLine } from "../wrappers/LoginShell";
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
        <LoginCardWrapper>
          <LoginCard>
            <div className="w-full">
              <div className="text-center font-bold font-serif mb-6">
                Create an account.
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
                Sign Up
              </button>
            </div>
          </LoginCard>
        </LoginCardWrapper>
      );
    }

    return (
      <div className="fadein-up">
        <LoginCard>
          <div className="w-full">
            <div className="text-center font-bold font-serif mb-4">
              Verify your email.
            </div>
            <p className="text-sm mb-4">
              A verification code has been sent to your email address. Please
              enter the code below.
            </p>
            <FormLabel text="Verification Code" />
            <input
              className="form w-full"
              placeholder="6-digit code"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
            />

            <button
              className={clsx(
                "btn btn-large mt-4 w-full",
                userStore.loading && "btn-disabled"
              )}
              onClick={onClickVerify}
            >
              Verify
            </button>
          </div>
        </LoginCard>
      </div>
    );
  }

  return <Fragment>{renderContent()}</Fragment>;
}
