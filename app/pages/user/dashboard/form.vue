<template>
  <div class="max-w-2xl">
    <div class="flex items-center gap-3 border-l-4 border-blue-600 bg-white rounded-r-xl shadow-sm px-4 py-3">
      <span class="text-3xl">📝</span>
      <h1 class="text-2xl font-bold text-gray-800">แบบประเมินตนเอง</h1>
    </div>

    <form class="mt-6 space-y-4" @submit.prevent="submit">
      <div v-for="(q, i) in questions" :key="i" class="bg-white rounded-2xl shadow-sm p-5">
        <p class="font-medium text-gray-800 mb-3">{{ i + 1 }}. {{ q }}</p>
        <div class="flex gap-2">
          <label
            v-for="n in 5"
            :key="n"
            class="flex-1 text-center py-2 rounded-lg border cursor-pointer transition"
            :class="answers[i] === n ? 'bg-blue-600 text-white border-blue-600' : 'hover:bg-blue-50'"
          >
            <input v-model="answers[i]" type="radio" :value="n" class="hidden" required />
            {{ n }}
          </label>
        </div>
      </div>

      <div class="flex gap-3">
        <NuxtLink to="/user/dashboard" class="px-5 py-3 rounded-xl border hover:bg-gray-50">ยกเลิก</NuxtLink>
        <button type="submit" :disabled="loading" class="flex-1 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-medium py-3 rounded-xl transition">
          {{ loading ? 'กำลังส่ง...' : 'ส่งแบบประเมิน' }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { userauth } from '../../../composables/userauth'

// แก้คำถามตรงนี้ได้เลย (ให้คะแนน 1-5)
const questions = [
  'ท่านปฏิบัติงานได้ตามเป้าหมายที่กำหนด',
  'ท่านมีความรับผิดชอบต่อหน้าที่',
  'ท่านทำงานร่วมกับผู้อื่นได้ดี',
  'ท่านพัฒนาตนเองอย่างต่อเนื่อง'
]

const answers = ref(questions.map(() => null))
const loading = ref(false)
const { gettime, submitform } = userauth()

const submit = async () => {
  loading.value = true
  try {
    const t = (await gettime())?.[0]
    await submitform({ time_id: t?.id, answers: answers.value })
    alert('ส่งแบบประเมินเรียบร้อยแล้ว')
    await navigateTo('/user/dashboard/result')
  } catch (err) {
    console.error(err)
    alert('ส่งแบบประเมินไม่สำเร็จ')
  } finally {
    loading.value = false
  }
}
</script>