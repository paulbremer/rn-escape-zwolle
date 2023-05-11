import * as Location from "expo-location";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

export interface regionType extends Location.LocationRegion {
    identifier: string;
    title: string;
    iconName: React.ComponentProps<typeof MaterialCommunityIcons>['name'];
    visited: boolean;
    unlocked: boolean;
    lockCode?: number;
}
