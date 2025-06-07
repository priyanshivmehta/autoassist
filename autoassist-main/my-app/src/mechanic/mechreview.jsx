import React from "react";
import { FaStar } from "react-icons/fa";
import MechNav from "../components/mechNav";

const reviews = [
  {
    name: "Amit Sharma",
    rating: 5,
    review: "Got a flat tyre on highway. Rajesh arrived within 20 minutes and fixed it quickly. Lifesaver!",
  },
  {
    name: "Pooja Mehta",
    rating: 5,
    review: "Battery died outside the office. The mechanic jump-started my car in no time. Very polite and professional.",
  },
  {
    name: "Deepak Verma",
    rating: 4,
    review: "Quick response and good service. A bit of delay in reaching the location, but overall happy.",
  },
  {
    name: "Sneha Joshi",
    rating: 5,
    review: "Was stranded late at night, but Rajesh handled everything calmly. Highly recommended roadside help!",
  },
  {
    name: "Rahul Nair",
    rating: 5,
    review: "Punctual, skilled, and friendly. Got my bike chain fixed without needing to tow it.",
  },
  {
    name: "Vikas Tiwari",
    rating: 5,
    review: "Amazing app! Called a mechanic and he reached in under 15 minutes. Fixed the engine issue on spot.",
  },
  {
    name: "Ritu Jain",
    rating: 4,
    review: "Professional mechanic, knew exactly what to do. Would prefer faster tracking next time.",
  },
  {
    name: "Anil D'Souza",
    rating: 5,
    review: "Best emergency service I’ve used. Car wouldn't start and it was fixed on the spot. Big thanks to Rajesh!",
  },
];

const groupIntoRows = (array, perRow = 3) => {
  return array.reduce((rows, item, index) => {
    const rowIndex = Math.floor(index / perRow);
    if (!rows[rowIndex]) rows[rowIndex] = [];
    rows[rowIndex].push(item);
    return rows;
  }, []);
};

const CustomerReviews = () => {
  const groupedReviews = groupIntoRows(reviews, 3);

  return (
    <div className="min-h-screen bg-gray-100 p-6 ml-[250px]">
      <MechNav />
      <h2 className="text-2xl font-bold text-center mb-10 text-gray-800">
        What our customers say
      </h2>

      {groupedReviews.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className="flex justify-start gap-6 mb-6 flex-wrap"
        >
          {row.map((r, i) => (
            <div
              key={i}
              className="bg-white w-[30%] min-w-[280px] p-5 rounded-xl shadow hover:shadow-lg transition"
            >
              <h3 className="font-bold text-gray-800 mb-1">{r.name}</h3>
              <div className="flex mb-2">
                {[...Array(r.rating)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-400" />
                ))}
              </div>
              <p className="text-sm text-gray-700">{r.review}</p>
            </div>
          ))}
        </div>
      ))}

      <div className="text-center mt-8">
        <button className="px-5 py-2 bg-black hover:bg-[#ed832d] hover:transition-all duration-300 ease-in-out text-white rounded">
          Load More
        </button>
      </div>
    </div>
  );
};

export default CustomerReviews;
