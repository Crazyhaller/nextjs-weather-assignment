import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface WeatherState {
  localityId: string
  data: any | null
}

const initialState: WeatherState = {
  localityId: '',
  data: null,
}

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    setWeatherData: (state, action: PayloadAction<any>) => {
      state.data = action.payload
    },
    setLocalityId: (state, action: PayloadAction<string>) => {
      state.localityId = action.payload
    },
  },
})

export const { setWeatherData, setLocalityId } = weatherSlice.actions

export default weatherSlice.reducer
