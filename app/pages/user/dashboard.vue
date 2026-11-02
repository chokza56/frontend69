<template>
  <div class="flex h-screen bg-slate-50">
    <!-- Sidebar -->
    <aside class="w-64 bg-gradient-to-b from-blue-600 to-blue-800 text-white flex flex-col shadow-xl">
      <div class="px-6 py-5 text-xl font-bold border-b border-white/10">
           ระบบประเมินผล
      </div>

      <!-- โปรไฟล์ -->
      <div class="flex flex-col items-center py-6 border-b border-white/10">
        <div class="w-20 h-20 rounded-full bg-white/20 ring-4 ring-white/30 flex items-center justify-center text-3xl font-bold">
          {{ initial }}
        </div>
        <p class="mt-3 font-medium">{{ username }}</p>
        <p class="text-xs text-blue-200">ผู้ใช้งาน</p>
      </div>

      <!-- เมนู -->
      <nav class="flex-1 p-4 space-y-1">
        <NuxtLink
          v-for="menu in menus"
          :key="menu.to"
          :to="menu.to"
          exact-active-class="bg-white/20 font-semibold shadow-inner"
          class="flex items-center gap-3 px-4 py-3 rounded-xl text-blue-50 hover:bg-white/10 transition"
        >
          <span class="text-lg">{{ menu.icon }}</span>
          <span>{{ menu.label }}</span>
        </NuxtLink>
      </nav>

      <!-- Logout -->
      <div class="p-4 border-t border-white/10">
        <button
          class="w-full py-2.5 rounded-xl bg-white/10 hover:bg-red-500 transition"
          @click="logout"
        >
          🚪 ออกจากระบบ
        </button>
      </div>
    </aside>

    <!-- เนื้อหา -->
    <main class="flex-1 overflow-y-auto p-6">
      <NuxtPage />
    </main>
  </div>
</template>

<script setup>
const store = useUserStore()
const token = useCookie('token')

const username = computed(() => store.user?.username || store.user?.fname || 'username')
const initial = computed(() => username.value.charAt(0).toUpperCase())

// ใช้ตัวพิมพ์เล็กให้ตรงกับชื่อโฟลเดอร์ pages/user/dashboard
const menus = [
  { icon: '', label: 'หน้าแรก', to: '/user/dashboard' },
  { icon: '', label: 'แก้ไขโปรไฟล์', to: '/user/dashboard/profile' },
  { icon: '', label: 'สรุปการประเมิน', to: '/user/dashboard/result' }
]

async function logout() {
  store.Logout()
  token.value = null
  await navigateTo('/')
}

onMounted(() => {
  store.LoadUser()
})
</script>