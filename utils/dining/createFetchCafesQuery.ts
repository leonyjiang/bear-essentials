/**
 * Provides the GraphQL query for cafes' display data.
 *
 * @returns {string} the GraphQL query.
 */
export const createFetchCafesQuery = (): string => `
{
    cafes {
        id
        days {
            date
            status
            dayparts {
                label
                starttime
                endtime
            }
        }
    }
}`;
