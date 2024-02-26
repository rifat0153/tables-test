<script setup lang="ts">
// const items = generateDummyObjects(150);
const data = ref<LocationMapping[]>([]);

const generate = (count: number) => {
  data.value = generateDummyObjects(count);
};

const { changedItemsCount, columns, rows, updateCellValue } =
  useTable<LocationMapping>(
    data,
    "locationId",
    "locationName",
    "triggerId",
    "triggerName",
    "mappingId"
  );

const rowFilter = ref("");
const colFilter = ref("");

const filteredRows = computed(() => {
  let filtered = rows.value.filter((row) => row.name.includes(rowFilter.value));

  // filter the cells
  filtered = filtered.map((row) => {
    return {
      ...row,
      cells:
        colFilter.value === ""
          ? row.cells
          : row.cells.filter((cell) =>
              filteredColumns.value.find(
                (column) => column.id === cell.columnId
              )
            ),
    };
  });

  return filtered;
});

const filteredColumns = computed(() => {
  return columns.value.filter((column) =>
    column.name.includes(colFilter.value)
  );
});
</script>

<template>
  <p>Changed items: {{ changedItemsCount }}</p>

  <button @click="generate(10)" class="btn btn-primary">Generate 10</button>

  <button @click="generate(100)" class="btn btn-primary">Generate 100</button>

  <button @click="generate(300)" class="btn btn-primary">Generate 300</button>

  <input v-model="rowFilter" placeholder="Filter rows" />
  <input v-model="colFilter" placeholder="Filter columns" />

  <table>
    <thead>
      <tr>
        <th>Table Name</th>
        <th v-for="(column, index) in filteredColumns" :key="index">
          {{ column.id }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(row, rowIndex) in filteredRows" :key="rowIndex">
        <td>
          {{ row.name }}
        </td>

        <td v-for="(cell, cellIndex) in row.cells" :key="cellIndex">
          <input
            type="checkbox"
            v-model="cell.value"
            @change="updateCellValue(cell)"
          />
        </td>
      </tr>
    </tbody>
  </table>
</template>
