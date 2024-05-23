import { Outlet } from "react-router-dom";
import { BrandLogo } from "../atoms/text/Brandlogo";

export default function LoginShell() {
  return (
    <div
      className="bg-back min-h-[100vh] text-fore max-w-full"
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
      <BrandLogo size={30} />
      <div />
    </div>
  );
}
