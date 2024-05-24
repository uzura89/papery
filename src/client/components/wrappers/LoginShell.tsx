import { Link, Outlet } from "react-router-dom";
import { BrandLogo } from "../atoms/text/Brandlogo";
import { CONS_PATH_LOGIN, CONS_PATH_SIGNUP } from "../../../common/constants";

export function LoginShell() {
  return (
    <div className="bg-back h-[100vh] text-fore max-w-full flex flex-col justify-stretch">
      <div className="w-full h-full flex flex-col items-center justify-start padding-x overflow-x-hidden">
        {/* Container */}
        <div className="max-w-[780px] flex flex-col items-center justify-center h-full sm:-translate-y-[5%]">
          <LoginPageHeader />
          <Outlet />
        </div>
      </div>
    </div>
  );
}

/**
 * Login Page Header
 */

function LoginPageHeader() {
  return (
    <div className="mb-12">
      <a href="/" className="clickable-opacity inline-block">
        <span className="hidden sm:block">
          <BrandLogo size={40} />
        </span>
        <span className="block sm:hidden">
          <BrandLogo size={30} />
        </span>
      </a>
    </div>
  );
}

export function LoginHeader(props: { title: string }) {
  return (
    <h1 className="font-serif text-2xl lg:text-4xl font-medium text-center leading-[1.2em] mt-12 lg:mt-24">
      {props.title}
    </h1>
  );
}
export function LoginCardWrapper(props: {
  children: React.ReactNode;
  login?: boolean;
}) {
  return (
    <div className="p-4 bg-backDim rounded-[1rem]">
      {props.children}

      {props.login ? (
        <div className="text-center text-foreLight text-sm mt-3">
          Don't have an account?
          <Link to={CONS_PATH_SIGNUP}>
            <span className="clickable-opacity font-bold ml-2 text-sm">
              Sign up
            </span>
          </Link>
        </div>
      ) : (
        <div className="text-center text-foreLight text-sm mt-3">
          Already have an account?
          <Link to={CONS_PATH_LOGIN}>
            <span className="clickable-opacity font-bold ml-2 text-sm">
              Login
            </span>
          </Link>
        </div>
      )}
    </div>
  );
}

export function LoginCard(props: { children: React.ReactNode }) {
  return (
    <div className="relative shadow-md bg-white max-w-full w-[330px] rounded-[1rem] flex flex-col items-center pt-5 pb-8 px-6">
      {props.children}
    </div>
  );
}

export function OrLine() {
  return (
    <div className="flex items-center justify-stretch gap-4 my-3">
      <span className="h-[1px] bg-border w-full" />
      <span className="text-[#9d9a94] text-sm">Or</span>
      <span className="h-[1px] bg-border w-full" />
    </div>
  );
}
