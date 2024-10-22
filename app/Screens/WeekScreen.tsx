import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Animated, Dimensions, ScrollView } from 'react-native';
import { Feather } from '@expo/vector-icons';

const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const colors = [
  'rgba(83, 175, 170, 0.25)',
  'rgba(255, 239, 231, 0.25)',
  'rgba(0, 48, 73, 0.25)',
  'rgba(142, 0, 139, 0.25)',
  'rgba(0, 115, 204, 0.25)',
  'rgba(246, 148, 93, 0.25)',
  'rgba(226, 52, 36, 0.25)'
];

const { width, height } = Dimensions.get('window');
const blockWidth = (width - 40) / 3; // Subtracting 40 for margins
const blockHeight = Math.min(blockWidth * 1.2, (height - 400) / 3); // Further reduced height

const WeekScreen = () => {
  const [slideAnim] = useState(new Animated.Value(0));
  const [isOpen, setIsOpen] = useState(false);

  const toggleSlide = () => {
    const toValue = isOpen ? 0 : 1;
    Animated.timing(slideAnim, {
      toValue,
      duration: 300,
      useNativeDriver: false,
    }).start();
    setIsOpen(!isOpen);
  };

  const slideHeight = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '30%'],
  });

  const renderBlock = (index: number, isDouble: boolean = false) => (
    <View style={[styles.block, isDouble && styles.doubleWidth, { backgroundColor: colors[index] }]}>
      <Text style={styles.dayText}>{weekDays[index]}</Text>
      <View style={styles.tasksContainer}>
        <Text style={styles.taskText}>Task 1</Text>
        <Text style={styles.taskText}>Task 2</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <View>
            <Text style={styles.headerYear}>2024</Text>
            <Text style={styles.headerWeek}>Week 42</Text>
          </View>
          <TouchableOpacity style={styles.notificationIcon}>
            <Feather name="bell" size={24} color="#1E3A8A" />
            <View style={styles.notificationDot} />
          </TouchableOpacity>
        </View>

        <View style={styles.weekGrid}>
          <View style={styles.row}>
            {[0, 1, 2].map((index) => renderBlock(index))}
          </View>
          <View style={styles.row}>
            {renderBlock(3, true)}
            {renderBlock(4)}
          </View>
          <View style={styles.row}>
            {renderBlock(5)}
            {renderBlock(6, true)}
          </View>
        </View>

        <TouchableOpacity style={styles.dailyTasksButton} onPress={toggleSlide}>
          <Text style={styles.dailyTasksButtonText}>Daily Tasks</Text>
        </TouchableOpacity>

        <Animated.View style={[styles.slideContainer, { height: slideHeight }]}>
          <Text style={styles.slideContentText}>Daily tasks content goes here</Text>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 80, // Add padding at the bottom to account for the tab bar
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  headerYear: {
    fontSize: 16,
    color: '#6B7280',
  },
  headerWeek: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1E3A8A',
  },
  notificationIcon: {
    position: 'relative',
  },
  notificationDot: {
    position: 'absolute',
    right: -2,
    top: -2,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'red',
  },
  weekGrid: {
    margin: 20,
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  block: {
    width: blockWidth,
    height: blockHeight,
    padding: 10,
  },
  doubleWidth: {
    width: blockWidth * 2,
  },
  dayText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1E3A8A',
    marginBottom: 5,
  },
  tasksContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  taskText: {
    fontSize: 10,
    color: '#4B5563',
    marginBottom: 2,
  },
  dailyTasksButton: {
    backgroundColor: '#3B82F6',
    marginHorizontal: 20,
    marginBottom: 15,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  dailyTasksButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  slideContainer: {
    overflow: 'hidden',
    marginHorizontal: 20,
    marginBottom: 20,
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
  },
  slideContentText: {
    padding: 15,
    fontSize: 14,
    color: '#4B5563',
  },
});

export default WeekScreen;
