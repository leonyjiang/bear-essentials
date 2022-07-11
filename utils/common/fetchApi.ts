import axios from "axios";

const GRAPH_API_ENDPOINT = "https://api-2cu446h72q-uc.a.run.app/graphql";
const TIMEOUT = 60000;

/**
 * A generic fetch util for the GraphQL endpoint.
 */
export const fetchApi = async (query: string): Promise<any> => {
  return axios.post(GRAPH_API_ENDPOINT, { query }, { timeout: TIMEOUT });
};
