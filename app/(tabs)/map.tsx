import { useState, useEffect, useRef } from "react";
import { AppState, ActivityIndicator, Dimensions, Pressable, StyleSheet, useColorScheme } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { Accuracy, LocationObject } from "expo-location";
import { Link } from "expo-router";
import * as Location from "expo-location";
import * as TaskManager from "expo-task-manager";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { create } from "zustand";
import { View, Text } from "../../components/Themed";
import useRegionStore from "../../store/poi";
import { regionType } from "../../types/regions";
import Colors from "../../constants/Colors";

interface ActiveRegionsState {
    activeRegion: regionType | null;
}

const { height, width } = Dimensions.get("window");
const useActiveRegionStore = create<ActiveRegionsState>()(() => ({
    activeRegion: null,
}));

const LOCATION_TASK_NAME = "background-location-task";
const LATITUDE_DELTA = 0.02;
const LONGITUDE_DELTA = LATITUDE_DELTA * (width / height);

TaskManager.defineTask(LOCATION_TASK_NAME, ({ data, error }: any) => {
    const eventType: Location.LocationGeofencingEventType = data.eventType;
    const region: regionType = data.region;

    if (error) {
        console.log(error.message);
        return;
    }

    const activeRegion = useActiveRegionStore.getState().activeRegion;

    if (eventType === Location.LocationGeofencingEventType.Enter) {
        console.log("You've entered region:", region);

        // UPDATE STORE
        const regionState = useRegionStore.getState();
        const newState = regionState.regions.map((regionState) => {
            if (regionState.identifier === region.identifier) {
                regionState.visited = true;
                useActiveRegionStore.setState({ activeRegion: regionState });
            }
            return regionState;
        });
        useRegionStore.setState({ regions: newState.reverse() });
    } else if (eventType === Location.LocationGeofencingEventType.Exit) {
        if (region.identifier === activeRegion?.identifier) {
            console.log("You've left region:", region);
            useActiveRegionStore.setState({ activeRegion: null });
        }
    }
});

export default function MapScreen() {
    const [location, setLocation] = useState<LocationObject>();
    const [errorMsg, setErrorMsg] = useState("Laden...");
    const appState = useRef(AppState.currentState);
    const mapRef = useRef<null>(null);
    const activeRegionState = useActiveRegionStore((state) => state.activeRegion);
    const regionState = useRegionStore((state) => state);
    const colorScheme = useColorScheme();

    useEffect(() => {
        (async () => {
            let { status: foregroundStatus } = await Location.requestForegroundPermissionsAsync();
            if (foregroundStatus === "granted") {
                const { status: backgroundStatus } = await Location.requestBackgroundPermissionsAsync();
                if (backgroundStatus === "granted") {
                    console.log("🚀 startGeofencingAsync");
                    await Location.startGeofencingAsync(LOCATION_TASK_NAME, regionState.regions);
                }
            } else {
                setErrorMsg("Permission to access location was denied");
            }

            let location = await Location.getCurrentPositionAsync({
                accuracy: Accuracy.BestForNavigation,
            });

            setLocation(location);
        })();
    }, []);

    useEffect(() => {
        const subscription = AppState.addEventListener("change", (nextAppState) => {
            if (appState.current.match(/inactive|background/) && nextAppState === "active") {
                if (location && mapRef.current !== null) {
                    mapRef.current.animateCamera({
                        center: { latitude: location.coords.latitude, longitude: location.coords.longitude },
                        altitude: 1000,
                        zoom: 4,
                    });
                }
            }
            appState.current = nextAppState;
        });

        return () => {
            subscription.remove();
        };
    }, []);

    if (!location)
        return (
            <View style={styles.container}>
                <ActivityIndicator />
                <Text style={styles.text}>{errorMsg}</Text>
            </View>
        );

    return (
        <View style={styles.container}>
            <MapView
                ref={mapRef}
                style={styles.map}
                mapType="standard"
                showsUserLocation={true}
                showsPointsOfInterest={false}
                maxZoomLevel={18}
                initialRegion={{
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                    latitudeDelta: LATITUDE_DELTA,
                    longitudeDelta: LONGITUDE_DELTA,
                }}
            >
                {regionState.regions.map(({ identifier, latitude, longitude, iconName, unlocked, visited }) => {
                    return (
                        <Link
                            href={{ pathname: `poi/${identifier}`, params: { id: identifier } }}
                            key={`${latitude},${longitude}`}
                            asChild
                        >
                            <Pressable disabled={!unlocked || !visited}>
                                {({ pressed }) => (
                                    <Marker
                                        coordinate={{ latitude, longitude }}
                                        style={{
                                            ...styles.iconContainer,
                                            backgroundColor:
                                                unlocked && visited ? Colors[colorScheme ?? "light"].tint : "#8f8f8f",
                                            opacity: pressed ? 0.5 : 1,
                                        }}
                                    >
                                        <Icon
                                            style={{ ...styles.icon, color: Colors[colorScheme ?? "light"].background}}
                                            name={unlocked || visited ? iconName : "map-marker-question"}
                                            size={24}
                                        />
                                    </Marker>
                                )}
                            </Pressable>
                        </Link>
                    );
                })}
            </MapView>

            {activeRegionState && (
                <View style={styles.textContainer}>
                    <Text style={{ ...styles.text, color: Colors[colorScheme ?? "light"].text }}>🕵🏼 Je bent bij {activeRegionState.title}!</Text>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    map: {
        width: "100%",
        height: "100%",
    },
    textContainer: {
        backgroundColor: "rgba(255, 255, 255, 0.75)",
        position: "absolute",
        width: "100%",
        bottom: 0,
        alignItems: "center",
    },
    text: {
        paddingVertical: 12,
    },
    iconContainer: {
        padding: 6,
        borderRadius: 18,
    },
    icon: {
        color: "#fff",
    },
});
