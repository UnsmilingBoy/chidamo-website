export default function LoadingProductTile() {
  return (
    <div className="flex flex-col items-center border gap-2 p-[15px] h-full">
      <div className="w-[200px] h-[200px] overflow-hidden bg-[#EEEEEE] p-2"></div>
      <div className="flex flex-col justify-between w-full h-20">
        <div className="w-full bg-[#EEEEEE] h-4"></div>
        <div className="w-1/2 bg-[#EEEEEE] h-4"></div>
      </div>
    </div>
  );
}
