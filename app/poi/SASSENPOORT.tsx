import { Pressable, StyleSheet } from "react-native";
import { useRouter, useSearchParams, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { ImageHeaderScrollView, TriggeringView } from "react-native-image-header-scroll-view";
import { View, Text } from "../../components/Themed";
import useRegionStore from "../../store/poi";
import headerStyles from './styles';

const MIN_HEIGHT = 120;

export default function Details() {
    const regionsState = useRegionStore((state) => state);
    const params = useSearchParams();
    const router = useRouter();
    const { id } = params;

    const activePOI = regionsState.regions.find((region) => region.identifier === id);

    if (!activePOI) return null;

    return (
        <ImageHeaderScrollView
            maxHeight={400}
            minHeight={MIN_HEIGHT}
            maxOverlayOpacity={0.6}
            minOverlayOpacity={0.2}
            headerImage={require("../../assets/images/poi/sassenpoort.webp")}
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
            <TriggeringView style={headerStyles.contentContainer}>
                <Text style={headerStyles.paragraph}>
                    De eerste aanwijzing leidt de speler naar de Sassenpoort in Zwolle, een middeleeuwse stadspoort die
                    nog steeds overeind staat. Daar vindt de speler een briefje met een raadsel dat verwijst naar een
                    ander historisch gebouw in de buurt: de Grote of Sint-Michaëlskerk.
                </Text>
            </TriggeringView>
        </ImageHeaderScrollView>
    );
}
