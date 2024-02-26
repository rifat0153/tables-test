<script setup lang="ts">
const items = generateDummyObjects(150);

const { changedItemsCount, columns, rows, updateCellValue } =
  useTable<LocationMapping>(
    items,
    "locationId",
    "locationName",
    "triggerId",
    "triggerName",
    "mappingId"
  );
</script>

<template>
  <p>Changed items: {{ changedItemsCount }}</p>

  <table>
    <thead>
      <tr>
        <th v-for="(column, index) in columns" :key="index">{{ column }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(row, rowIndex) in rows" :key="rowIndex">
        <td v-for="(cell, cellIndex) in row" :key="cellIndex">
          <input
            type="checkbox"
            v-model="cell.value"
            @change="updateCellValue(rowIndex, cellIndex)"
          />
        </td>
      </tr>
    </tbody>
  </table>
</template>
