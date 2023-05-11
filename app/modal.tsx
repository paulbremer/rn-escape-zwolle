import { Button, StyleSheet } from 'react-native';
import { Stack, useNavigation, useSearchParams } from "expo-router";
import { Text, View } from '../components/Themed';
import Picker from '../components/Picker/index';
import useRegionStore from "../store/poi";

export default function ModalScreen() {
  const navigation = useNavigation();
  const params = useSearchParams();
  const regionsState = useRegionStore((state) => state);
  const { id } = params;

  const activePOI = regionsState.regions.find((region) => region.identifier === id);

  if (!activePOI) return null;

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: activePOI.title,
          headerBackTitleVisible: false,
          headerBackTitle: 'Terug',
          // headerLeft: () => (
          //   <Button
          //     onPress={() => navigation.goBack()}
          //     title="Terug"
          //   />
          // ),
        }}
      />

      <Text style={styles.title}>{activePOI.title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  }
});
