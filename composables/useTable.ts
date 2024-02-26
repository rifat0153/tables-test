export type Cell = {
  id: string;
  columnIndex: number;
  rowIndex: number;
  value: boolean;
  originalValue: boolean;
};

export type MappingRow = {
  id: number;
  name: string;
  cells: Cell[];
};

export type MappingColumn = {
  id: number;
  name: string;
};

export type MappingItem = {
  triggerId: number;
  triggerName: string;
  locationId: number;
  locationName: string;
  mappingId: number | null;
  mappingDescription: string;
};

export type LocationMapping = {
  triggerId: number;
  triggerName: string;
  locationId: number;
  locationName: string;
  mappingId: number | null;
  mappingDescription: string;
};

export const useTable = <T extends MappingItem>(
  _items: MaybeRefOrGetter<T[]>,
  rowIdField: keyof T,
  rowNameField: keyof T,
  columnIdField: keyof T,
  columnNameField: keyof T,
  mappingIdField: keyof T
) => {
  const changedItemsCount = ref(0);

  const items = toRef(_items) as Ref<T[]>;

  watch(items, () => {
    generateTable();
  });

  const columns = ref<MappingColumn[]>([]);
  const rows = ref<MappingRow[]>([]);

  function generateTable() {
    changedItemsCount.value = 0;

    const uniqueColumns = new Set<number>();
    const uniqueRows = new Set<number>();

    // rest the rows and columns
    rows.value = [];
    columns.value = [];

    items.value.forEach((item) => {
      if (!uniqueColumns.has(item[columnIdField] as number)) {
        const column: MappingColumn = {
          id: item[columnIdField] as number,
          name: item[columnNameField] as string,
        };
        columns.value.push(column);
      } else {
        uniqueColumns.add(item[columnIdField] as number);
      }

      if (!uniqueRows.has(item[rowIdField] as number)) {
        const row: MappingRow = {
          id: item[rowIdField] as number,
          name: item[rowNameField] as string,
          cells: [],
        };
        rows.value.push(row);
      } else {
        uniqueRows.add(item[rowIdField] as number);
      }
    });

    for (let i = 0; i < rows.value.length; i++) {
      const row = rows.value[i];
      for (let j = 0; j < columns.value.length; j++) {
        const column = columns.value[j];
        const cell: Cell = {
          id: `${row.id}-${column.id}`,
          rowIndex: i,
          columnIndex: j,
          value: false,
          originalValue: false,
        };
        row.cells.push(cell);
      }
    }
  }

  function updateCellValue(_cell: Cell) {
    const cell = rows.value[_cell.rowIndex].cells[_cell.columnIndex];

    if (cell.value !== cell.originalValue) {
      if (cell.value) {
        changedItemsCount.value++;
      } else {
        changedItemsCount.value--;
      }
    }
    cell.originalValue = cell.value;
  }

  return {
    columns,
    rows,
    changedItemsCount,
    updateCellValue,
  };
};

export function generateDummyObjects(n: number): LocationMapping[] {
  const dummyObjects: LocationMapping[] = [];
  for (let i = 1; i <= n; i++) {
    const id = i + 1000;

    const dummyObject: LocationMapping = {
      triggerId: id + 5000,
      triggerName: `Trigger ${id + 5000}`,
      locationId: id,
      locationName: `Location ${id}`,
      mappingId: id % 2 === 0 ? null : id,
      mappingDescription: `Mapping ${id}`,
    };
    dummyObjects.push(dummyObject);
  }
  return dummyObjects;
}
