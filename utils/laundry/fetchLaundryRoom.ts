import { FetchLaundryRoomJSON, LaundryMachine } from "../../types";
import { fetchApi } from "../common";
import { createFetchLaundryRoomQuery } from "./createFetchLaundryRoomQuery";

export const fetchLaundryRoom = async (
  id: string
): Promise<LaundryMachine[]> => {
  const res: FetchLaundryRoomJSON = await fetchApi(
    createFetchLaundryRoomQuery(id)
  );
  const machines: LaundryMachine[] = res.data.data.laundryRoomDetailed.machines;
  return machines;
};
