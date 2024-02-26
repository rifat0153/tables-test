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
</script>

<template>
  <p>Changed items: {{ changedItemsCount }}</p>

  <button @click="generate(10)" class="btn btn-primary">Generate 10</button>

  <button @click="generate(100)" class="btn btn-primary">Generate 100</button>

  <button @click="generate(300)" class="btn btn-primary">Generate 300</button>

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
            @change="updateCellValue(cell)"
          />
        </td>
      </tr>
    </tbody>
  </table>
</template>
