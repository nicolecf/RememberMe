import TimePicker from '@/components/TimePicker';
import { Drug } from '@/data/Drug';
import { Button, ButtonGroup, Divider, Input } from '@rneui/themed';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

const AddDrugs = () => {
  const [text, onChangeText] = React.useState('');
  const [number, onChangeNumber] = React.useState('');
  const [time, setTime] = React.useState('');
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [selectedIndexes, setSelectedIndexes] = React.useState([0, 2, 3]);
  const [show, setShow] = React.useState(false);
  const [showWeekDays, setShowWeekDays] = React.useState(false);


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
            value={time}
            placeholder='12:00'
            containerStyle={{
              flex: 0.4
            }}
            onFocus={() => setShow(true)}
            onBlur={() => setShow(false)}
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
        <TimePicker showTimer={show} callBack={(selectedDate:Date) => {
          setTime(`${selectedDate.getHours()}:${selectedDate.getMinutes()}`);
        }} />
        <ButtonGroup
          buttons={['Todos os dias', 'Dias da semana']}
          selectedIndex={selectedIndex}
          onPress={(value) => {
            setSelectedIndex(value);
            setShowWeekDays(value === 1);
          }}
          containerStyle={{
            marginBottom: 20,
            marginTop: 20,
          }}
        />
        {(showWeekDays) && (
          <ButtonGroup
            buttons={['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab']}
            selectMultiple
            selectedIndexes={selectedIndexes}
            onPress={(value) => {
              setSelectedIndexes(value);
            }}
            containerStyle={{ marginBottom: 20 }}
          />
        )}
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
