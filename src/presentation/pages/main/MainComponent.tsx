import { SafeAreaView, ScrollView, StatusBar, View } from "react-native";
import colorScheme from "../../../utils/colorScheme";
import getDarkScheme from "../../../utils/getDarkScheme";
import { MainViewmodelType } from "./mainViewmodel"
import AppHeader from "../../components/common/AppHeader";
import TodoComponent from "../../components/common/Todo";
import { Colors } from "react-native/Libraries/NewAppScreen";


type MainComponentProps = {
    viewmodel: MainViewmodelType
}

const MainComponent = ({ viewmodel }:MainComponentProps) => {
    const isDarkMode = getDarkScheme();

  const backgroundStyle = {
    backgroundColor: isDarkMode ? colorScheme.darkBackground : colorScheme.lightBackground,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <AppHeader/>
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
            {viewmodel.todo.map((item) => (<TodoComponent key={item.id} createdDate={item.createdDate} title={item.title} todos={item.todos} />))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default MainComponent