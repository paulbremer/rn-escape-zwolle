import { StyleSheet } from "react-native";
import { useSearchParams } from "expo-router";
import { Text } from "../../components/Themed";
import useRegionStore from "../../store/poi";
import POILayout from "../../components/POILayout/index";

export default function Details() {
    const regionsState = useRegionStore((state) => state);
    const params = useSearchParams();
    const { id } = params;

    const activePOI = regionsState.regions.find((region) => region.identifier === id);

    if (!activePOI) return null;

    return (
        <POILayout poi={activePOI}>
            <Text style={styles.title}>{activePOI.title}</Text>
        </POILayout>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
    },
});
