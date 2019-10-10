import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

//? Import Component
import Header from 'components/header';
import ButtonShare from 'components/buttonShare';
//? Import Screens
import BottomTabStack from './bottomTab';
import LoginScreen from './Login';
import AuthLoadingScreen from './AuthLoading';
import Details from './Details';
import DetailEpisode from './DetailEpisode';

const AuthStack = createStackNavigator({
  Login: {
    screen: LoginScreen,
    navigationOptions: {
      header: null,
    },
  },
});

const AppStack = createStackNavigator(
  {
    bottomTab: {
      screen: BottomTabStack,
      navigationOptions: {
        header: null,
      },
    },
    Details: {
      screen: Details,
      navigationOptions: {
        headerTitle: <Header titleText="Details" />,
        headerRight: <ButtonShare />,
      },
    },
    DetailEpisode: {
      screen: DetailEpisode,
      navigationOptions: {
        headerTitle: <Header titleText="Ep. 1" />,
        headerRight: <ButtonShare />,
      },
    },
  },
  {},
);

export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      App: AppStack,
      Auth: AuthStack,
    },
    {
      initialRouteName: 'App',
    },
  ),
);