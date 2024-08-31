import RestaurantCard from "./RestaurantCard";
import { resList } from "../utils/data";
import { useState, useEffect } from "react";

// const resList = [
//   {
//     id: 1,
//     name: "KFC",
//     ratings: 4.8,
//     time: 28,
//     cuisines: ["Burgers", "American"],
//   },
//   {
//     id: 2,
//     name: "Food Zone",
//     ratings: 3.8,
//     time: 18,
//     cuisines: ["Burgers", "Italina"],
//   },
//   {
//     id: 3,
//     name: "Hunger Plaza",
//     ratings: 2.8,
//     time: 18,
//     cuisines: ["Burgers", "Italina", "Momos"],
//   },
//   {
//     id: 4,
//     name: "Khana Khazana",
//     ratings: 3.9,
//     time: 18,
//     cuisines: ["Burgers", "Desi Thali", "Samaso"],
//   },
//   {
//     id: 5,
//     name: "Humger",
//     ratings: 4.8,
//     time: 20,
//     cuisines: ["Chicken", "Panneer hundi"],
//   },
//   {
//     id: 6,
//     name: "ChaiWala",
//     ratings: 4.5,
//     time: 10,
//     cuisines: ["Lemon Tea", "Dudh Chai", "Green Tea"],
//   },
//   {
//     id: 7,
//     name: "Magha Restaurent",
//     ratings: 4.2,
//     time: 10,
//     cuisines: ["Desi Thali", "Spanish", "Italian", "Chinease"],
//   },
//   {
//     id: 8,
//     name: "Star Buks",
//     ratings: 3.8,
//     time: 28,
//     cuisines: ["Coffe", "Tea"],
//   },
//   {
//     id: 9,
//     name: "Pada Pav Wala",
//     ratings: 1.8,
//     time: 8,
//     cuisines: ["Pada Pav", "Chat Masala"],
//   },
//   // {
//   //   id: 2,
//   //   name: "Food Zone",
//   //   ratings: 3.8,
//   //   time: 18,
//   //   cuisines: ["Burgers", "Italina"],
//   // },
//   // {
//   //   id: 2,
//   //   name: "Food Zone",
//   //   ratings: 3.8,
//   //   time: 18,
//   //   cuisines: ["Burgers", "Italina"],
//   // },
//   // {
//   //   id: 2,
//   //   name: "Food Zone",
//   //   ratings: 3.8,
//   //   time: 18,
//   //   cuisines: ["Burgers", "Italina"],
//   // },
//   // {
//   //   id: 2,
//   //   name: "Food Zone",
//   //   ratings: 3.8,
//   //   time: 18,
//   //   cuisines: ["Burgers", "Italina"],
//   // },
// ];
const Body = () => {
  const [restaurents, setRestaurent] = useState(resList);

  const [filteredData, setFilteredData] = useState(resList);

  const [toggle, setToggle] = useState(true);

  const [serachText, setSearchText] = useState("");

  const lowToHigh = () => {
    let data1 = [...filteredData];

    let sortedData1 = data1.sort((a, b) => a.delivery_price - b.delivery_price);

    toggle ? setFilteredData(sortedData1) : setFilteredData(restaurents);

    setToggle(!toggle);
  };
  const highToLow = () => {
    let data2 = [...filteredData];
    let sortedData2 = data2.sort((a, b) => b.delivery_price - a.delivery_price);
    toggle ? setFilteredData(sortedData2) : setFilteredData(restaurents);

    setToggle(!toggle);
  };

  const sortByNameAscending = () => {
    let data3 = [...resList];

    let sortedData3 = data3.sort((a, b) => a.name.localeCompare(b.name));
    restaurents === resList
      ? setRestaurent(sortedData3)
      : setRestaurent(resList);
  };

  const sortByNameDecending = () => {
    let data4 = [...resList];

    let sortedData4 = data4.sort((a, b) => b.name.localeCompare(a.name));
    restaurents === resList
      ? setRestaurent(sortedData4)
      : setRestaurent(resList);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9715987&lng=77.5945627&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );

    const resJson = await data.json();

    console.log(
      resJson.data.cards[4].card.card.gridElements.infoWithStyle.restaurants
    );
  };

  console.log("Rendered"); // This is to show that when components loads for the first time component render first than the useEffect
  return (
    <div className="body">
      <div className="filter">
        <div className="search">
          <input
            type="text"
            className="search-box"
            value={serachText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button
            className="search-btn"
            onClick={() => {
              console.log(serachText);

              const searchedData = restaurents.filter((res) =>
                res.name.toLowerCase().includes(serachText.toLowerCase())
              );

              setFilteredData(searchedData);

              setSearchText("");
            }}
          >
            Search
          </button>
        </div>
        <button
          className="btn"
          onClick={() => {
            // const filterList = restaurents.filter((res) => res.ratings > 4);
            // setRestaurent(filterList)
            // Or
            restaurents === resList
              ? setRestaurent(restaurents.filter((res) => res.ratings >= 4))
              : setRestaurent(resList);
          }}
        >
          Top Rated Restaurent
        </button>

        <button
          className="btn"
          onClick={() => {
            restaurents === resList
              ? setRestaurent(restaurents.filter((res) => res.ratings <= 3))
              : setRestaurent(resList);
          }}
        >
          Least Rated Restaurent
        </button>
        <span>Search By Price: </span>
        <button
          className="btn"
          onClick={() => {
            restaurents === resList
              ? setRestaurent(
                  restaurents.filter(
                    (res) => res.delivery_price > 0 && res.delivery_price <= 250
                  )
                )
              : setRestaurent(resList);
          }}
        >
          Less Than Rs.250
        </button>
        <button
          className="btn"
          onClick={() => {
            restaurents === resList
              ? setRestaurent(
                  restaurents.filter(
                    (res) =>
                      res.delivery_price > 250 && res.delivery_price <= 500
                  )
                )
              : setRestaurent(resList);
          }}
        >
          Rs.250 - Rs.500
        </button>
        <button className="btn" onClick={lowToHigh}>
          Low to High
        </button>
        <button className="btn" onClick={highToLow}>
          High to Low
        </button>

        <button className="btn" onClick={sortByNameAscending}>
          Sort by A-Z
        </button>

        <button className="btn" onClick={sortByNameDecending}>
          Sort by Z-A
        </button>
        <button
          className="btn"
          onClick={() => {
            setFilteredData(resList);
          }}
        >
          Reset
        </button>
      </div>

      <div className="res-container">
        {/* Restaurant Card Component */}
        {filteredData.map((restaurent) => {
          return <RestaurantCard key={restaurent.id} resData={restaurent} />;
        })}
      </div>
    </div>
  );
};

export default Body;
