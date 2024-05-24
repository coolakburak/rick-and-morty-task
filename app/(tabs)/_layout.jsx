import { Tabs } from "expo-router";
import React from "react";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";


export default function TabLayout() {
  

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "home" : "home-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="allCharacters"
        options={{
          title: "All Characters Screen",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "person" : "person-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: "Favorites Screen",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "heart-circle" : "heart-circle-outline"}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
