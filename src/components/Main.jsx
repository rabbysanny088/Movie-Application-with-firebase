import axios from "axios";
import { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import requests from "../Requests";

const Main = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(requests.requestPopular);
        const responseData = response.data.results;
        setMovies(responseData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  // const truncateString = (str, num) => {
  //   if (str?.length > num) {
  //     return str.slice(0, num) + "....";
  //   } else {
  //     return str;
  //   }
  // };

  return (
    <>
      {movies.length > 0 && (
        <Carousel
          showThumbs={false}
          autoPlay={true}
          transitionTime={500}
          infiniteLoop={true}
          showStatus={false}
        >
          {movies.map((movie) => (
            <div key={movie.id} className="w-full h-[550px] text-white">
              <div className="w-full h-full">
                <div className="absolute w-full h-[550px] bg-gradient-to-r from-black"></div>
                <img
                  className="w-full h-full object-cover"
                  src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
                  alt={movie.title}
                />
                <div className="absolute w-full top-[20%] p-4 md:p-8 ">
                  <h1 className="text-3xl md:text-5xl font-bold">
                    {movie.title}
                  </h1>
                  <div className="my-4">
                    <button className="border bg-gray-300 text-black border-gray-300 py-2 px-5">
                      Play
                    </button>
                    <button className="border text-white border-gray-300 py-2 px-5 ml-4">
                      Watch Later
                    </button>
                  </div>
                  <p className="text-gray-400 text-sm">
                    Released: {movie.release_date}
                  </p>
                  <p className="md:w-[50%] lg:max-[50%] xl:max-[35%] text-gray-200 flex m-auto">
                    {movie.overview}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </Carousel>
      )}
    </>
  );
};

export default Main;
