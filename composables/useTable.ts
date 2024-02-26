interface Cell {
  value: boolean;
  originalValue: boolean;
  id: string;
  // Add other properties as needed
}

export const useTable = () => {
  const columns = ref(
    Array.from({ length: 25 }, (_, index) => `Column ${index + 1}`)
  );
  const rows = ref(
    Array.from({ length: 150 }, (_, rowIndex) => {
      return Array.from({ length: 25 }, (_, cellIndex) => ({
        value: false,
        originalValue: false,
        id: `${rowIndex}-${cellIndex}`,
        // Add other properties as needed
      }));
    })
  );

  return {
    columns,
    rows,
  };
};
