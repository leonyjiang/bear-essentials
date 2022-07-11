import { CafeId, CafeStrId } from "../../types";

/**
 * Returns the cafe's string ID, given its numeric ID.
 */
export const cafeIdToStrId = (id: CafeId): CafeStrId => {
  switch (id) {
    case CafeId.SHARPE_REFECTORY:
      return CafeStrId.SHARPE_REFECTORY;
    case CafeId.ANDREWS_COMMONS:
      return CafeStrId.ANDREWS_COMMONS;
    case CafeId.VERNEY_WOOLLEY:
      return CafeStrId.VERNEY_WOOLLEY;
    case CafeId.BLUE_ROOM:
      return CafeStrId.BLUE_ROOM;
    case CafeId.IVY_ROOM:
      return CafeStrId.IVY_ROOM;
    case CafeId.GOURMET_TO_GO:
      return CafeStrId.GOURMET_TO_GO;
    case CafeId.JOSIAHS:
      return CafeStrId.JOSIAHS;
    case CafeId.CAFE_CARTS:
      return CafeStrId.CAFE_CARTS;
  }
};
