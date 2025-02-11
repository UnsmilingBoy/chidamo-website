export default function CategoryItem({ title, image }) {
  return (
    <div className="flex flex-row items-center gap-2">
      <img src={image} alt={title} />
      <p className="text-sm font-medium text-[#707773]">{title}</p>
    </div>
  );
}
