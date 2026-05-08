import api from './api'

export const getIncomeEntries = async () => {
  const response = await api.get('/income')
  return response.data
}

export const addIncomeEntry = async (data: any) => {
  const response = await api.post('/income', data)
  return response.data
}