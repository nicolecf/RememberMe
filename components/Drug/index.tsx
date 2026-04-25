import { Button, Icon, Text } from '@rneui/themed';
import React from 'react';
import { GestureResponderEvent, StyleSheet, Switch, View } from 'react-native';

export type Props = {
  name: string,
  hour: string,
  isTaken?: boolean,
  isDelayed?: boolean,
  type?: "check" | "delete",
  callback?: (event: GestureResponderEvent) => void
};

export default function Drug ({
  name,
  hour,
  isTaken = false,
  isDelayed = false,
  type="check",
  callback
}: Props) {

  const [isEnabled, setIsEnabled] = React.useState(isTaken);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  return (
    <View style={{
      justifyContent: "space-between",
      padding: 10,
      flexDirection: 'row',
      borderTopWidth: 2,
      borderTopColor: '#DDD',
      backgroundColor: isDelayed && !isEnabled ? '#EB5757' : 'transparent'
    }}>
      <Icon name="medication" color="#FFF" containerStyle={styles.icon}/>
      <View style={styles.textContainer}>
        <Text h4={true}> {name} </Text>
        <Text> {hour} </Text>
      </View>
      {(type === "check") && (
        <Switch
          trackColor={{false: '#DDD', true: '#6FCF97'}}
          thumbColor={isEnabled ? '#009688' : '#767577'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
          style={{ transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }] }}
        />
      )}
      {(type === "delete" && typeof callback == 'function') && (
        <Button color="error" onPress={callback} icon={<Icon name="delete" color="#FFF" />}></Button>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  icon: {
    backgroundColor: '#6FCF97',
    borderRadius: 30,
    justifyContent: 'center',
    padding: 15
  },
  textContainer: {
    flex: 1,
    paddingLeft: 10
  }
});
