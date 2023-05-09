import { create } from "zustand";
import Regions from "../constants/POI";
import { regionType } from '../types/regions';

interface RegionsState {
    regions: regionType[];
}

const useRegionStore = create<RegionsState>()(() => ({
    regions: [...Regions],
}));

export default useRegionStore;
