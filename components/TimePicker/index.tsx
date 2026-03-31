import DateTimePicker from '@react-native-community/datetimepicker';
import React from 'react';

export default function TimePicker ({
  showTimer,
  callBack
}
) {
  const [date, setDate] = React.useState(new Date(1598051730000));
  const [mode, setMode] = React.useState('time');
  const [show, setShow] = React.useState(false);

  const showTimepicker = () => {
    setShow(true);
    setMode('time');
  };

  return (
    <>
      {(showTimer || show) && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          display='spinner'
          is24Hour={true}
          onChange={(event, selectedDate) => {
            setDate(selectedDate);
            if (callBack) {
              callBack(selectedDate);
            }
          }}
          onDismiss={() => setShow(false)}
        />
      )}
    </>
  );
}
