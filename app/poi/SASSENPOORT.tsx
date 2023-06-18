import { useSearchParams } from "expo-router";
import { Text } from "../../components/Themed";
import useRegionStore from "../../store/poi";
import POILayout from "../../components/POILayout/index";
import headerStyles from "./styles";

export default function Details() {
    const regionsState = useRegionStore((state) => state);
    const params = useSearchParams();
    const { id } = params;

    const activePOI = regionsState.regions.find((region) => region.identifier === id);

    if (!activePOI) return null;

    return (
        <POILayout poi={activePOI}>
            <Text style={headerStyles.paragraph}>
                De eerste aanwijzing leidt de speler naar de Sassenpoort in Zwolle, een middeleeuwse stadspoort die nog
                steeds overeind staat. Daar vindt de speler een briefje met een raadsel dat verwijst naar een ander
                historisch gebouw in de buurt: de Grote of Sint-Michaëlskerk.
            </Text>
            <Text style={headerStyles.paragraph}>
                De eerste aanwijzing leidt de speler naar de Sassenpoort in Zwolle, een middeleeuwse stadspoort die nog
                steeds overeind staat. Daar vindt de speler een briefje met een raadsel dat verwijst naar een ander
                historisch gebouw in de buurt: de Grote of Sint-Michaëlskerk.
            </Text>
        </POILayout>
    );
}
