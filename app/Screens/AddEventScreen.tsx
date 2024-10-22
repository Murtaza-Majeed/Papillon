import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const AddEventScreen = ({ navigation }) => {
  const handleAddEvent = () => {
    // Implement your event addition logic here
    console.log('Event added');
    // After adding the event, you might want to navigate back
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Event</Text>
      <TouchableOpacity style={styles.addButton} onPress={handleAddEvent}>
        <Text style={styles.addButtonText}>Add Event</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  addButton: {
    backgroundColor: '#0073CC',
    padding: 10,
    borderRadius: 5,
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default AddEventScreen;
