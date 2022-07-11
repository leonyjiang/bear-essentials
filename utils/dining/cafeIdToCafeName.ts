import { CafeId, CafeName } from "../../types";

/**
 * Returns the cafe's name, given its numeric ID.
 */
export const cafeIdToCafeName = (id: CafeId): CafeName => {
  switch (id) {
    case CafeId.SHARPE_REFECTORY:
      return CafeName.SHARPE_REFECTORY;
    case CafeId.ANDREWS_COMMONS:
      return CafeName.ANDREWS_COMMONS;
    case CafeId.VERNEY_WOOLLEY:
      return CafeName.VERNEY_WOOLLEY;
    case CafeId.BLUE_ROOM:
      return CafeName.BLUE_ROOM;
    case CafeId.IVY_ROOM:
      return CafeName.IVY_ROOM;
    case CafeId.GOURMET_TO_GO:
      return CafeName.GOURMET_TO_GO;
    case CafeId.JOSIAHS:
      return CafeName.JOSIAHS;
    case CafeId.CAFE_CARTS:
      return CafeName.CAFE_CARTS;
  }
};
