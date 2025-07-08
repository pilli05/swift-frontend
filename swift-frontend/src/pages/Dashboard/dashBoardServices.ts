import axios from "axios";

const dashBoardServices = {
  getComments: async () => {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/comments"
    );
    return response;
  },
};

export default dashBoardServices;
