import { StyleSheet } from "react-native";
import { useSearchParams, Stack } from "expo-router";
import { View, Text } from "../../components/Themed";
import useRegionStore from "../../store/poi";
import Picker from "../../components/Picker/index";

export default function Details() {
    const regionsState = useRegionStore((state) => state);
    const params = useSearchParams();
    const { id } = params;

    const activePOI = regionsState.regions.find((region) => region.identifier === id);

    console.log(id);
    if (!activePOI) return null;

    return (
        <View style={styles.container}>
            <Stack.Screen
                options={{
                    title: activePOI.title,
                }}
            />

            <Text style={styles.title}>{activePOI.title}</Text>

            {activePOI?.lockCode && <Picker lockCode={activePOI?.lockCode} />}
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
});
