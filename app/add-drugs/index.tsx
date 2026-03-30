import { Drug } from '@/data/Drugs';
import React from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

const AddDrugs = () => {
  const [text, onChangeText] = React.useState('Useless Text');
  const [number, onChangeNumber] = React.useState('');

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}>
        <View>
          <Text>Nome</Text>
          <TextInput
            style={styles.input}
            onChangeText={onChangeText}
            value={text}
          />
          <Text>Qunatidade na Caixa</Text>
          <TextInput
            style={styles.input}
            onChangeText={onChangeNumber}
            inputMode='numeric'
            value={number}
            placeholder="useless placeholder"
            keyboardType="numeric"
          />
          <Text>{text}</Text>
        </View>
        <SaveButton text={text} number={number}/>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
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
