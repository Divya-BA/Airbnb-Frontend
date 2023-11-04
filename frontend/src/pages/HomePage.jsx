import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoShieldCheck } from "react-icons/go";
import { TbAirConditioningDisabled } from "react-icons/tb";
import { FaSwimmingPool } from "react-icons/fa";
import { GiWashingMachine } from "react-icons/gi";

import axiosInstance from "../utils/axios";
import { usePlaces } from "../hooks";

function HomePage() {
  const navigate = useNavigate();
  const Places = usePlaces();
  const { setPlaces, setLoading } = Places;

  const [searchText, setSearchText] = useState("");
  const [guests, setGuests] = useState(0);
  const [searchTimeout, setSearchTimeout] = useState(null);

  const handleSearch = async (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);
    if (searchText.trimStart() !== "") {
      navigate('/home')
      setLoading(true);
      setSearchTimeout(
        setTimeout(async () => {
          const { data } = await axiosInstance.get(
            `/places/search/${searchText.trimStart()}?guests=${guests}`
          );
          setPlaces(data);
          setLoading(false);
        }, 500)
      );
    }
  };

  
  return (
    <div>
      <div class="flex justify-center m-20 ">
        <div class="absolute bg-white p-6 rounded-lg shadow-md left-20 mt-20 ml-20 min-h-[45%] w-96">
          <h3 className="text-3xl font-bold">Find Places to stay on Airbnb</h3>
          <p className="text-sm text-gray-500">
            Discover entire homes and rooms perfect for any trip
          </p>
          <form className="m-4">
            <label className="text-sm">Location:</label>
            <input
            className="my-2 w-full rounded-[10px] border py-2 px-3"
              type="search"
              placeholder="Where you want to go"
              onChange={(e) => handleSearch(e)}  
              value={searchText}
              />
            <label className="text-sm">No.of.guest:</label>
            <input
              type="text"
              placeholder="Max no. of guests"
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
            />
            <button  onClick={handleSearch} className="bg-primary w-80 text-white rounded-md mt-4 h-10">
              Search
            </button>
          </form>
        </div>
        <img
          src="https://a0.muscache.com/im/pictures/9caaca2d-6892-4638-b675-6a879974f5ed.jpg"
          className="h-[35rem]"
        />
      </div>

      <div className="flex justify-around m-10">
        <div className="m-6">
          <GoShieldCheck className="w-6 h-6 m-2" />
          <h3 className="text-2xl m-2 font-bold">Enjoy some flexibility</h3>
          <p className="m-2">
            Stays with flexible cancellation make it easy to rebook if your
            plans change.
          </p>
        </div>

        <div className="m-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="w-6 h-6 m-2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5l-1.5-.5M6.75 7.364V3h-3v18m3-13.636l10.5-3.819"
            />
          </svg>

          <h3 className="text-2xl m-2 font-bold">
            More than 7M active listings
          </h3>
          <p className="m-2">
            Join more than 1 billion guests who’ve found getaways in over 220
            countries and destinations.
          </p>
        </div>

        <div className="m-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="w-6 h-6 m-2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"
            />
          </svg>

          <h3 className="text-2xl m-2 font-bold">
            100+ filters for tailored stays
          </h3>
          <p className="m-2">
            Pick your price range, the number of rooms you want and other key
            amenities to find the stay that fits your needs.
          </p>
        </div>
      </div>
      <div className="m-10 mt-20 border rounded-lg p-6 shadow-md">
        <h3 className="text-3xl font-bold">
          Get specific with your favourite amenities
        </h3>
        <p className="text-sm text-gray-500">
          Choose from top features like these – and more – for a personalised
          stay.
        </p>
        <div className="mt-5 grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-4">
          <div className="flex cursor-pointer items-center gap-2 rounded-2xl border p-4 hover:bg-gray-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z"
              />
            </svg>

            <span>Wifi</span>
          </div>
          <div className="flex cursor-pointer items-center gap-2 rounded-2xl border p-4 hover:bg-gray-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
              />
            </svg>

            <span>Free parking spot</span>
          </div>
          <div className="flex cursor-pointer items-center gap-2 rounded-2xl border p-4 hover:bg-gray-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 20.25h12m-7.5-3v3m3-3v3m-10.125-3h17.25c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125z"
              />
            </svg>

            <span>TV</span>
          </div>
          <div className="flex cursor-pointer items-center gap-2 rounded-2xl border p-4 hover:bg-gray-200">
            <TbAirConditioningDisabled className="h-6 w-6" />
            <span>A/C</span>
          </div>
          <div className="flex cursor-pointer items-center gap-2 rounded-2xl border p-4 hover:bg-gray-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z"
              />
            </svg>

            <span>Pets</span>
          </div>
          <div className="flex cursor-pointer items-center gap-2 rounded-2xl border p-4 hover:bg-gray-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
              />
            </svg>

            <span>Private Enterence</span>
          </div>
          <div className="flex cursor-pointer items-center gap-2 rounded-2xl border p-4 hover:bg-gray-200">
            <FaSwimmingPool className="h-6 w-6" />
            <span>Swimming Pool</span>
          </div>
          <div className="flex cursor-pointer items-center gap-2 rounded-2xl border p-4 hover:bg-gray-200">
            <GiWashingMachine className="h-6 w-6" />
            <span>Washing Machine</span>
          </div>
        </div>
      </div>
      <div className="m-10 mt-20">
        <h3 className="text-3xl font-bold m-5">Big, small, we have it all</h3>
        <div className="flex">
          <div className="m-2">
            <img
              className="w-96 h-56 object-cover rounded-lg"
              src="https://a0.muscache.com/im/pictures/2a8778ba-5a0b-45cd-986f-93fdb937f839.jpg?im_w=480"
            />
            <h5 className="text-base font-bold">Houses</h5>
            <p className="text-sm text-gray-500">
              If you need extra space, get an entire place all to yourself.
            </p>
          </div>
          <div className="m-2 ml-10">
            <img
              className="w-96 h-56 object-cover rounded-lg"
              src="https://a0.muscache.com/im/pictures/bda7107c-9683-49a7-8d5c-65d8dbcd3675.jpg?im_w=480"
            />
            <h5 className="text-base font-bold">Flats</h5>
            <p className="text-sm text-gray-500">
              Stay in some of the most convenient locations with spaces in
              shared buildings.
            </p>
          </div>
          <div className="m-2">
            <img
              className="w-96 h-56 object-cover rounded-lg"
              src="https://a0.muscache.com/im/pictures/4603bd44-699a-4284-9b52-eebc49225879.jpg?im_w=480"
            />
            <h5 className="text-base font-bold">Rooms</h5>
            <p className="text-sm text-gray-500">
              Enjoy your own sleeping space and share a common area with others.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
