import clsx from "clsx";

import useUiStore from "../../store/ui/uiStore";
import { EntriesSection } from "../organisms/entry/EntriesSection";
import { EntryHistorySection } from "../organisms/entry/EntryHistorySection";
import { LuCalendar, LuX } from "react-icons/lu";
import { PinnedEntriesSection } from "../organisms/pinned/PinnedEntriesSection";

export default function HomePage() {
  const uiStore = useUiStore();

  const onClickCalendar = () => {
    uiStore.toggleCalendarVisibility();
  };

  const onSelectDate = () => {
    setTimeout(() => {
      uiStore.toggleCalendarVisibility();
    }, 250);
  };

  return (
    <div className="container-wide flex justify-stretch items-stretch gap-20 h-full">
      {/* Left Pane for PC */}
      <div className={clsx(`w-[230px] shrink-0 md:block pb-5 hidden`)}>
        <EntryHistorySection />
      </div>

      {/* Left Page for Mobile */}
      <div
        className={clsx(
          "w-full absolute left-0 top-0 min-h-[100vh] bg-back z-10 padding-x pt-4",
          uiStore.isCalendarVisible ? "visible" : "hidden pointer-events-none"
        )}
      >
        <EntryHistorySection onSelectDate={onSelectDate} />
      </div>
      <div className="md:hidden fixed bottom-6 right-4 z-20">
        <button
          className="btn w-[55px] h-[55px] bg-green-500 shadow-lg rounded-full border-green-600"
          onClick={onClickCalendar}
        >
          {uiStore.isCalendarVisible ? (
            <LuX className="text-xl" />
          ) : (
            <LuCalendar className="text-xl" />
          )}
        </button>
      </div>

      {/* Middle Pane */}
      <div className="grow h-full flex flex-col justify-stretch">
        <EntriesSection />
      </div>

      {/* Right Pane */}
      <div className="lg:w-[300px] hidden xl:block shrink-0 h-full flex-col justify-stretch">
        <PinnedEntriesSection />
      </div>
    </div>
  );
}
