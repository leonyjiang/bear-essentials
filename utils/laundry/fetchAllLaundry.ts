import { LaundryRoom, FetchAllLaundryJSON } from "../../types";
import { fetchApi } from "../common";
import { createFetchAllLaundryQuery } from "./createFetchAllLaundryQuery";

export const fetchAllLaundry = async (): Promise<LaundryRoom[]> => {
  const res: FetchAllLaundryJSON = await fetchApi(createFetchAllLaundryQuery());
  const laundryRooms: LaundryRoom[] = res.data.data.laundryRooms.results;
  return laundryRooms;
};
