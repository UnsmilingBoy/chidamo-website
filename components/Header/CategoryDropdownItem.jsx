import Link from "next/link";

export default function CategoryDropdownItem({ title, id }) {
  return (
    <Link href={`/category/${id}`}>
      <li className="p-4 group/li cursor-pointer">
        <div className="flex flex-row items-center">
          <div className="flex flex-row items-center gap-2">
            <div className="w-1 h-1 p-[3px] group-hover/li:p-0 rounded-md bg-primary transition-all group-hover/li:h-5"></div>
            <p className="text-sm  group-hover/li:font-medium text-[#414141]">
              {title}
            </p>
          </div>
        </div>
      </li>
    </Link>
  );
}
