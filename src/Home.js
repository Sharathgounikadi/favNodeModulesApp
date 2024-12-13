const Home = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="p-20 rounded-md bg-white">
        <div className="font-bold text-left mb-6 text-xl">
          Welcome to Favorite NPM Packages
        </div>
        <div className="border border-gray-200 rounded-md p-4 text-center">
          <div className="text-gray-600 mb-4">
            You don't have any favourites yet, Please add
          </div>
          <button className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600">
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
