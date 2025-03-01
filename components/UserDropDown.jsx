import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { PencilIcon } from "@heroicons/react/16/solid";
import { UserRound } from "lucide-react";

export default function UserDropDown() {
  return (
    <div className="relative z-50">
      <Menu>
        <MenuButton className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition">
          <UserRound size={35} color="#666666" />
        </MenuButton>

        <MenuItems
          transition
          className="absolute right-0 mt-2 w-52 origin-top-right rounded-xl border border-white/5 bg-black p-1 text-sm text-white transition duration-100 ease-out focus:outline-none"
        >
          <MenuItem>
            <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 hover:bg-white/10">
              <PencilIcon className="h-4 w-4 fill-white/30" />
              Edit
              <kbd className="hidden text-xs text-white/50 group-focus:inline">
                ⌘E
              </kbd>
            </button>
          </MenuItem>
        </MenuItems>
      </Menu>
    </div>
  );
}
