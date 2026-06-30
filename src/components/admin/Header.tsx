const Header = () => {
  return (
    <div className="bg-white shadow px-8 py-4 flex justify-between items-center">
      <h2 className="text-xl font-bold">
        FPI Zambia Admin
      </h2>

      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center">
          A
        </div>

        <span>Administrator</span>
      </div>
    </div>
  );
};

export default Header;