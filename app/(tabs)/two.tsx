import { Button, StyleSheet } from "react-native";
import { Text, View } from "../../components/Themed";
import useRegionStore from "../../store/poi";

export default function TabTwoScreen() {
    const regionState = useRegionStore((state) => state);

    const unlockAllData = async () => {
        const resetState = regionState.regions.map((region) => {
            region.visited = true;
            region.unlocked = true;
            return region;
        });
        useRegionStore.setState({ regions: resetState.reverse() });
    };

    const resetAllData = async () => {
        const resetState = regionState.regions.map((region) => {
            region.visited = false;
            if (region.identifier === "MUSEUM_DE_FUNDATIE") {
                region.visited = true;
            }
            return region;
        });
        useRegionStore.setState({ regions: resetState.reverse() });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Tab Two</Text>

            <View>
                <Button title="Unlock all regions" onPress={unlockAllData} />
                <Button title="Reset all data" onPress={resetAllData} />
            </View>

            <Text>v0.0.3</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "space-around",
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: "80%",
    },
});
