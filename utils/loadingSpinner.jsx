export default function LoadingSpinner({
  size = 10,
  color = "primary",
  border = 3,
}) {
  return (
    <div className="flex items-center justify-center">
      <div
        style={{ width: size, height: size }}
        className={`inline-block animate-spin rounded-full border-[${border}px] border-${color} border-t-transparent`}
      />
    </div>
  );
}
