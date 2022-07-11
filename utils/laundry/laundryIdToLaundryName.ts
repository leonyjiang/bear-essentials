import { LaundryId, LaundryRoom, LaundryRoomName } from "../../types";

export const laundryIdToLaundryName = ({
  id,
  name,
}: LaundryRoom): LaundryRoomName => {
  const key: string = LaundryId[id];
  const readableName: LaundryRoomName =
    LaundryRoomName[key as keyof typeof LaundryRoomName];
  return readableName || name;
};
