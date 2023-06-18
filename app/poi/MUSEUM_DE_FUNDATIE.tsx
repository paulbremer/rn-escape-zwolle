import { useRef, useMemo, useContext, useCallback } from "react";
import { Pressable, StyleSheet, useColorScheme } from "react-native";
import { useRouter, useSearchParams, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { BottomSheetModal, BottomSheetModalProvider, BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { ImageHeaderScrollView, TriggeringView } from "react-native-image-header-scroll-view";
import { View, Text } from "../../components/Themed";
import CustomPicker from "../../components/Picker/index";
import useRegionStore from "../../store/poi";
import Colors from "../../constants/Colors";
import ThemeContext from "../../ThemeContext";
import headerStyles from "./styles";

const MIN_HEIGHT = 120;

export default function Details() {
    const regionsState = useRegionStore((state) => state);
    const params = useSearchParams();
    const router = useRouter();
    const colorScheme = useColorScheme();
    const { theme, setTheme } = useContext(ThemeContext);
    const { id } = params;

    const activePOI = regionsState.regions.find((region) => region.identifier === id);

    const onSuccess = () => {
        bottomSheetModalRef.current?.present();
    };

    const onHandleUnlockRegion = () => {
        // UNLOCK NEXT REGION
        const regions = regionsState.regions;
        const newRegionState = regions.map(region =>
            region.identifier === activePOI?.nextPOI ? { ...region, unlocked: true, visited: true } : region
            );
        useRegionStore.setState({ regions: newRegionState })
        router.back();
    };

    const bottomSheetModalRef = useRef<BottomSheetModal>(null);
    const snapPoints = useMemo(() => ["1%", "30%"], []);

    const renderBackdrop = useCallback(
        (props: any) => <BottomSheetBackdrop {...props} disappearsOnIndex={0} appearsOnIndex={1} />,
        []
    );

    const renderBackground = useCallback(
        () => <View />,
        []
    );

    if (!activePOI) return null;

    return (
        <BottomSheetModalProvider>
            <ImageHeaderScrollView
                maxHeight={400}
                minHeight={MIN_HEIGHT}
                maxOverlayOpacity={0.6}
                minOverlayOpacity={0.2}
                headerImage={require("../../assets/images/poi/museum_de_fundatie.webp")}
                renderTouchableFixedForeground={() => (
                    <View style={headerStyles.titleContainer}>
                        <Pressable style={headerStyles.itemIconContainer} onPress={router.back}>
                            <Icon style={headerStyles.itemIcon} name={"arrow-left"} />
                        </Pressable>
                        <Text style={headerStyles.imageTitle}>{activePOI.title}</Text>
                    </View>
                )}
            >
                <Stack.Screen
                    options={{
                        title: activePOI.title,
                        headerShown: false,
                    }}
                />
                <StatusBar style="light" />
                <TriggeringView
                    style={{
                        ...headerStyles.contentContainer,
                        backgroundColor: Colors[theme].background,
                    }}
                >
                    <Text style={headerStyles.paragraph}>
                        De eerste aanwijzing leidt de speler naar de Sassenpoort in Zwolle, een middeleeuwse stadspoort
                        die nog steeds overeind staat. Daar vindt de speler een briefje met een raadsel dat verwijst
                        naar een ander historisch gebouw in de buurt: de Grote of Sint-Michaëlskerk.
                    </Text>
                    <Text style={headerStyles.paragraph}>
                        Bij de kerk vindt de speler een aanwijzing die leidt naar het park 'Het Engelse Werk', waar een
                        verstopte boodschap op de kade van de gracht ligt. De volgende aanwijzing leidt de speler naar
                        de Peperbus, de hoogste toren van Zwolle, waar op een bepaalde hoogte een geheime boodschap is
                        verborgen.
                    </Text>
                    <Text style={headerStyles.paragraph}>
                        Bij de kerk vindt de speler een aanwijzing die leidt naar het park 'Het Engelse Werk', waar een
                        verstopte boodschap op de kade van de gracht ligt. De volgende aanwijzing leidt de speler naar
                        de Peperbus, de hoogste toren van Zwolle, waar op een bepaalde hoogte een geheime boodschap is
                        verborgen.
                    </Text>
                    <Text style={headerStyles.paragraph}>
                        Bij de kerk vindt de speler een aanwijzing die leidt naar het park 'Het Engelse Werk', waar een
                        verstopte boodschap op de kade van de gracht ligt. De volgende aanwijzing leidt de speler naar
                        de Peperbus, de hoogste toren van Zwolle, waar op een bepaalde hoogte een geheime boodschap is
                        verborgen.
                    </Text>
                    <Text style={headerStyles.paragraph}>
                        Bij de kerk vindt de speler een aanwijzing die leidt naar het park 'Het Engelse Werk', waar een
                        verstopte boodschap op de kade van de gracht ligt. De volgende aanwijzing leidt de speler naar
                        de Peperbus, de hoogste toren van Zwolle, waar op een bepaalde hoogte een geheime boodschap is
                        verborgen.
                    </Text>

                    <CustomPicker lockCode={2104} onSuccess={onSuccess} />
                </TriggeringView>
            </ImageHeaderScrollView>

            <BottomSheetModal
                ref={bottomSheetModalRef}
                index={1}
                snapPoints={snapPoints}
                backdropComponent={renderBackdrop}
                backgroundComponent={renderBackground}
            >
                <View style={styles.contentContainer}>
                    <Text style={styles.text}>🎉 Yes je hebt de code gevonden!</Text>

                    <Pressable
                        style={{ ...styles.button, backgroundColor: Colors[colorScheme ?? "light"].tint }}
                        onPress={onHandleUnlockRegion}
                    >
                        <Text style={styles.buttonText}>Goed zo, ga zo door</Text>
                    </Pressable>
                </View>
            </BottomSheetModal>
        </BottomSheetModalProvider>
    );
}

const styles = StyleSheet.create({
    contentContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 32,
    },
    text: {
        fontSize: 18,
        paddingVertical: 24,
    },
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
