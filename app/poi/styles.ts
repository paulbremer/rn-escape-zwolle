import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    titleContainer: {
        flex: 1,
        alignSelf: "stretch",
        marginTop: 24,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        backgroundColor: "transparent",
    },
    itemIconContainer: {
        position: "absolute",
        top: 38,
        left: 24,
        marginRight: 12,
        paddingVertical: 12,
    },
    itemIcon: {
        color: "#fff",
        fontSize: 24,
    },
    imageTitle: {
        color: "#fff",
        fontSize: 24,
        marginTop: 24,
    },
    contentContainer: {
        minHeight: 800,
        padding: 24,
        paddingBottom: 48
    },
    paragraph: {
        fontSize: 18,
        lineHeight: 24,
        marginVertical: 12,
    },
});

export default styles;
