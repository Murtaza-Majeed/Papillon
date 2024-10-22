import React from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from '@expo/vector-icons';
import { View, TouchableOpacity } from 'react-native';
import DayScreen from "./Screens/DayScreen";
import WeekScreen from "./Screens/WeekScreen";
import MonthScreen from "./Screens/MonthScreen";
import ToDoScreen from "./Screens/ToDoScreen";
import AddEventScreen from "./Screens/AddEventScreen"; // New import

const Tab = createBottomTabNavigator();

function AddButton({ onPress }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        top: -20, // Adjusted to lower the button
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <View style={{
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: '#0073CC',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <Ionicons name="add" size={32} color="white" />
      </View>
    </TouchableOpacity>
  );
}

export default function Index() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Day') {
            iconName = 'today';
          } else if (route.name === 'Week') {
            iconName = 'calendar';
          } else if (route.name === 'Month') {
            iconName = 'calendar';
          } else if (route.name === 'ToDo') {
            iconName = 'list';
          }

          return <Ionicons name={iconName} size={28} color={color} />;
        },
        tabBarActiveTintColor: '#0073CC',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          backgroundColor: 'white',
          borderTopWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
          height: 60,
          paddingBottom: 10, // Add padding to the bottom
        },
        tabBarItemStyle: {
          padding: 5,
        },
        tabBarShowLabel: false,
        headerShown: false,
      })}
    >
      <Tab.Screen 
        name="Day" 
        component={DayScreen}
      />
      <Tab.Screen 
        name="Week" 
        component={WeekScreen}
      />
      <Tab.Screen 
        name="Add" 
        component={AddEventScreen}
        options={({ navigation }) => ({
          tabBarButton: (props) => (
            <AddButton 
              {...props} 
              onPress={() => navigation.navigate('Add')}
            />
          ),
        })}
      />
      <Tab.Screen 
        name="Month" 
        component={MonthScreen}
      />
      <Tab.Screen 
        name="ToDo" 
        component={ToDoScreen}
      />
    </Tab.Navigator>
  );
}
