const StickyComponent = () => {
  return (
    <div className="h-[200vh] p-4">
      <div className="h-[500px] bg-gray-200">Scroll down...</div>

      <div className="sticky top-96 bg-yellow-400 p-4 text-lg font-bold">
        I stay on top when reached
      </div>

      <div className="h-[1000px] bg-blue-200">More content...</div>
    </div>
  );
};

export default StickyComponent;
