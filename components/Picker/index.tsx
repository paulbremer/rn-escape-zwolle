import { useEffect, useState, useContext } from "react";
import { Pressable, StyleSheet, useColorScheme } from "react-native";
import { Text, View } from "../Themed";
import { Picker } from "@react-native-picker/picker";
import Colors from "../../constants/Colors";
import ThemeContext from "../../ThemeContext";

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
    const { theme, setTheme } = useContext(ThemeContext);
    const colorScheme = useColorScheme();

    const getSelectedNumber = (obj: SelectedNumbersProps) => Object.values(obj).reduce((a, b) => +`${a}${b}`);

    useEffect(() => {
        if (getSelectedNumber(selectedNumbers) === lockCode) {
            onSuccess();
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
                            itemStyle={{ color: Colors[theme].text }}
                        >
                            {numberArray.map((number) => (
                                <Picker.Item key={number} label={"" + number} value={number} />
                            ))}
                        </Picker>
                    );
                })}
            </View>
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
        color: 'red'
    },
});

export default CustomPicker;
