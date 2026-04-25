import Drug from '@/components/Drug';
import { Drug as DrugData } from '@/data/Drug';
import DrugItem from '@/data/DrugItem';
import { useFocusEffect } from 'expo-router';
import React from 'react';
import { ScrollView } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

const RemoveDrugs = () => {
  const drugs = new DrugData();
  const [drugItems, setDrugItems] = React.useState<DrugItem[]>([]);
  const [isUpdated, setIsUpdated] = React.useState<boolean>(true);

  useFocusEffect(
    React.useCallback(() => {
      async function setup() {
        const result = await drugs.getAll();
        setDrugItems(result);
      }
      setup();

    }, [])
  );

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{
        flex: 1,
        justifyContent: "center",
        padding: 20,
      }}>
        <ScrollView>
          {drugItems.map((drug, index) => {
            const isDelayed = drug.time < new Date().getHours() + ':' + new Date().getMinutes();
            return (
            <Drug name={drug.name} hour={drug.time} key={index} isDelayed={isDelayed} isTaken={true} type='delete' callback={async (event)=> {
              drugs.remove(drug.id);
              const result = await drugs.getAll();
              setDrugItems(result);
            }}/>
          )})}
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

export default RemoveDrugs;
