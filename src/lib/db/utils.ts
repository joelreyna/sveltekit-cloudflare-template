export type DeleteResult = { meta?: { changes: number }; changes?: number };

export const getDeletedCount = (result: DeleteResult): number => {
    return result.meta?.changes ?? result.changes ?? 0;
}; 