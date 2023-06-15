import { useEffect, useState } from "react";
import { Pressable, StyleSheet, useColorScheme } from "react-native";
import { Text, View } from "../Themed";
import { Picker } from "@react-native-picker/picker";
import Colors from "../../constants/Colors";

const numberArray = [...Array(10)].map((_, index) => index);

interface CustomPickerProps {
    lockCode: number | undefined;
    onSuccess: () => void;
}

interface SelectedNumbersProps {
    0: number;
    1: number;
    2: number;
    3: number;
}

const CustomPicker = ({ lockCode, onSuccess }: CustomPickerProps) => {
    const [selectedNumbers, setSelectedNumbers] = useState<SelectedNumbersProps>({
        0: 0,
        1: 0,
        2: 0,
        3: 0,
    });
    const [selectedNumber, setSelectedNumber] = useState<string>("0000");
    const colorScheme = useColorScheme();

    const getSelectedNumber = (obj: SelectedNumbersProps) => Object.values(obj).reduce((a, b) => +`${a}${b}`);

    useEffect(() => {
        if (getSelectedNumber(selectedNumbers) === lockCode) {
            onSuccess();
            setSelectedNumber(getSelectedNumber(selectedNumbers));
        }
    }, [selectedNumbers]);

    return (
        <View style={styles.container}>
            <View style={styles.pickerContainer}>
                {[...Array(4)].map((_, index) => {
                    return (
                        <Picker
                            key={index}
                            selectedValue={selectedNumbers[index as keyof SelectedNumbersProps]}
                            onValueChange={(itemValue) =>
                                setSelectedNumbers({ ...selectedNumbers, [index]: itemValue })
                            }
                            style={styles.picker}
                        >
                            {numberArray.map((number) => (
                                <Picker.Item key={number} label={"" + number} value={number} />
                            ))}
                        </Picker>
                    );
                })}
            </View>

            {/* {getSelectedNumber(selectedNumbers) === lockCode && (
                <>
                    <Text style={styles.text}>🎉 Yes je hebt de code gevonden!</Text>

                    <Pressable
                        style={{ ...styles.button, backgroundColor: Colors[colorScheme ?? "light"].tint }}
                        onPress={onSuccess}
                    >
                        <Text style={styles.buttonText}>Goed zo</Text>
                    </Pressable>
                </>
            )} */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        marginVertical: 16,
    },
    pickerContainer: {
        flexDirection: "row",
    },
    picker: {
        flexBasis: "22%",
    },
});

export default CustomPicker;
