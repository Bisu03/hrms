import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { BiLogOut } from "react-icons/bi";
import { MdAccountBox } from "react-icons/md";
import { BsPerson } from "react-icons/bs";

const DropdownUser = () => {

  const { data: session } = useSession();

  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!dropdownOpen || dropdownRef.current.contains(target) || triggerRef.current.contains(target)) return;
      setDropdownOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  }, [dropdownOpen]);

  // Close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (keyCode === 27) setDropdownOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  }, []);

  const triggerRef = useRef(null);
  const dropdownRef = useRef(null);

  return (
    <div className="relative text-black dark:text-white">
      <Link
        ref={triggerRef}
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center gap-4 "
        href="#"
      >
        <span className="hidden text-right lg:block">
          <span className="block text-sm font-medium text-black dark:text-white">
            {session?.user?.employee_name}
          </span>
          <span className="block text-xs"> {session?.user?.employee_id}</span>
        </span>

        <span className="h-12 w-12 rounded-full">
          <Image
            width={112}
            height={112}
            src={session?.user?.profile || "/profile.png"}
            style={{
              width: "auto",
              height: "auto",
            }}
            alt="User"
            className="rounded-full"
          />
        </span>

      </Link>

      <div
        ref={dropdownRef}
        onFocus={() => setDropdownOpen(true)}
        onBlur={() => setDropdownOpen(false)}
        className={`absolute right-0 mt-4 flex w-62.5 flex-col rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark ${dropdownOpen === true ? "block" : "hidden"
          }`}
      >
        <ul className="flex flex-col gap-5 border-b border-stroke px-6 py-7.5 dark:border-strokedark">
          <li>
            <Link
              href="/profile"
              className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
            >
              <BsPerson className="fill-current" />
              My Profile
            </Link>
          </li>
          {/* <li>
            <Link
              href="/settings"
              className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
            >
              <MdAccountBox />
              Account Settings
            </Link>
          </li> */}
        </ul>
        <button
          onClick={() => {
            signOut();
            router.push("/login");
          }}
          className="flex items-center gap-3.5 px-6 py-4 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
        >
          <BiLogOut className="fill-current " />
          Log Out
        </button>
      </div>
    </div>
  );
};

export default DropdownUser;
