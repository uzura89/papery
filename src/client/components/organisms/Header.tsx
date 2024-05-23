import clsx from "clsx";
import {
  LuBarChart3,
  LuClock,
  LuHome,
  LuLayoutTemplate,
  LuLogOut,
  LuMessagesSquare,
  LuMoreVertical,
  LuSettings,
  LuTag,
} from "react-icons/lu";
import { useLocation, useNavigate } from "react-router-dom";

import { BrandLogo } from "../atoms/text/Brandlogo";
import {
  CONS_PATH_HOME,
  CONS_PATH_LOGIN,
  CONS_PATH_REFLECT,
  CONS_PATH_REPORT,
  CONS_PATH_SETTINGS,
  CONS_PATH_TAGS,
  CONS_PATH_TEMPLATES,
} from "../../../common/constants";
import Dropdown from "../molecules/selection/Dropdown";
import { deleteAccessToken } from "../../modules/auth/AccessTokenUtils";

export function Header() {
  const navigate = useNavigate();

  function onClickLogout() {
    deleteAccessToken();
    window.location.href = CONS_PATH_LOGIN;
  }

  function onClickBrand() {
    window.location.href = CONS_PATH_HOME;
  }
  function goToPage(path: string) {
    // preserve query string
    const queryDemo = new URLSearchParams(window.location.search).get("demo");
    const query = queryDemo ? `?demo=${queryDemo}` : "";
    navigate(`${path}${query}`);
  }

  function onClickFeedback() {
    // open in new tab
    window.open(`https://papery.canny.io/feature-requests`, "_blank");
  }

  return (
    <div className="container-full h-12 lg:h-16 flex items-center justify-stretch">
      {/* Brand */}
      <div onClick={onClickBrand} className="cursor-pointer">
        <BrandLogo size={22} />
      </div>

      {/* Menu */}
      <div className="grow">
        <div className="hidden md:block">
          <Menu goToPage={goToPage} />
        </div>
      </div>

      {/* Options for PC */}
      <div className="hidden md:block">
        <OptionButton
          options={[
            {
              text: "Forum",
              icon: <LuMessagesSquare />,
              onClick: onClickFeedback,
            },
            { text: "Logout", icon: <LuLogOut />, onClick: onClickLogout },
          ]}
        />
      </div>

      {/* Options for Mobile */}
      <div className="block md:hidden">
        {" "}
        <OptionButton
          options={[
            {
              text: "Home",
              icon: <LuHome />,
              onClick: () => goToPage(CONS_PATH_HOME),
            },
            {
              text: "Tags",
              icon: <LuTag />,
              onClick: () => goToPage(CONS_PATH_TAGS),
            },
            {
              text: "Templates",
              icon: <LuLayoutTemplate />,
              onClick: () => goToPage(CONS_PATH_TEMPLATES),
            },
            {
              text: "Reflection",
              icon: <LuClock />,
              onClick: () => goToPage(CONS_PATH_REFLECT),
            },
            {
              text: "Report",
              icon: <LuBarChart3 />,
              onClick: () => goToPage(CONS_PATH_REPORT),
            },
            {
              text: "Settings",
              icon: <LuSettings />,
              onClick: () => goToPage(CONS_PATH_SETTINGS),
            },
            {
              text: "Forum",
              icon: <LuMessagesSquare />,
              onClick: onClickFeedback,
            },
            { text: "Logout", icon: <LuLogOut />, onClick: onClickLogout },
          ]}
        />
      </div>
    </div>
  );
}

/**
 * Menu
 */

function Menu(props: { goToPage: (path: string) => void }) {
  const location = useLocation();
  const paramString = location.search;

  return (
    <div className="flex items-center justify-start gap-2 grow ml-20">
      <MenuItem
        pathname={CONS_PATH_HOME}
        currentPathname={location.pathname}
        title="Home"
        paramString={paramString}
        goToPage={props.goToPage}
      />

      <MenuItem
        pathname={CONS_PATH_TAGS}
        currentPathname={location.pathname}
        title="Tags"
        paramString={paramString}
        goToPage={props.goToPage}
      />
      <MenuItem
        pathname={CONS_PATH_TEMPLATES}
        currentPathname={location.pathname}
        title="Templates"
        paramString={paramString}
        goToPage={props.goToPage}
      />
      <MenuItem
        pathname={CONS_PATH_REFLECT}
        currentPathname={location.pathname}
        title="Reflection"
        paramString={paramString}
        goToPage={props.goToPage}
      />
      <MenuItem
        pathname={CONS_PATH_REPORT}
        currentPathname={location.pathname}
        title="Report"
        paramString={paramString}
        goToPage={props.goToPage}
      />
      <MenuItem
        pathname={CONS_PATH_SETTINGS}
        currentPathname={location.pathname}
        title="Settings"
        paramString={paramString}
        goToPage={props.goToPage}
      />
    </div>
  );
}

/**
 * Menu Item
 */

function MenuItem(props: {
  pathname: string;
  currentPathname: string;
  title: string;
  paramString: string;
  goToPage: (path: string) => void;
}) {
  return (
    <button
      className={clsx(
        "clickable-text rounded-full py-[4px] px-[12px] font-medium text-sm",
        props.pathname === props.currentPathname
          ? "text-fore"
          : "text-foreLight"
      )}
      onClick={() => props.goToPage(props.pathname)}
    >
      {props.title}
    </button>
  );
}

function OptionButton(props: {
  options: { icon: React.ReactNode; text: string; onClick: () => void }[];
}) {
  return (
    <Dropdown width="130px" items={props.options} top={32}>
      <div className="clickable-text w-7 h-7 rounded-md flex items-center justify-center text-lg">
        <LuMoreVertical className="opacity-80" />
      </div>
    </Dropdown>
  );
}
