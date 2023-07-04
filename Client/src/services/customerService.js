import http from "./httpService";
import config from "../config.json";

const apiEndpoint = config.apiUrl + "/customers";

async function getCustomers() {
  const { data: customers } = await http.get(apiEndpoint);
  // console.log("RRR 111:", customers);
  return customers;
}

export default getCustomers;
