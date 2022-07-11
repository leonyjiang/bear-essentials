import { CafeStrId } from "../../types";

/**
 * Provides the GraphQL query for fetching a cafe's meal data today.
 *
 * @param {CafeStrId} id — the cafe's ID.
 *
 * @returns {string} the GraphQL query.
 */
export const createFetchMenuQuery = (strId: CafeStrId): string => `
{
    menu(id: "${strId}") {
        dayparts {
            label
            stations {
                id
                label
                items {
                    name
                    description
                    gluten_free
                    halal
                    kosher
                    vegan
                    vegetarian
                }
            }
        }
    }
}`;
