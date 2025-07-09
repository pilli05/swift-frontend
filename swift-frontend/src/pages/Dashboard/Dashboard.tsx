import { useEffect, useState } from "react";
import { FaAngleLeft, FaAngleRight, FaSort } from "react-icons/fa";
import dashBoardServices from "./dashBoardServices";

interface Comments {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

const Dashboard = () => {
  const [comments, setComments] = useState<Comments[]>([]);
  const [inputSearch, setInputSearch] = useState("");
  const [sortBy, setSortBy] = useState<keyof Comments | null>(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const getCommentsList = async () => {
    const response = await dashBoardServices.getComments();
    if (response.status === 200) {
      setComments(response.data);
    }
  };

  useEffect(() => {
    getCommentsList();
  }, []);

  const handleSort = (sortKey: keyof Comments) => {
    if (sortKey === sortBy) {
      setSortOrder((prev) => (prev === "asc" ? "dsc" : "asc"));
    } else {
      setSortBy(sortKey);
      setSortOrder("asc");
    }
  };

  const filteredResults = comments.filter((comment: Comments) =>
    [comment.name, comment.email, comment.body]
      .join(" ")
      .toLowerCase()
      .includes(inputSearch.toLowerCase())
  );

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  let paginatedData = filteredResults.slice(startIndex, endIndex);

  if (sortBy) {
    paginatedData = [...paginatedData].sort((commentA, commentB) => {
      const valueA = commentA[sortBy];
      const valueB = commentB[sortBy];

      if (typeof valueA === "string" && typeof valueB === "string") {
        return sortOrder === "asc"
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA);
      }

      if (typeof valueA === "number" && typeof valueB === "number") {
        return sortOrder === "asc" ? valueA - valueB : valueB - valueA;
      }

      return 0;
    });
  }

  return (
    <div className="!px-5 md:!px-20 !py-10">
      <div className="grid grid-cols-12  gap-4">
        <div className="col-span-12 md:col-span-9 flex items-center font-[500] !space-x-4 text-sm text-[#1b1e3e]">
          <span
            className="shadow !px-3 !py-1 rounded-md border border-gray-200 flex items-center cursor-pointer"
            onClick={() => handleSort("postId")}
          >
            Sort Post ID <FaSort className="!ml-2" color="#505377" />
          </span>
          <span
            className="shadow !px-3 !py-1 rounded-md border border-gray-200 flex items-center cursor-pointer"
            onClick={() => handleSort("name")}
          >
            Sort Name <FaSort className="!ml-2" color="#505377" />
          </span>
          <span
            className="shadow !px-3 !py-1 rounded-md border border-gray-200 flex items-center cursor-pointer"
            onClick={() => handleSort("email")}
          >
            Sort Email <FaSort className="!ml-2" color="#505377" />
          </span>
        </div>
        <input
          type="search"
          placeholder="Search name, email, comment"
          className="!px-2 !py-1 outline-none rounded-md border border-gray-300 shadow col-span-12 md:col-span-3"
          onChange={(e) => {
            setInputSearch(e.target.value);
            setCurrentPage(1);
          }}
        />
      </div>
      <div className="!mt-10 !rounded-md overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-400 text-[#1b1e3e]  font-semibold text">
              <th className="!px-2 !py-3  rounded-tl-[5px] text-left text-nowrap">
                Post ID
              </th>
              <th className="!px-2 !py-3 text-left">Name</th>
              <th className="!px-2 !py-3 text-left">Email</th>
              <th className="!px-2 !py-3  rounded-tr-[5px] text-left">
                Comment
              </th>
            </tr>
          </thead>
          <tbody className="bg-white text-sm font-semibold text-[#1b1e3e]">
            {paginatedData && paginatedData.length > 0 ? (
              paginatedData.map((comment) => (
                <tr
                  className="text-sm font-semibold  border-b-2 border-gray-200"
                  key={comment.id}
                >
                  <td className="!px-2 !py-2  !rounded-bl-[5px]">
                    {comment.postId}
                  </td>
                  <td className="!px-2 !py-2 ">{comment.name}</td>
                  <td className="!px-2 !py-2 ">{comment.email}</td>
                  <td className="!px-2 !py-2  !rounded-br-[5px]">
                    {comment.body}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={12} className="py-5 text-center">
                  No Comments Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="!mt-10 flex items-center justify-end !space-x-4 text-sm text-[#1b1e3e] ">
        <span>{`${
          (currentPage - 1) * pageSize === 0 ? 1 : (currentPage - 1) * pageSize
        }-${currentPage * pageSize} of ${
          filteredResults?.length
        }  items`}</span>
        {(currentPage - 1) * pageSize !== 0 && (
          <FaAngleLeft
            className="cursor-pointer"
            onClick={() => setCurrentPage(currentPage - 1)}
          />
        )}{" "}
        <span className="flex items-center  w-44 overflow-x-auto pagination-scrollbar">
          {[...Array(Math.ceil(filteredResults.length / pageSize))].map(
            (_, index: number) => (
              <span
                className={
                  index + 1 === currentPage
                    ? "border border-[#1b1e3e] !mr-2 !px-1 rounded-sm cursor-pointer"
                    : "cursor-pointer !mr-2 !px-1 rounded-sm"
                }
                onClick={() => {
                  setCurrentPage(index + 1);
                }}
                key={index}
              >
                {index + 1}
              </span>
            )
          )}
        </span>
        {currentPage !== filteredResults.length / pageSize && (
          <FaAngleRight
            className="cursor-pointer"
            onClick={() => setCurrentPage(currentPage + 1)}
          />
        )}
        <select
          className="outline-none border border-[#1b1e3e] rounded-md !px-2 !py-1"
          onChange={(e) => {
            setPageSize(Number(e.target.value));
            setCurrentPage(1);
          }}
        >
          <option value={10}>10/Page</option>
          <option value={50}>50/Page</option>
          <option value={100}>100/Page</option>
        </select>
      </div>
    </div>
  );
};

export default Dashboard;
