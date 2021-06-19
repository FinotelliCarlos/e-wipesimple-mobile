import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationTheme } from "ui/themes/app-theme";
import Index from "pages";
import SearchProfessional from "pages/search-professional";
import Logo from "@assets/img/logos/e-wipesimple-logo1x.png";
import { Image } from "react-native";

const Stack = createStackNavigator();

export type RootStackParamList = {
  Index: undefined;
  SearchProfessional: undefined;
};

const Router: React.FC = () => {
  return (
    <NavigationContainer theme={NavigationTheme}>
      <Stack.Navigator>
        <Stack.Screen
          name={"Index"}
          component={Index}
          options={{
            headerTitleAlign: "center",
            headerTitle: () => (
              <Image
                source={Logo}
                style={{
                  width: 150,
                  height: 50,
                  resizeMode: "contain",
                }}
              />
            ),
          }}
        />
        <Stack.Screen
          name={"SearchProfessional"}
          component={SearchProfessional}
          options={{
            title: "Buscar Profissionais",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Router;
