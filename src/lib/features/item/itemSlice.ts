import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface ItemState {
  items: string[]
}

const initialState: ItemState = {
  items: [],
}

export const itemSlice = createSlice({
  name: 'item',
  initialState,
  reducers: {
    changeInItems: (state, action: PayloadAction<string[]>) => {
      state.items = action.payload
    },
  },
})

export const { changeInItems } = itemSlice.actions

export default itemSlice.reducer