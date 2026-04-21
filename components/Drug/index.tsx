import { Text } from '@rneui/themed';
import React from 'react';
import { Switch, View } from 'react-native';

export default function Drug ({name, hour, isTaken = false, isDelayed = false}) {
  const [isEnabled, setIsEnabled] = React.useState(isTaken);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  return (
    <View style={{
          justifyContent: "space-between",
          padding: 20,
          flexDirection: 'row',
          borderTopWidth: 2,
          borderTopColor: '#DDD',
          backgroundColor: isDelayed && !isEnabled ? '#EB5757' : 'transparent'
        }}>
      <View>
        <Text h4={true}> {name} </Text>
        <Text> {hour} </Text>
      </View>
      <Switch
            trackColor={{false: '#DDD', true: '#6FCF97'}}
            thumbColor={isEnabled ? '#009688' : '#767577'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
            style={{ transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }] }}
          />
    </View>
  );
}
