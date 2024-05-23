import { useEffect } from "react";

import useGoogleLoginHook from "../../modules/auth/useGoogleLoginHook";
import { CONS_QUERY_PARAM_DEMO } from "../../../common/constants";

export default function LoginPage(props: {}) {
  // hooks
  const googleLogin = useGoogleLoginHook();

  const onClickDemo = () => {
    window.location.href = `/?${CONS_QUERY_PARAM_DEMO}=true`;
  };

  useEffect(() => {
    if (googleLogin.succeeded) {
      window.location.href = "/";
    }
  }, [googleLogin.succeeded]);

  return (
    <div className="w-full h-full flex flex-col items-center justify-start padding-x overflow-x-hidden">
      {/* Container */}
      <div className="max-w-[780px] flex flex-col items-center justify-start h-full">
        {/* Header Text */}
        <h1 className="font-serif text-2xl lg:text-4xl font-medium text-center leading-[1.2em] mt-12 lg:mt-24">
          Login to Papery
        </h1>

        {/* Login Card */}
        <div className="relative shadow-md bg-[#f4efe3a3] mt-10 max-w-full w-[350px] rounded-[1rem] flex flex-col items-center p-8">
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

            <button
              className="btn btn-large w-full bg-[#e07151] border-[#b7634b]"
              onClick={onClickDemo}
            >
              Try Demo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
