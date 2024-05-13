import { create } from "zustand";

const useThemeHook = create((set) => ({
  title: "Dashboard",
  search: "",
  setTitle: (title) => set(() => ({ title: title })),
  setSearch: (title) => set(() => ({ search: title })),
}));

export default useThemeHook;
