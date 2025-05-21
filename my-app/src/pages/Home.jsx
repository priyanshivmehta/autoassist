import CarsRepair from "../assets/images/cars.png";

const Home = () => {
  return (
    <div className="min-h-screen flex items-center justify-between bg-gradient-to-r from-white to-white">
      {/* Text Section (Left) */}
      <div className="flex-1 pr-10 pl-20 pb-[50px] flex flex-col justify-center">
        <h1 className="text-6xl md:text-7xl font-extrabold text-gray-800 leading-tight text-left pl-[100px]">
          Fast Rescue.<br />Reliable Roads.
        </h1>

        {/* Subtext Section */}
        <div className="mt-6 text-2xl md:text-3xl text-gray-700 text-lg font-light space-y-2 text-left pl-[100px]">
          <p>On the Move, With You <br/> India's Trusted Towing Partner.</p>
        </div>
        {/* Button Section */}
        <div className="mt-8 pr-[350px]">
        <button className="bg-[#ed832d] text-white hover:bg-white hover:text-black hover:border hover:border-black font-semibold py-3 px-8 rounded-full shadow-lg transition duration-300 ml-[90px]">
          Book Service
        </button>
        {/* <div className="mt-6 text-2xl md:text-2xl text-gray-700 text-lg font-bold space-y-2 text-left pl-[100px]">
          <p>Popular Services</p>
        </div>
        <button className="bg-black text-white font-semibold py-2 px-4 rounded-full shadow-lg transition duration-300 mr-8 mt-4">
          Car inspection
        </button> */}
        </div>
      </div>

      {/* Image Section (Right) */}
      <div className="flex-1 flex justify-end">
        <img
          src={CarsRepair}
          alt="Car Repair"
          className="w-full max-w-[700px] h-auto object-contain"
        />
      </div>
      
    </div>
  );
};

export default Home;
