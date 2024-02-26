export type Cell = {
  id: string;
  columnIndex: number;
  rowIndex: number;
  value: boolean;
  originalValue: boolean;
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

  const columns = ref<string[]>([]);
  const rows = ref<Cell[][]>([]);

  function generateTable() {
    changedItemsCount.value = 0;

    const uniqueColumns = new Set<number>();
    const uniqueRows = new Set<number>();

    items.value.forEach((item) => {
      uniqueColumns.add(item[columnIdField] as number);
      uniqueRows.add(item[rowIdField] as number);
    });

    const r = [...uniqueRows];
    const c = [...uniqueColumns];

    columns.value = Array.from(uniqueColumns).map((id) => `Column ${id}`);

    rows.value = [];

    for (let i = 0; i < r.length; i++) {
      const row: Cell[] = [];

      const rowId = r[i];

      for (let j = 0; j < c.length; j++) {
        const columnId = c[j];

        const cell: Cell = {
          id: `${rowId}-${columnId}`,
          rowIndex: i,
          columnIndex: j,
          value: false,
          originalValue: false,
        };
        row.push(cell);
      }
      rows.value.push(row);
    }
  }

  function updateCellValue(_cell: Cell) {
    const cell = rows.value[_cell.rowIndex][_cell.columnIndex];

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
