/**
 * Provides the GraphQL query for detailed laundry room data.
 *
 * @returns {string} the GraphQL query.
 */
export const createFetchLaundryRoomQuery = (id: string): string => `
{
    laundryRoomDetailed(id: ${id}) {
        machines {
            machine_no
            offline
            type
            avail
            time_remaining
        }
    }
}`;
