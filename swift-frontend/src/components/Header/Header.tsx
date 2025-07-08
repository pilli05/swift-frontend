import Logo from "../../../public/vite.svg";
import { useNavigate } from "react-router-dom";
import { useAuthLogin } from "../../hooks/useAuthLogin";
import headerService from "./headerService";
import { useEffect } from "react";

const Header = () => {
  const navigate = useNavigate();
  const { userDetails, setUserDetails } = useAuthLogin();

  const navigateToProfile = () => {
    navigate("/profile");
  };

  const getProfilesInfo = async () => {
    const response = await headerService.getProfiles();

    if (response.status === 200) {
      setUserDetails(response.data[0]);
    }
  };

  useEffect(() => {
    getProfilesInfo();
  }, []);

  return (
    <div
      className="bg-[#1b1e3e] flex justify-between items-center !px-10 !py-5 cursor-pointer"
      onClick={navigateToProfile}
    >
      <div className="flex items-center">
        <img src={Logo} className="w-10 h-10" />
        <span className="text-white text-xl ml-2 font-semibold">WIFT</span>
      </div>
      <div className="flex items-center">
        <span className="w-10 h-10 bg-white rounded-full flex justify-center items-center text-[#1b1e3e] font-semibold">
          {userDetails?.name?.split(" ")[0]?.charAt(0) +
            userDetails?.name?.split(" ")[1]?.charAt(0)}
        </span>
        <span className="text-white !ml-2 font-semibold text-lg">
          {userDetails?.name}
        </span>
      </div>
    </div>
  );
};

export default Header;
