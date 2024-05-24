import { Outlet } from "react-router-dom";
import { BrandLogo } from "../atoms/text/Brandlogo";

export function LoginShell() {
  return (
    <div
      className="bg-back h-[100vh] text-fore max-w-full flex flex-col justify-stretch"
      // style={{
      //   backgroundImage: "url(/img/paper-texture.svg)",
      //   backgroundRepeat: "repeat",
      // }}
    >
      <LoginPageHeader />
      <div className="w-full h-full flex flex-col items-center justify-start padding-x overflow-x-hidden">
        {/* Container */}
        <div className="max-w-[780px] flex flex-col items-center justify-start h-full">
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
    <div className="w-full flex justify-between h-20 items-center container-narrow">
      <a href="/" className="clickable-opacity">
        <BrandLogo size={30} />
      </a>
      <div />
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

export function LoginCard(props: { children: React.ReactNode }) {
  return (
    <div className="relative shadow-md bg-[#f4efe3a3] mt-10 max-w-full w-[350px] rounded-[1rem] flex flex-col items-center p-8">
      {props.children}
    </div>
  );
}
