import { StyleSheet } from "react-native";
import MapView from "react-native-maps";
import { View } from "../../components/Themed";

export default function TabOneScreen() {
    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                mapType="standard"
                showsUserLocation={true}
                followsUserLocation={true}
                showsPointsOfInterest={false}
                maxZoomLevel={18}
                initialRegion={{
                    latitude: 52.51245587661237,
                    longitude: 6.0937684607572375,
                    latitudeDelta: 1,
                    longitudeDelta: 1,
                }}
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
    map: {
        width: "100%",
        height: "100%",
    },
});
