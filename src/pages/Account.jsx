import netflix from "../assets/image/netfilx.jpg";
import SavedShow from "../components/SavedShow";

const Account = () => {
  return (
    <>
      <div className="w-full text-white">
        <img className="w-full h-[400px] object-cover" src={netflix} alt="" />
        <div className="bg-black/60 fixed top-0 left-0 h-[550px]">
          <div className="absolute top-[20%] p-4 md:p-8">
            <h1 className="text-3xl md:text-5xl font-bold">
              My Favourite Movies
            </h1>
          </div>
        </div>
      </div>
      <SavedShow />
    </>
  );
};

export default Account;
