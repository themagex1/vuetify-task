<template>
  <v-container class="bg-blue-lighten-5">
    <v-row justify="center" class="d-flex flex-column">
      <v-col class="text-center">
        <h1>
          Currency converter
        </h1>
        <p>
          Get current rates using our calculator
        </p>
      </v-col>
      <v-col>
        <div class="d-flex justify-center">
          <v-sheet width="40rem">
            <v-text-field label="Amount" v-model="amount" variant="underlined" class="bg-blue-lighten-5"></v-text-field>
          </v-sheet>
        </div>
        <div class="d-flex justify-center">
          <v-sheet width="40rem">
            <v-select label="Choose currency" :items="computedList" v-model="firstCurrency" variant="underlined" class="bg-blue-lighten-5"></v-select>
          </v-sheet>
        </div>
        <div class="d-flex justify-center">
          <v-sheet width="40rem">
            <v-select label="Choose currency" :items="computedList" v-model="secondCurrency" variant="underlined" class="bg-blue-lighten-5"></v-select>
          </v-sheet>
        </div>

      </v-col>
    </v-row>



  </v-container>
</template>

<script setup lang="ts">
import { useCurrencyStore } from '@/store/currency';
import { ref, computed } from 'vue'

const currencyStore = useCurrencyStore()

currencyStore.fetchCourses()

const currency = ref(currencyStore.courses)

const amount = ref(0)
const firstCurrency = ref('')
const secondCurrency = ref('')

const currencyList = ref([] as any[])
const computedList = computed(() => {
  for (let i in currency.value[0]) {
    for (let j in currency.value[0].rates) {
     
      currencyList.value.push(currency.value[0].rates[j].currency)
    }
  }
  return currencyList.value
})







</script>
