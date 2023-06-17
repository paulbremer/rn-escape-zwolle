import { useState, useContext } from "react";
import { Pressable, StyleSheet, Switch, ScrollView } from "react-native";
import { Text, View } from "../../components/Themed";
import useRegionStore from "../../store/poi";
import ThemeContext from "../../ThemeContext";
import Colors from "../../constants/Colors";
import { expo } from "../../app.json";

export default function SettingsScreen() {
    const regionState = useRegionStore((state) => state);
    const { theme, setTheme } = useContext(ThemeContext);

    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => {
        setIsEnabled((prevState) => !prevState);
        setTheme(theme === "light" ? "dark" : "light");
    };

    const unlockAllData = async () => {
        const unlockRegionState = regionState.regions.map((region) => {
            region.visited = true;
            region.unlocked = true;
            return region;
        });

        useRegionStore.setState({ regions: unlockRegionState });
    };

    const resetAllData = async () => {
        const resetRegionState = regionState.regions.map((region) => {
            region.visited = false;
            if (region.identifier === "MUSEUM_DE_FUNDATIE") {
                region.visited = true;
            }
            return region;
        });

        useRegionStore.setState({ regions: resetRegionState });
    };

    return (
        <ScrollView style={{ ...styles.root, backgroundColor: Colors[theme].backgroundLight }}>
            <View style={{ ...styles.container, backgroundColor: Colors[theme].backgroundLight }}>
                <View style={styles.listContainer}>
                    <View style={{ ...styles.listSwitchItem, backgroundColor: Colors[theme].background }}>
                        <Text>Dark Mode</Text>
                        <Switch onValueChange={toggleSwitch} value={isEnabled} />
                    </View>
                </View>

                <View style={styles.listContainer}>
                    <Pressable onPress={unlockAllData} style={{ ...styles.listItem, backgroundColor: Colors[theme].background }}>
                        <Text>Unlock all regions</Text>
                    </Pressable>
                    <Pressable onPress={resetAllData} style={{ ...styles.listItem, backgroundColor: Colors[theme].background, borderBottomWidth: 0 }}>
                        <Text>Reset all data</Text>
                    </Pressable>
                </View>

                <View style={styles.versionNumberContainer}>
                    <Text style={styles.versionNumber}>v{expo.version}.{expo.ios.buildNumber}</Text>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: "#eee",
    },
    container: {
        backgroundColor: "#eee",
        marginVertical: 12,
    },
    listContainer: {
        marginVertical: 12,
        borderRadius: 12,
        marginHorizontal: 24,
        overflow: "hidden",
    },
    listItem: {
        flexDirection: "row",
        flex: 1,
        alignItems: "center",
        paddingVertical: 12,
        paddingHorizontal: 12,
        borderBottomWidth: 1,
        borderColor: "#eee",
    },
    listSwitchItem: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 12,
        paddingHorizontal: 12,
    },
    versionNumberContainer: {
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 24,
        backgroundColor: "transparent",
    },
    versionNumber: {
        fontSize: 12,
    },
});
