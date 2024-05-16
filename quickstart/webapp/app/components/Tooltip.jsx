export default function Tooltip({ children, text }) {
  return (
    <div className="relative group inline-block">
      {children}
      <div className="opacity-0 group-hover:opacity-100 absolute top-full left-1/2 transform -translate-x-1/2 px-2 m-1 py-1 rounded-md text-sm bg-dsand-1100 text-dsand-20 pointer-events-none transition duration-300 ease-in-out">
        {text}
      </div>
    </div>
  );
}
