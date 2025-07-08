import axios from "axios";

const profileService = {
  getProfiles: async () => {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/users"
    );
    return response;
  },
};

export default profileService;
