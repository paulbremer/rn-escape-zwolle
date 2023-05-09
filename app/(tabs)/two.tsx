import { Button, StyleSheet } from "react-native";
import { Text, View } from "../../components/Themed";
import useRegionStore from "../../store/poi";

export default function TabTwoScreen() {
    const regionState = useRegionStore((state) => state);

    const resetAllData = async () => {
        const resetState = regionState.regions.map((region) => {
            region.visited = false;
            return region;
        });
        useRegionStore.setState({ regions: resetState });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Tab Two</Text>

            <Button title="Reset all data" onPress={resetAllData} />
        </View>
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
    separator: {
        marginVertical: 30,
        height: 1,
        width: "80%",
    },
});
