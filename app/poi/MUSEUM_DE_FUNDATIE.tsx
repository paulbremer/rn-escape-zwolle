import { Image, ScrollView, StyleSheet } from "react-native";
import { useSearchParams, Stack } from "expo-router";
import { View, Text } from "../../components/Themed";
import useRegionStore from "../../store/poi";
import FundatieImage from "../../assets/images/poi/museum_de_fundatie.webp";

const DEFAULT_IMAGE = Image.resolveAssetSource(FundatieImage).uri;

export default function Details() {
    const regionsState = useRegionStore((state) => state);
    const params = useSearchParams();
    const { id } = params;

    const activePOI = regionsState.regions.find((region) => region.identifier === id);

    if (!activePOI) return null;

    return (
        <View style={styles.viewContainer}>
            <ScrollView contentContainerStyle={styles.contentContainer}>
                <View style={styles.container}>
                    <Stack.Screen
                        options={{
                            title: activePOI.title,
                        }}
                    />

                    <Image source={{ uri: DEFAULT_IMAGE, width: 400, height: 300 }} resizeMode="cover" />

                    <Text style={styles.paragraph}>
                        De eerste aanwijzing leidt de speler naar de Sassenpoort in Zwolle, een middeleeuwse stadspoort
                        die nog steeds overeind staat. Daar vindt de speler een briefje met een raadsel dat verwijst
                        naar een ander historisch gebouw in de buurt: de Grote of Sint-Michaëlskerk.
                    </Text>
                    <Text style={styles.paragraph}>
                        Bij de kerk vindt de speler een aanwijzing die leidt naar het park 'Het Engelse Werk', waar een
                        verstopte boodschap op de kade van de gracht ligt. De volgende aanwijzing leidt de speler naar
                        de Peperbus, de hoogste toren van Zwolle, waar op een bepaalde hoogte een geheime boodschap is
                        verborgen. Na het oplossen van deze puzzel, vindt de speler een aanwijzing die hem of haar naar
                        de binnenstad van Zwolle leidt, waar een oude boekhandel de sleutel bevat tot de locatie van het
                        gestolen schilderij.
                    </Text>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    viewContainer: {
        backgroundColor: "#fff",
    },
    contentContainer: {
        paddingBottom: 20,
    },
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 24,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginVertical: 24,
    },
    paragraph: {
        fontSize: 18,
        lineHeight: 24,
        marginVertical: 24,
    },
});
