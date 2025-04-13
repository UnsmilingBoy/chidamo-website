import Link from "next/link";

export default function CategoryItem({
  title,
  image,
  className,
  path,
  onClick,
}) {
  return path ? (
    <Link target="_blank" rel="noopener noreferrer" href={path}>
      <div
        className={`flex flex-row items-center gap-2 cursor-pointer ${className}`}
      >
        <img
          src={image}
          alt={title}
          className="transition-all group-hover:rotate-180"
        />
        <p className="text-sm font-medium text-[#707773]">{title}</p>
      </div>
    </Link>
  ) : (
    <div
      onClick={onClick}
      className={`flex flex-row items-center gap-2 cursor-pointer ${className}`}
    >
      <img
        src={image}
        alt={title}
        className="transition-all group-hover:rotate-180"
      />
      <p className="text-sm font-medium text-[#707773]">{title}</p>
    </div>
  );
}
