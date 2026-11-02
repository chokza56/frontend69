import axios from 'axios'

export const userauth = () => {
  const token = useCookie('token')
  const config = useRuntimeConfig()
  const apiBase = config.public?.apiBase || 'http://192.168.12.186:5000'
  const headers = () => ({ Authorization: `Bearer ${token.value}` })

  const get = async (path, params = {}) =>
    (await axios.get(`${apiBase}${path}`, { headers: headers(), params })).data
  const send = async (method, path, data) =>
    (await axios({ method, url: `${apiBase}${path}`, headers: headers(), data })).data

  const safe = async (fn, fallback = []) => {
    try { return await fn() } catch (e) { console.error(e); return fallback }
  }

  // ⚠️ path ด้านล่างเป็นการเดา ให้แก้ให้ตรงกับ route ใน Express ของคุณ
  const gettime = () => safe(() => get('/api/time'))
  const getusign = (time) => safe(() => get('/api/evaluation/self', { time_id: time.id }))
  const getbuser = (time) => safe(() => get('/api/evaluation/board', { time_id: time.id }))
  const getbsign = (time) => safe(() => get('/api/evaluation/board-sign', { time_id: time.id }))
  const getresult = () => safe(() => get('/api/evaluation/result'))

  const updateprofile = (data) => send('put', '/api/auth/me', data)
  const submitform = (data) => send('post', '/api/evaluation/self', data)

  return { gettime, getusign, getbuser, getbsign, getresult, updateprofile, submitform }
}