import { Alert, FlatList, Pressable, StyleSheet, useColorScheme } from "react-native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { Link } from "expo-router";
import { Text, View } from "../../components/Themed";
import useRegionStore from "../../store/poi";
import { regionType } from "../../types/regions";
import Colors from '../../constants/Colors';

export default function HomeScreen() {
    const regionsState = useRegionStore((state) => state);
    const colorScheme = useColorScheme();

    const ClickableItem = ({ identifier, latitude, longitude, visited, iconName, title, unlocked }: regionType) => {
        return (
            <Link
                href={{ pathname: `poi/${identifier}`, params: { id: identifier } }}
                key={`${latitude},${longitude}`}
                asChild
            >
                <Pressable disabled={!unlocked && !visited}>
                    {({ pressed }) => (
                        <View style={styles.itemContainer}>
                            <Icon style={styles.itemIcon} color={Colors[colorScheme ?? "light"].tint} name={iconName} />
                            <Text style={styles.itemTitle}>{title}</Text>
                        </View>
                    )}
                </Pressable>
            </Link>
        );
    };

    const NonClickableItem = ({ title, iconName, visited, unlocked }: regionType) => {
        return (
            <Pressable onPress={() => Alert.alert('🕵🏼', !unlocked ? '\n Los de vorige puzzel op om deze locatie te ontgrendelen' : 'Ga naar deze locatie om de volgende opdracht te ontvangen')}>
                <View style={styles.itemContainer}>
                    <Icon style={styles.itemIcon} color={Colors[colorScheme ?? "light"].text} name={visited ? iconName : 'map-marker-question'} />
                    <Text style={styles.itemTitle}>{visited ? title : '...'}</Text>
                    <Icon style={styles.itemIconRight} color={Colors[colorScheme ?? "light"].text} name={'lock-alert-outline'} />
                </View>
            </Pressable>
        );
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={regionsState.regions.reverse()}
                renderItem={({ item }) =>
                    item.unlocked && item.visited ? <ClickableItem {...item} /> : <NonClickableItem {...item} />
                }
                inverted={true}
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
        justifyContent: 'space-between',
        padding: 24,
        borderBottomWidth: 1,
        borderBottomColor: "rgb(245,245,245)",
    },
    itemIcon: {
        fontSize: 28,
        marginRight: 24,
    },
    itemIconRight: {
        fontSize: 28,
    },
    itemTitle: {
        // fontFamily: 'KulimParkBold',
        fontSize: 16,
        fontWeight: "600",
        flexGrow: 2
    },
});
