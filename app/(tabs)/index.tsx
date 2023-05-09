import { FlatList, Pressable, StyleSheet } from "react-native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { Link } from "expo-router";
import { Text, View } from "../../components/Themed";
import useRegionStore from "../../store/poi";
import { regionType } from "../../types/regions";

export default function HomeScreen() {
    const regionsState = useRegionStore((state) => state);

    const VisitedItem = ({ identifier, latitude, longitude, visited, iconName, title }: regionType) => {
        return (
            <Link href={{ pathname: "/modal", params: { id: identifier } }} key={`${latitude},${longitude}`} asChild>
                <Pressable disabled={!visited}>
                    {({ pressed }) => (
                        <View style={styles.itemContainer}>
                            <Icon style={styles.itemIcon} name={iconName} />
                            <Text style={styles.itemTitle}>{title}</Text>
                        </View>
                    )}
                </Pressable>
            </Link>
        );
    };

    const NonVisitedItem = (region: regionType) => {
        return (
            <View style={styles.itemContainer}>
                <Icon style={styles.itemIcon} name="map-marker-question" />
                <Text style={styles.itemTitle}>...</Text>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={regionsState.regions}
                renderItem={({ item }) => (item.visited ? <VisitedItem {...item} /> : <NonVisitedItem {...item} />)}
                style={styles.list}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    list: {
        width: "100%",
    },
    itemContainer: {
        flexDirection: "row",
        alignItems: "center",
        padding: 24,
        borderBottomWidth: 1,
        borderBottomColor: "rgb(245,245,245)",
    },
    itemIcon: {
        fontSize: 28,
        marginRight: 24,
    },
    itemTitle: {
        // fontFamily: 'KulimParkBold',
        fontSize: 16,
        fontWeight: "600",
    },
});
