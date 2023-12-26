import MainComponent from "./MainComponent"
import mainViewmodel from "./mainViewmodel"




export const MainPage = () => {
    const viewModel = mainViewmodel()
    return <MainComponent viewmodel={viewModel}/>
}