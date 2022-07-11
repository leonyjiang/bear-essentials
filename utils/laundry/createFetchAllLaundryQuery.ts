/**
 * Provides the GraphQL query for basic laundry display data.
 *
 * @returns {string} the GraphQL query.
 */
export const createFetchAllLaundryQuery = (): string => `
{
    laundryRooms {
        results {
            id
            name
        }
    }
}`;
