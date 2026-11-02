<template>
  <div>
    <div class="flex items-center gap-3 border-l-4 border-blue-600 bg-white rounded-r-xl shadow-sm px-4 py-3">
      <span class="text-3xl">📈</span>
      <h1 class="text-2xl font-bold text-gray-800">สรุปการประเมิน</h1>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
      <div v-for="s in stats" :key="s.label" class="bg-white rounded-2xl shadow-sm p-5 text-center">
        <p class="text-sm text-gray-500">{{ s.label }}</p>
        <p class="text-3xl font-bold" :class="s.color">{{ s.value }}</p>
      </div>
    </div>

    <div class="bg-white rounded-2xl shadow-sm border-t-4 border-blue-600 p-5 mt-6 overflow-x-auto">
      <table v-if="results.length" class="w-full text-left text-sm">
        <thead class="text-gray-500">
          <tr>
            <th class="pb-3">รอบการประเมิน</th>
            <th class="pb-3">วันที่</th>
            <th class="pb-3">คะแนน</th>
          </tr>
        </thead>
        <tbody class="divide-y">
          <tr v-for="(r, i) in results" :key="i">
            <td class="py-3">{{ r.name }}</td>
            <td class="py-3">{{ r.date }}</td>
            <td class="py-3 font-bold text-blue-600">{{ r.score }}</td>
          </tr>
        </tbody>
      </table>
      <p v-else class="border-2 border-dashed border-gray-200 rounded-xl text-center text-gray-400 p-8">
        ยังไม่มีผลการประเมิน
      </p>
    </div>
  </div>
</template>

<script setup>
import { userauth } from '../../../composables/userauth'

const results = ref([])
const { getresult } = userauth()

const stats = computed(() => {
  const scores = results.value.map(r => Number(r.score)).filter(n => !isNaN(n))
  const avg = scores.length ? (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1) : '-'
  return [
    { label: 'ประเมินแล้ว (ครั้ง)', value: results.value.length, color: 'text-gray-800' },
    { label: 'คะแนนเฉลี่ย', value: avg, color: 'text-blue-600' },
    { label: 'คะแนนสูงสุด', value: scores.length ? Math.max(...scores) : '-', color: 'text-green-600' }
  ]
})

onMounted(async () => {
  results.value = (await getresult()) || []
})
</script>