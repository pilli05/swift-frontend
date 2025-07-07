import Logo from "../../../public/vite.svg";

const Header = () => {
  return (
    <div className="bg-[#1b1e3e] flex justify-between items-center !px-10 !py-5">
      <div className="flex items-center">
        <img src={Logo} className="w-10 h-10" />
        <span className="text-white text-xl ml-2 font-semibold">WIFT</span>
      </div>
      <div className="flex items-center">
        <span className="w-10 h-10 bg-white rounded-full flex justify-center items-center text-[#1b1e3e] font-semibold">
          EH
        </span>
        <span className="text-white !ml-2 font-semibold text-lg">
          Erwin Howell
        </span>
      </div>
    </div>
  );
};

export default Header;
