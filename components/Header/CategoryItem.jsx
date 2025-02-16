export default function CategoryItem({ title, image, className }) {
  return (
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
  );
}
