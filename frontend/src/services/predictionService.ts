import api from './api'

export const getPrediction = async () => {
  const response = await api.get('/predictions/forecast')
  return response.data
}