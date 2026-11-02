<template>
  <div class="max-w-xl">
    <div class="flex items-center gap-3 border-l-4 border-blue-600 bg-white rounded-r-xl shadow-sm px-4 py-3">
      <span class="text-3xl">👤</span>
      <h1 class="text-2xl font-bold text-gray-800">แก้ไขโปรไฟล์</h1>
    </div>

    <form class="mt-6 bg-white rounded-2xl shadow-sm border-t-4 border-blue-600 p-6 space-y-4" @submit.prevent="save">
      <div v-for="f in fields" :key="f.key">
        <label class="block text-sm text-gray-600 mb-1">{{ f.label }}</label>
        <input v-model="form[f.key]" :type="f.type" class="w-full border rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-300" />
      </div>
      <button type="submit" :disabled="loading" class="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-medium py-3 rounded-xl transition">
        {{ loading ? 'กำลังบันทึก...' : 'บันทึก' }}
      </button>
    </form>
  </div>
</template>

<script setup>
import { userauth } from '../../../composables/userauth'

const store = useUserStore()
const { updateprofile } = userauth()

const fields = [
  { key: 'fname', label: 'ชื่อเล่น', type: 'text' },
  { key: 'lname', label: 'ชื่อจริง', type: 'text' },
  { key: 'email', label: 'อีเมล', type: 'email' },
  { key: 'address', label: 'ที่อยู่', type: 'text' },
  { key: 'phone', label: 'เบอร์โทร', type: 'tel' }
]

const form = reactive({ fname: '', lname: '', email: '', address: '', phone: '' })
const loading = ref(false)

// เติมข้อมูลเดิมลงฟอร์ม (รอ store โหลดเสร็จก่อน)
watchEffect(() => {
  if (store.user) fields.forEach(f => { form[f.key] = store.user[f.key] ?? '' })
})

const save = async () => {
  loading.value = true
  try {
    await updateprofile({ ...form })
    await store.LoadUser()
    alert('บันทึกข้อมูลเรียบร้อยแล้ว')
  } catch (err) {
    console.error(err)
    alert('บันทึกไม่สำเร็จ')
  } finally {
    loading.value = false
  }
}
</script>