import React, { useState, useEffect } from 'react';
import { View, Text, Picker, Button, StyleSheet } from 'react-native';

const GradeCalculator = () => {
  const [grades, setGrades] = useState([
    ['', '', '', ''],
    ['', '', '', ''],
    ['', '', '', ''],
    ['', '', '', ''],
    ['', '', '', ''],
  ]);
  const [averageGrade, setAverageGrade] = useState('');
  const [showAverage, setShowAverage] = useState(false); 

  const handleGradeChange = (value, rowIndex, colIndex) => {
    const newGrades = [...grades];
    newGrades[rowIndex][colIndex] = value;
    setGrades(newGrades);
    setShowAverage(false); 
  };

  const calculateAverage = () => {
    const gradesValues = {
      'I': 0,
      'R': 1,
      'B': 2,
      'MB': 3
    };

    let total = 0;
    grades.forEach(row => {
      row.forEach(grade => {
        if (grade in gradesValues) {
          total += gradesValues[grade];
        }
      });
    });

    const average = total / (grades.length * grades[0].length);
    const roundedAverage = Math.round(average);
    
    const reverseGradesValues = {
      0: 'I',
      1: 'R',
      2: 'B',
      3: 'MB'
    };

    setAverageGrade(reverseGradesValues[roundedAverage]);
    setShowAverage(true); 
  };

  const limparResultado = () => {
    setAverageGrade(''); 
    setShowAverage(false); 
  };

  useEffect(() => {
    calculateAverage(); 
  }, [grades]); 
  const materias = ["P. Web", "P. Mob", "TCC", "QTS", "Sis E"];

  return (
    <View>
     <h1 style={styles.h1}>Calculador de menções </h1>
     <h4 style={styles.h2}>1°‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎‎ ‎ ‎‎‎ ‎ ‎ ‎ ‎  ‎ ‎ ‎ ‎  ‎ ‎ ‎ ‎ 
     2°‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎‎ ‎ ‎‎‎ ‎ ‎ ‎ ‎  ‎ ‎ ‎ ‎  ‎ ‎ ‎ ‎   
     3°‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎‎ ‎ ‎‎‎ ‎ ‎ ‎ ‎  ‎ ‎ ‎ ‎  ‎ ‎ ‎ ‎ 
     4° </h4>
      {grades.map((row, rowIndex) => (
        <View key={rowIndex} style={{ marginBottom: 10 }}>
          <Text style={styles.materiaText}>
            {materias[rowIndex]}:
          </Text>
          <View style={{ flexDirection: 'row' }}>
            {row.map((grade, colIndex) => (
              <Picker
                key={colIndex}
                selectedValue={grade}
                style={styles.dropdown}
                onValueChange={(itemValue) => handleGradeChange(itemValue, rowIndex, colIndex)}>
                <Picker.Item label="" value="" />
                <Picker.Item label="I" value="I" />
                <Picker.Item label="R" value="R" />
                <Picker.Item label="B" value="B" />
                <Picker.Item label="MB" value="MB" />
              </Picker>
            ))}
          </View>
        </View>
      ))}
      {averageGrade !== '' && <Text>Média: {averageGrade}</Text>}
      <Button title="Limpar Resultado" onPress={limparResultado} style={styles.limparButton} color="#9c27b0"/> 
    </View>
  );
};

const styles = StyleSheet.create({
  materiaText: {
    marginBottom: 5,
    fontWeight: 'bold',
    width: 50, 
    marginLeft: 10,
    marginTop: -10,
  },
  dropdown: {
    width: 40,
    textAlign: 'center',
    fontSize: 15,
    textTransform: 'uppercase',
    borderRadius: 10,
    marginTop: -19,
    marginLeft: 90,
    borderColor: 'white',
    marginRight: 10,
    boxShadow: '0px 1px 8px rgba(0, 0, 0, 0.1)',
  },
  h1: {
    fontSize: 25,
    fontFamily: 'arial,helvetica',
    color: '#e1bee7',
    marginLeft: 170,
  },
  h2: {
    fontSize: 20,
    fontFamily: 'arial,helvetica',
    color: '#e1bee7',
    marginTop: -2,
    marginLeft: 100,
  },
  limparButton: {
    marginTop: 20,
    backgroundColor: '#9c27b0',
    },
});

export default GradeCalculator;
