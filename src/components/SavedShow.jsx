import { doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { UserAuth } from "../context/AuthContext";
import { db } from "../firebase";
const SavedShow = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  const { user } = UserAuth();

  const slideLeft = () => {
    let slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft - 500;
  };
  const slideRight = () => {
    let slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft + 500;
  };

  useEffect(() => {
    const fecthData = async () => {
      try {
        setLoading(true);
        await onSnapshot(doc(db, "users", `${user?.email}`), (doc) => {
          setMovies(doc.data()?.saveShow || []);
        });
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fecthData();
  }, [user?.email]);

  const deleteShow = async (passedID) => {
    try {
      const userDocRef = doc(db, "users", user.email);

      const userDocSnapshot = await getDoc(userDocRef);
      const userData = userDocSnapshot.data();

      const updatedSaveShow = userData.saveShow.filter(
        (item) => item.id !== passedID
      );

      await updateDoc(userDocRef, { saveShow: updatedSaveShow });
    } catch (error) {
      console.error("Error updating document:", error.message);
    }
  };

  return (
    <>
      <h2 className="text-white font-bold md:text-xl p-4">
        My Favourite Movies
      </h2>
      <div className="relative flex items-center group">
        <MdChevronLeft
          onClick={slideLeft}
          size={40}
          className="bg-white rounded-full absolute left-0 opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block"
        />
        {loading ? (
          <p className="bg-red-500 p-3 ml-5 text-white">Loading...</p>
        ) : (
          <>
            <div
              id={"slider"}
              className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative"
            >
              {movies.map((item, id) => (
                <div
                  className="w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2"
                  key={id}
                >
                  <img
                    className="w-full h-auto block"
                    src={`https://image.tmdb.org/t/p/w500/${item?.img}`}
                    alt={item?.title}
                  />
                  <div className="absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 text-white">
                    <p className="whitespace-normal text-xs md:text-sm font-bold flex justify-center items-center h-full text-center">
                      {item?.title}
                    </p>
                    <p className="absolute text-gray-300 top-4 right-4 ">
                      <AiOutlineClose onClick={() => deleteShow(item.id)} />
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <MdChevronRight
              onClick={slideRight}
              size={40}
              className="bg-white rounded-full absolute right-0 opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block"
            />
          </>
        )}
      </div>
    </>
  );
};

export default SavedShow;
