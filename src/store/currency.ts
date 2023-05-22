import { defineStore } from "pinia";
import axios from 'axios';

export const useCurrencyStore = defineStore("currency", {
    state: () => ({
        courses: [] as any[]
    }),
    actions: {
        async fetchCourses() {
            await axios.get("https://api.nbp.pl/api/exchangerates/tables/A/").then((res) => {
                this.courses = res.data
            })
        }
    }
})