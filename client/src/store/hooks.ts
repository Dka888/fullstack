import { useSelector, TypedUseSelectorHook } from 'react-redux';
import { useDispatch } from 'react-redux'
import { store, RootState } from './store';


export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch;