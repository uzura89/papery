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
    <div className="w-full flex flex-col items-center justify-start padding-x overflow-x-hidden">
      {/* Container */}
      <div className="max-w-[780px] flex flex-col items-center">
        {/* Header Text */}
        <h1 className="font-serif text-5xl font-medium text-center mt-10 leading-[1.2em]">
          Stop Searching for the Perfect Journal App, Make One
        </h1>

        {/* Description */}
        <div className="font-serif mt-10 max-w-[420px] text-center text-lg">
          <p>
            Write diaries in markdown, organize by tags, customize templates,
            create your own reports, and more.
          </p>
        </div>

        {/* Login Card */}
        <div className="relative shadow-md bg-[#f4efe3a3] mt-10 max-w-[450px] w-full rounded-[1rem] flex flex-col items-center p-8">
          <div className="font-serif text-lg">Start writing your journal</div>

          {/* Button */}
          <div className="mt-8 w-full">
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

          {/* Hand Image */}
          {/* <img
            className="absolute right-[-240px] top-[40%] w-[300px] -z-0"
            src="/img/hand-and-pen.webp"
          /> */}
        </div>

        {/* Description */}
        <div className="font-serif mt-10 max-w-[350px] text-center">
          <h1 className="font-bold text-xl mb-3">Basic Features:</h1>

          <p>
            Markdown &#x2022; AES256 Encryption &#x2022; Emoji calendar &#x2022;
            Data export &#x2022; Custom templates &#x2022; Visual reports
            &#x2022; Advanced tag capability
          </p>
        </div>
      </div>
    </div>
  );
}
