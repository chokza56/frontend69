<template>
  <div>
    <!-- หัวข้อ -->
    <div class="flex items-center gap-3 border-l-4 border-blue-600 bg-white rounded-r-xl shadow-sm px-4 py-3">
      <h1 class="text-2xl font-bold text-gray-800">หน้าแรก</h1>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
      <!-- การประเมินตนเอง -->
      <section>
        <h2 class="text-xl font-semibold text-gray-800 mb-3">การประเมินตนเอง</h2>
        <div class="bg-white rounded-2xl shadow-sm border-t-4 border-blue-600 p-5 space-y-3">
          <NuxtLink
            to="/user/dashboard/form"
            class="block text-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-xl transition"
          >
             ทำแบบประเมิน
          </NuxtLink>
          <p class="text-center text-sm" :class="canDo ? 'text-green-600' : 'text-gray-400'">
            {{ status }}
          </p>
        </div>
      </section>

      <!-- กรรมการผู้รับการประเมิน -->
      <section>
        <h2 class="text-xl font-semibold text-gray-800 mb-3">กรรมการผู้รับการประเมิน</h2>
        <div class="bg-white rounded-2xl shadow-sm border-t-4 border-blue-600 p-5">
          <div v-if="board.length >= 1" class="space-y-2">
            <NuxtLink
              v-for="d in board"
              :key="d.id"
              :to="`/user/dashboard/${d.id}`"
              class="flex items-center gap-3 px-4 py-3 rounded-xl border border-gray-100 hover:bg-blue-50 transition"
            >
              <span class="w-9 h-9 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                {{ d.username?.charAt(0).toUpperCase() }}
              </span>
              <span class="text-gray-700">{{ d.username }}</span>
            </NuxtLink>
          </div>
          <p v-else class="border-2 border-dashed border-gray-200 rounded-xl text-center text-gray-400 p-8">
            {{ time ? 'ไม่มีกรรมการที่ต้องประเมินในเวลานี้' : 'แบบฟอร์มยังไม่เปิดให้ทำในเวลานี้' }}
          </p>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { userauth } from '../../../composables/userauth'

const user = ref([])
const board = ref([])
const time = ref(null)

const { gettime, getusign, getbuser } = userauth()

const canDo = computed(() => !!time.value && user.value.length >= 1)
const status = computed(() => {
  if (!time.value) return 'แบบฟอร์มยังไม่เปิดให้ทำในเวลานี้'
  if (user.value.length === 0) return 'ไม่มีแบบฟอร์มการประเมินในเวลานี้'
  return 'เปิดให้ทำแบบประเมินแล้ว'
})

onMounted(async () => {
  const t = await gettime()
  time.value = t?.[0] || null
  if (!time.value) return
  user.value = (await getusign(time.value)) || []
  board.value = (await getbuser(time.value)) || []
})
</script>