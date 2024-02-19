import { ActivityIndicator, Dimensions, SafeAreaView, ScrollView, StatusBar, StyleProp, Text, TextComponent, View, ViewStyle } from "react-native";
import colorScheme from "../../../utils/colorScheme";
import getDarkScheme from "../../../utils/getDarkScheme";
import { MainViewmodelType } from "./mainViewmodel"
import AppHeader from "../../components/common/AppHeader";
import TodoComponent from "../../components/common/Todo";
import { Colors } from "react-native/Libraries/NewAppScreen";
import ButtonComponent from "../../components/common/ButtonComponent";


type MainComponentProps = {
    viewmodel: MainViewmodelType
}

const MainComponent = ({ viewmodel }:MainComponentProps) => {
    const isDarkMode = getDarkScheme();
    const deviceWidth = Dimensions.get('window').width

  const backgroundStyle:StyleProp<ViewStyle> = {
    backgroundColor: isDarkMode.currentColorScheme ? colorScheme.darkBackground : colorScheme.lightBackground,
    flex: 1
  };

  const emptyStateStyle: StyleProp<ViewStyle> = {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  }

  if(viewmodel.isLoading) return (
    <SafeAreaView style={backgroundStyle}>
      <View style={emptyStateStyle} >
        <ActivityIndicator size='large' />
      </View>
    </SafeAreaView>
  )

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode.currentColorScheme ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
        <AppHeader/>
        {viewmodel.data.length === 0 && 
        <View style={emptyStateStyle}>
          <ButtonComponent overrideButtonStyle={{width:'auto', backgroundColor: isDarkMode.backgroundColor}} textStyle={{color: isDarkMode.typographyColor}} label="No task to display, click here to create" onClick={()=> viewmodel.createTask()} />
        </View>}

        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
            {viewmodel.data.map((item) => (<TodoComponent 
                                            todoId={item.todoId} 
                                            key={item.todoId} 
                                            createdDate={item.createdDate} 
                                            title={item.title} 
                                            task={item.task} 
                                            onCreateTask={()=> viewmodel.createSubTask({todoId: item.todoId}) }
                                            onCheckUncheck={(data:boolean, taskId:number)=> {
                                              viewmodel.checkUncheckTask({checked: String(data) as any, todoId: item.todoId, taskId: taskId })
                                              console.log(data, taskId)
                                            }}
                                            onDeleteTodo={()=> viewmodel.deleteTodo({todoId: item.todoId})}
                                            />))}
        </View>
    </SafeAreaView>
  );
}

export default MainComponent