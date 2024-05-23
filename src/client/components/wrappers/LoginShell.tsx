import { Outlet } from "react-router-dom";
import { BrandLogo } from "../atoms/text/Brandlogo";

export default function LoginShell() {
  return (
    <div
      className="bg-back h-[100vh] text-fore max-w-full flex flex-col justify-stretch"
      style={{
        backgroundImage: "url(/img/paper-texture.svg)",
        backgroundRepeat: "repeat",
      }}
    >
      <LoginPageHeader />
      <Outlet />
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
