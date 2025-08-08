import { configureStore } from '@reduxjs/toolkit'
import formBuilderReducer from './slices/formBuilderSlice'
import savedFormsReducer from './slices/savedFormsSlice'

export const store = configureStore({
  reducer: {
    formBuilder: formBuilderReducer,
    savedForms: savedFormsReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
