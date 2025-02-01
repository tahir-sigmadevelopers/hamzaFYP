const Header = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        <h1 className="text-xl font-bold text-blue-600">HomeBid</h1>
        <input
          type="text"
          placeholder="Search by City, State, Zip Code, Address or County"
          className="border rounded-md px-4 py-2 w-1/2 focus:outline-blue-500"
        />
      </div>
    </header>
  );
};

export default Header;
