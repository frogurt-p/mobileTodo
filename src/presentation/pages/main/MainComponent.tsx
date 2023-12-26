import { SafeAreaView, ScrollView, StatusBar, StyleProp, Text, TextComponent, View, ViewStyle } from "react-native";
import colorScheme from "../../../utils/colorScheme";
import getDarkScheme from "../../../utils/getDarkScheme";
import { MainViewmodelType } from "./mainViewmodel"
import AppHeader from "../../components/common/AppHeader";
import TodoComponent from "../../components/common/Todo";
import { Colors } from "react-native/Libraries/NewAppScreen";
import CustomText from "../../components/common/TextComponent";
import ButtonComponent from "../../components/common/ButtonComponent";


type MainComponentProps = {
    viewmodel: MainViewmodelType
}

const MainComponent = ({ viewmodel }:MainComponentProps) => {
    const isDarkMode = getDarkScheme();

  const backgroundStyle = {
    backgroundColor: isDarkMode.currentColorScheme ? colorScheme.darkBackground : colorScheme.lightBackground,
    flex: 1,
  };

  const emptyStateStyle: StyleProp<ViewStyle> = {
    // position: 'absolute',
    // top: 0,
    // left: 0,
    // right: 0,
    // bottom: 0,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }

  if(viewmodel.isLoading) return null

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode.currentColorScheme ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
        <AppHeader/>
        {viewmodel.data.length === 0 && 
        <View style={emptyStateStyle}>
          <CustomText label="No task to display, create one?" />
          <ButtonComponent label="Create" onClick={()=> viewmodel.createTask()} />
        </View>}

        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
            {viewmodel.data.map((item) => (<TodoComponent todoId={item.todoId} key={item.todoId} createdDate={item.createdDate} title={item.title} task={item.task} />))}
        </View>
    </SafeAreaView>
  );
}

export default MainComponent