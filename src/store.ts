import { configureStore } from '@reduxjs/toolkit';
import formBuilderReducer from './slices/formBuilderSlice';
import savedFormsReducer from './slices/savedFormsSlice';

export const store = configureStore({
  reducer: {
    formBuilder: formBuilderReducer,
    savedForms: savedFormsReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
