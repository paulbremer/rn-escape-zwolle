import { create } from "zustand";
import Regions from "../constants/POI";
import { regionType } from '../types/regions';

interface RegionsState {
    regions: regionType[];
}

const initialState = {
    regions: [],
}

const useRegionStore = create<RegionsState>()((set) => ({
    ...initialState,
    regions: [...Regions],
    updateRegion: () => set({ regions:  [] }),
}));

export default useRegionStore;
