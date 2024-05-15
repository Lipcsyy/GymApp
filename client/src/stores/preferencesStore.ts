import { create, StoreApi, UseBoundStore } from "zustand";
import { createSelectors } from "./selectors";


type State = {
    height: string
    weight: string
    goal: string
}

type Action = {
    updateHeight: (firstName: State['height']) => void
    updateWeight: (lastName: State['weight']) => void
    updateGoal: (goal: State['goal']) => void
}

// Create your store, which includes both state and (optionally) actions
const userPreferencesStoreBase = create<State & Action>((set) => ({
    height: "",
    weight: "",
    goal: '',
    updateHeight: (height) => set(() => ({ height: height })),
    updateWeight: (weight) => set(() => ({ weight: weight })),
    updateGoal: (goal) => set(() => ({ goal: goal })),
}))

const usePreferencesStore = createSelectors(userPreferencesStoreBase);

export default usePreferencesStore;