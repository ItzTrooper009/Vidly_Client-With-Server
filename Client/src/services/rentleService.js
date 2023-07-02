import http from "./httpService";
import config from "../config.json";

const apiEndpoint = config.apiUrl + "/rentals";

async function getRentals() {
  const { data: rental } = await http.get(apiEndpoint);
  return rental;
}

export default getRentals;
