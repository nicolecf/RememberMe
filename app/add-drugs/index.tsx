import { Drug } from '@/data/Drug';
import { Button, ButtonGroup, Divider, Input } from '@rneui/themed';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

const AddDrugs = () => {
  const [text, onChangeText] = React.useState('');
  const [number, onChangeNumber] = React.useState('');
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [selectedIndexes, setSelectedIndexes] = React.useState([0, 2, 3]);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{
        flex: 1,
        justifyContent: "center",
        padding: 20,
      }}>
        <View>
          <Input
            label='Nome'
            onChangeText={onChangeText}
            value={text}
            inputMode='text'
            placeholder='Nome'
          />
          <Input
            label='Quantidade na Caixa'
            onChangeText={onChangeNumber}
            inputMode='numeric'
            value={number}
            placeholder="30"
            keyboardType="numeric"
          />
          <Divider style={styles.divider} />
        </View>
        <View style={{
          flexDirection: 'row'
        }}>
          <Input
            label="Horário"
            value="08:00"
            placeholder='12:00'
            containerStyle={{
              flex: 0.4
            }}
          />
          <Input
            label="Quantidade"
            value="1"
            placeholder='1'
            keyboardType="numeric"
            inputMode='numeric'
            containerStyle={{
              flex: 0.4
            }}
          />
          {/* <Button color="error" size='lg' buttonStyle={{ borderRadius: 200 }} icon={<Icon name="close" color="#FFF" />}/> */}
        </View>
        <Divider />

        <ButtonGroup
          buttons={['Todos os dias', 'Dias da semana']}
          selectedIndex={selectedIndex}
          onPress={(value) => {
            setSelectedIndex(value);
          }}
          containerStyle={{
            marginBottom: 20,
            marginTop: 20,
          }}
        />

        <ButtonGroup
          buttons={['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab']}
          selectMultiple
          selectedIndexes={selectedIndexes}
          onPress={(value) => {
            setSelectedIndexes(value);
          }}
          containerStyle={{ marginBottom: 20 }}
        />
        <SaveButton text={text} number={number}/>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  divider: {
    marginTop: 20,
    marginBottom: 20
  },
});

export default AddDrugs;


export function SaveButton({text, number}) {
  return (
    <View>
      <Button title='Adicionar' onPress={
        () => {
          saveDrug(text, number)
        }
      }/>
    </View>
  );
}

async function saveDrug(text: string, number: number) {
  const drug = new Drug(text, number);
  drug.save();
}
