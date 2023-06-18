import { Alert, Pressable, StyleSheet, useColorScheme } from "react-native";
import { ImageHeaderScrollView, TriggeringView } from "react-native-image-header-scroll-view";
import { useRouter, Stack } from "expo-router";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { StatusBar } from "expo-status-bar";
import { View, Text } from "../Themed";
import Colors from "../../constants/Colors";
import useRegionStore from "../../store/poi";
import headerStyles from "../../app/poi/styles";

const MIN_HEIGHT = 120;

const POILayout = ({ children, poi }: any) => {
    const regionsState = useRegionStore((state) => state);
    const colorScheme = useColorScheme();
    const router = useRouter();

    const onHandleUnlockRegion = () => {
        const regions = regionsState.regions;
        if (poi?.nextPOI === undefined) {
            Alert.alert("WOOHOO", "UNLOCKED LAST REGION! 🎉");
            console.log("UNLOCKED LAST REGION! 🎉");
            return;
        }
        const newRegionState = regions.map((region) =>
            region.identifier === poi?.nextPOI ? { ...region, unlocked: true, visited: true } : region
        );
        useRegionStore.setState({ regions: newRegionState });
        router.back();
    };

    return (
        <ImageHeaderScrollView
            maxHeight={400}
            minHeight={MIN_HEIGHT}
            maxOverlayOpacity={0.6}
            minOverlayOpacity={0.2}
            headerImage={poi.image}
            renderTouchableFixedForeground={() => (
                <View style={headerStyles.titleContainer}>
                    <Pressable style={headerStyles.itemIconContainer} onPress={router.back}>
                        <Icon style={headerStyles.itemIcon} name={"arrow-left"} />
                    </Pressable>
                    <Text style={headerStyles.imageTitle}>{poi.title}</Text>
                </View>
            )}
        >
            <Stack.Screen
                options={{
                    title: poi.title,
                    headerShown: false,
                }}
            />
            <StatusBar style="light" />
            <TriggeringView style={headerStyles.contentContainer}>
                {children}

                <Pressable
                    style={{ ...styles.button, backgroundColor: Colors[colorScheme ?? "light"].tint }}
                    onPress={onHandleUnlockRegion}
                >
                    <Text style={styles.buttonText}>Goed zo, ga zo door</Text>
                </Pressable>
            </TriggeringView>
        </ImageHeaderScrollView>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: "#fff",
        width: "90%",
        padding: 12,
        alignItems: "center",
        borderRadius: 10,
    },
    buttonText: {
        color: "#fff",
        fontFamily: "KulimParkBold",
        fontWeight: "bold",
        fontSize: 18,
    },
});

export default POILayout;
