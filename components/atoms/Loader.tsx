export default function Loader() {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative w-24 h-24 mb-4">
        <div className="absolute inset-0 rounded-full border-4 border-white/20"></div>
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-white border-r-white animate-spin-slow"></div>
        <div className="absolute inset-3 rounded-full border-4 border-transparent border-b-primary-300 border-l-primary-300 animate-spin-reverse"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}
