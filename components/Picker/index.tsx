import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { Text, View } from "../Themed";
import { Picker } from "@react-native-picker/picker";

const numberArray = [...Array(10)].map((_, index) => index);

interface CustomPickerProps {
    lockCode: number | undefined;
}

interface SelectedNumbersProps {
    0: number;
    1: number;
    2: number;
    3: number;
}

const CustomPicker = ({ lockCode }: CustomPickerProps) => {
    const [selectedNumbers, setSelectedNumbers] = useState<SelectedNumbersProps>({
        0: 0,
        1: 0,
        2: 0,
        3: 0,
    });
    const [selectedNumber, setSelectedNumber] = useState<string>('0000');

    const getSelectedNumber = (obj: SelectedNumbersProps) => Object.values(obj).reduce((a, b) => +`${a}${b}`);
    
    useEffect(() => {
        if (getSelectedNumber(selectedNumbers) === lockCode) {
            setSelectedNumber(getSelectedNumber(selectedNumbers));
        }
    }, [selectedNumbers]);

    return (
        <>
            <View style={styles.container}>
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

            <Text style={styles.text}>{getSelectedNumber(selectedNumbers) === lockCode && '🎉 Yes je hebt de code gevonden!'}</Text>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
    },
    picker: {
        width: "20%",
    },
    text: {
        fontSize: 18,
        paddingVertical: 12
    }
});

export default CustomPicker;
