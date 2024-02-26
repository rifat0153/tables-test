<script setup lang="ts">
import { ref } from "vue";

interface Cell {
  value: boolean;
  originalValue: boolean;
  id: string;
  // Add other properties as needed
}

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

const changedItemsCount = ref(0);

function updateCellValue(rowIndex: number, cellIndex: number) {
  const cell = rows.value[rowIndex][cellIndex];
  if (cell.value !== cell.originalValue) {
    if (cell.value) {
      changedItemsCount.value++;
    } else {
      changedItemsCount.value--;
    }
  }
  cell.originalValue = cell.value;
}
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
