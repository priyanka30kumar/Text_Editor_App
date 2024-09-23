import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TextInput, Button, Alert, Text, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const App = () => {
  const [text, setText] = useState('');
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderlined, setIsUnderlined] = useState(false);
  const [fontFamily, setFontFamily] = useState('normal');
  const [textColor, setTextColor] = useState('#000'); // Default color: black

  // Load saved text on component mount
  useEffect(() => {
    const loadText = async () => {
      const savedText = await AsyncStorage.getItem('text');
      if (savedText) {
        setText(savedText);
      }
    };
    loadText();
  }, []);

  // Save text to local storage
  const saveText = async () => {
    try {
      await AsyncStorage.setItem('text', text);
      Alert.alert('Saved!', 'Your text has been saved.');
    } catch (error) {
      Alert.alert('Error', 'Failed to save text.');
    }
  };

  // Toggle Bold
  const toggleBold = () => {
    setIsBold(!isBold);
  };

  // Toggle Italic
  const toggleItalic = () => {
    setIsItalic(!isItalic);
  };

  // Toggle Underline
  const toggleUnderline = () => {
    setIsUnderlined(!isUnderlined);
  };

  // Change Font Family
  const changeFont = () => {
    setFontFamily(fontFamily === 'normal' ? 'serif' : 'normal');
  };

  // Change Text Color
  const changeColor = (color) => {
    setTextColor(color);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={[
          styles.textInput,
          {
            fontWeight: isBold ? 'bold' : 'normal',
            fontStyle: isItalic ? 'italic' : 'normal',
            textDecorationLine: isUnderlined ? 'underline' : 'none',
            fontFamily: fontFamily,
            color: textColor,
          }
        ]}
        value={text}
        onChangeText={setText}
        placeholder="Write your text here..."
        multiline
      />
      <View style={styles.buttonContainer}>
        <Button title="Save Text" onPress={saveText} />
        <TouchableOpacity style={styles.featureButton} onPress={toggleBold}>
          <Text style={styles.featureButtonText}>B</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.featureButton} onPress={toggleItalic}>
          <Text style={styles.featureButtonText}>I</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.featureButton} onPress={toggleUnderline}>
          <Text style={styles.featureButtonText}>U</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.featureButton} onPress={changeFont}>
          <Text style={styles.featureButtonText}>Font</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.featureButton} onPress={() => changeColor('#ff6347')}>
          <Text style={[styles.featureButtonText, { color: '#ff6347' }]}>Red</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.featureButton} onPress={() => changeColor('#4682b4')}>
          <Text style={[styles.featureButtonText, { color: '#4682b4' }]}>Blue</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.featureButton} onPress={() => changeColor('#ffd700')}>
          <Text style={[styles.featureButtonText, { color: '#ffd700' }]}>Yellow</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.featureButton} onPress={() => changeColor('#32cd32')}>
          <Text style={[styles.featureButtonText, { color: '#32cd32' }]}>Green</Text>
        </TouchableOpacity>
         <TouchableOpacity style={styles.featureButton} onPress={() => changeColor('#FFA500')}>
          <Text style={[styles.featureButtonText, { color: '#FFA500' }]}>Orange</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.featureButton} onPress={() => changeColor('#800080')}>
          <Text style={[styles.featureButtonText, { color: '#800080' }]}>Purple</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.featureButton} onPress={() => changeColor('#FFC0CB')}>
          <Text style={[styles.featureButtonText, { color: '#FFC0CB' }]}>Pink</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  textInput: {
    height: 200,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
    textAlignVertical: 'top',
    fontSize: 18,
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  featureButton: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    margin: 5,
    borderRadius: 5,
  },
  featureButtonText: {
    fontSize: 16,
  },
});

export default App;
