import React, { useEffect, useState } from "react";
// components
import { Hero, Product } from "../components";
import { FiFilter } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, fetchCategories } from "../store/slices/productSlice";

const Home = () => {
  // toggle theme
  const isDark = useSelector((state) => state.theme.isDark);

  // Category State
  const [showCategory, setShowCategory] = useState(false);
  // Initial state for category
  const [currCategory, setCurrCategory] = useState("all"); 

  // Error State
  const [error, setError] = useState(null);

  const { fetchCateg: allCategory, fetchProd: products, status } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData() {
      try {
        await dispatch(fetchProducts());
        await dispatch(fetchCategories());
      } catch (error) {
        setError(error.message);
      }
    }
    fetchData();
  }, [dispatch]);

  // Search
  const [search, setSearch] = useState("");
  const [searchitem, setSearchitem] = useState([]);

  // Debounce
  function mydebounce(fun, delay) {
    let timer;
    return function (...args) {
      timer = setTimeout(() => {
        fun.apply(this,args);
      }, delay);
      return ()=>clearTimeout(timer);
    };
  }
  const debouncedHandleSearch = mydebounce((searchTerm) => {
    if (searchTerm !== "") {
      const filteredSearch = products.filter((item) => {
        return item.category.toLowerCase().includes(searchTerm) || item.description.toLowerCase().includes(searchTerm) || item.title.toLowerCase().includes(searchTerm);
      });

      setSearchitem(filteredSearch);
    }
  }, 500);

  // Filtering based on search
  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearch(searchTerm);

    debouncedHandleSearch(searchTerm);
  };
  // Retrieve unique category names
  const uniqueCategoryNames = [...new Set(allCategory.map((category) => category.category)), "all"];

  // Filtering the Categories
  const filterProducts = products.filter((item) => {
    if (item.id >= 0) {
      if (currCategory === "all") {
        return true;
      } else {
        return item.category === currCategory;
      }
    }
  });

  if (status === "Loading...") {
    return (

      // shimmer effect
      <div data-testid="shimmer" className="flex flex-wrap gap-7 justify-center mx-28">
        {Array(20)
          .fill("")
          .map((_, index) => (
            <div className="animate-pulse w-56 h-80" key={index}>
              <div className="bg-gray-400 rounded-lg m-2 h-2/4"></div>
              <div className="bg-gray-400 m-2 h-7 "></div>
              <div className="bg-gray-400 m-2 h-6 w-3/4"></div>
              <div className="bg-gray-400 m-2 h-5"></div>
            </div>
          ))}
      </div>
    );
  }

  if (status === "error" || error) {
    return <p>Something went wrong! Try again later</p>;
  }

  return (
    <div className={`${isDark && "dark"} transition-colors duration-1000`}>
      <div className="scrollbar-thin scrollbar-webkit dark:bg-slate-950">
        <Hero />

        {/* Category Buttons */}
        <div className="group relative" name="products">
          <div className="flex flex-col items-center justify-items-start md:flex-row lg:flex-row">
            <div
              onMouseEnter={() => setShowCategory(true)}
              onMouseLeave={() => setShowCategory(false)}
              className={`h-14 flex items-center px-5 lg:px-10 cursor-pointer w-[200px] lg:w-[220px] ${showCategory ? "text-red-500" : ""}`}>
              <FiFilter className={`text-xl dark:text-white ${isDark && "dark:hover:text-red-500"}`} />
              <span className={`text-2xl ml-2 dark:text-white ${isDark && "dark:hover:text-red-500"}`}>Category</span>
            </div>
            <div>
              <input
                type="search"
                className="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
                id="exampleSearch"
                placeholder="Search"
                value={search}
                onChange={handleSearch}
              />
            </div>
          </div>

          <div
            className={`${showCategory ? "flex" : "hidden"} absolute z-10 gap-y-1 flex-col left-1/3 md:left-16 bg-gray-100 rounded-b-lg scrollbar-thin scrollbar-webkit h-fit`}
            onMouseEnter={() => setShowCategory(true)}
            onMouseLeave={() => setShowCategory(false)}>
            {uniqueCategoryNames.map((categoryName, index) => (
              <button
                key={index}
                className={`capitalize py-2 hover:bg-gray-300 hover:rounded ${currCategory === categoryName ? "bg-gray-300 rounded" : ""}`}
                onClick={() => {
                  setCurrCategory(currCategory === categoryName ? "all" : categoryName);
                }}>
                {categoryName}
              </button>
            ))}
          </div>
        </div>

        <section className="py-16">
          <div className="container mx-auto">
            {/* Products */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-[30px] max-w-sm mx-auto md:max-w-none md:mx-0 sm:mx-auto" id="products">
              {(search !== "" ? searchitem : filterProducts).map((product) => (
                <Product product={product} key={product.id} />
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
