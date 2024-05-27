import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {StatusBar} from 'react-native';

const App = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');

  const onButtonPress = value => {
    if (value === '=') {
      if (input.trim() === '') {
        setResult('');
        return;
      }
      try {
        const formattedInput = input
          .replace(/%/g, '/100')
          .replace(/x/g, '*')
          .replace(/÷/g, '/');
        setResult(eval(formattedInput).toString());
      } catch (error) {
        setResult('error');
      }
    } else if (value === 'C') {
      setInput('');
      setResult('');
    } else if (value === ',') {
      setInput(input + '.');
    } else if (value === '⌫') {
      setInput(input.slice(0, -1));
    } else {
      setInput(input + value);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.resultContainer}>
        <Text style={styles.resultText}>{result}</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputText}
          value={input}
          onChangeText={setInput}
          keyboardType="numeric"
        />
      </View>
      <View style={styles.buttonContainer}>
        {[
          'C',
          '÷',
          'x',
          '⌫',
          '7',
          '8',
          '9',
          '-',
          '4',
          '5',
          '6',
          '+',
          '1',
          '2',
          '3',
          '%',
          ',',
          '0',
          '00',
          '=',
        ].map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.button,
              item === 'C' || item === '÷' || item === 'x' || item === '⌫'
                ? styles.specialButton
                : {},
              item === '=' ? styles.equalButton : {},
            ]}
            onPress={() => onButtonPress(item)}>
            <Text
              style={[
                styles.buttonText,
                item === 'C' || item === '÷' || item === 'x' || item === '⌫'
                  ? styles.specialButtonText
                  : {},
              ]}>
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    justifyContent: 'flex-end',
  },
  resultContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'flex-end',
    backgroundColor: '#000000',
    padding: 20,
  },
  resultText: {
    fontSize: 48,
    color: '#FFFFFF',
  },
  inputContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    backgroundColor: '#000000',
    padding: 20,
  },
  inputText: {
    fontSize: 36,
    color: '#FFFFFF',
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#000000',
  },
  button: {
    width: '25%',
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333333',
    backgroundColor: '#333333',
  },
  buttonText: {
    fontSize: 24,
    color: '#FFFFFF',
  },
  specialButton: {
    backgroundColor: '#FF9500',
  },
  specialButtonText: {
    color: '#FFFFFF',
  },
  equalButton: {
    backgroundColor: '#FF9500',
  },
});
