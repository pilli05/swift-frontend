import { MdKeyboardBackspace } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useAuthLogin } from "../../hooks/useAuthLogin";

const Profile = () => {
  const { userDetails } = useAuthLogin();

  const navigate = useNavigate();

  return (
    <div className="!px-5 md:!px-20 !py-10">
      <p className="text-lg font-semibold flex items-center text-[#1b1e3e]">
        <MdKeyboardBackspace
          className="!mr-3 cursor-pointer"
          onClick={() => navigate("/")}
        />
        Welcome, {userDetails?.name}
      </p>
      <div className="!mt-7 !p-3 md:!p-10 shadow rounded-lg border border-gray-200">
        <div className="flex items-center">
          <p className="w-20 h-20 rounded-full bg-slate-50 flex items-center justify-center text-[#1b1e3e] font-semibold shadow">
            {userDetails?.name?.split(" ")[0]?.charAt(0) +
              userDetails?.name?.split(" ")[1]?.charAt(0)}
          </p>
          <div className="flex flex-col !ml-2">
            <span className="text-[#1b1e3e] font-semibold">
              {userDetails?.name}
            </span>
            <span className="text-gray-600 text-sm">{userDetails?.email}</span>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              className="text-gray-600 text-sm font-semibold"
              htmlFor="userId"
            >
              User ID
            </label>
            <br />
            <input
              type="text"
              readOnly
              value={userDetails?.id}
              id="userId"
              className="!px-2 !py-1 outline-none bg-slate-50 rounded-md !mt-2"
            />
          </div>
          <div>
            <label
              className="text-gray-600 text-sm font-semibold"
              htmlFor="name"
            >
              Name
            </label>
            <br />
            <input
              type="text"
              readOnly
              value={userDetails?.name}
              id="name"
              className="!px-2 !py-1 outline-none bg-slate-50 rounded-md !mt-2"
            />
          </div>
          <div>
            <label
              className="text-gray-600 text-sm font-semibold"
              htmlFor="email"
            >
              Email
            </label>
            <br />
            <input
              type="text"
              readOnly
              value={userDetails?.email}
              id="email"
              className="!px-2 !py-1 outline-none bg-slate-50 rounded-md !mt-2"
            />
          </div>
          <div>
            <label
              className="text-gray-600 text-sm font-semibold"
              htmlFor="address"
            >
              Address
            </label>
            <br />
            <input
              type="text"
              readOnly
              value={
                userDetails?.address?.suite +
                ", " +
                userDetails?.address?.street +
                ", " +
                userDetails?.address?.city
              }
              id="address"
              className="!px-2 !py-1 outline-none bg-slate-50 rounded-md !mt-2"
            />
          </div>
          <div>
            <label
              className="text-gray-600 text-sm font-semibold"
              htmlFor="phone"
            >
              Phone
            </label>
            <br />
            <input
              type="text"
              readOnly
              value={userDetails?.phone}
              id="phone"
              className="!px-2 !py-1 outline-none bg-slate-50 rounded-md !mt-2"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
