import { create } from 'zustand';

type State = {
  username: string;
};

type Action = {
  updateUsername: (username: State['username']) => void;
};

const useStore = create<State & Action>((set) => ({
  username: '',
  updateUsername: (username) => set({ username }),
}));

export default useStore;
