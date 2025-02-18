import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-white shadow-md mt-4">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        <Link to={"/"}><h1 className="text-xl font-bold text-blue-600">HomeBid</h1></Link>
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
