<template>
  <v-container class="bg-blue-lighten-5 py-16 h-75 w-75 rounded-shaped border-double border-xl elevation-24" fluid>
    <v-col class="text-center">
      <h1 class="text-h2 font-weight-bold pb-4">
        Konwerter walut
      </h1>
      <p class="pb-6 text-subtitle-1">
        Sprawdź aktualne stawki za pomocą naszego kalkulatora
      </p>
    </v-col>
    <v-col>
      <div class="d-flex justify-center">
        <v-sheet width="40rem">
          <v-text-field label="Kwota" v-model="amount" variant="outlined" class="bg-blue-lighten-5" type="number" min="0"></v-text-field>
        </v-sheet>
      </div>
      <div class="d-flex justify-center">
        <v-sheet width="40rem">
          <v-select label="Z" :items="computedList" v-model="firstCurrency" variant="outlined" clearable
            class="bg-blue-lighten-5"></v-select>
        </v-sheet>
      </div>
      <div class="d-flex justify-center">
        <v-sheet width="40rem">
          <v-select label="Na" :items="computedList" v-model="secondCurrency" variant="outlined" clearable
            class="bg-blue-lighten-5 pb-8"></v-select>
        </v-sheet>
      </div>

    </v-col>
    <v-col class="d-flex justify-center">
      <v-sheet class="bg-blue-lighten-5 px-14 py-2 rounded-shaped" border="md">
        <div class="font-weight-bold">
          Wynik
        </div>
        {{ result }}
      </v-sheet>
    </v-col>

  </v-container>
</template>

<script setup lang="ts">
import { useCurrencyStore } from '@/store/currency';
import { ref, computed } from 'vue'

const currencyStore = useCurrencyStore()

currencyStore.fetchCourses()

interface courseObject {
  currency: string,
  mid: number
}

const amount = ref(1)
const firstCurrency = ref('')
const secondCurrency = ref('')
const currencyList = ref<courseObject[]>([] as any[])
const computedList = computed<string[]>(() => {
  for (let i in currencyStore.courses) {
    for (let j in currencyStore.courses[i].rates) {
      currencyList.value.push(
        {
          currency: currencyStore.courses[i].rates[j].currency,
          mid: currencyStore.courses[i].rates[j].mid
        })
    }
  }
  firstCurrency.value = currencyList.value.map(obj => obj.currency)[0]
  secondCurrency.value = currencyList.value.map(obj => obj.currency)[1]
  return currencyList.value.map(obj => obj.currency)
})

const result = computed<string | number>(() => {
  if (firstCurrency.value !== '' && secondCurrency.value !== '' && amount.value >= 0) {
    return (currencyList.value.filter(obj => obj.currency === firstCurrency.value).map(obj => obj.mid)[0]
      /
      currencyList.value.filter(obj => obj.currency === secondCurrency.value).map(obj => obj.mid)[0] 
      * 
      amount.value).toFixed(2)
  }
  else {
    if(amount.value < 0) {
      return 'Kwota musi przekraczać zero'
    }
    return 0
    
  }

})

</script>
