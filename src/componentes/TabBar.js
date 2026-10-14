import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View } from "react-native";
import TelaPrincipal from "../views/TelaPrincipal";
import ListaEmprestimos from "../views/ListaEmprestimos";
import ListaLivros from "../views/ListaLivros";
import Usuario from "../views/ListaUsuario";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';


const Tab = createBottomTabNavigator();

const TabBar = () => {
    return(
    <Tab.Navigator screenOptions={{
        tabBarActiveTintColor: '#F5F5DC',
        tabBarInactiveTintColor:"#F5F5DC",
        tabBarStyle:{
            backgroundColor: '#1E3A8A',
            height: 68,
            paddingTop: 8,
        }

    }}>
         <Tab.Screen 
                name="Home" 
                component={TelaPrincipal} 
                options={{ 
                    headerShown: false,
                tabBarIcon: ({ color, focused }) => {
                    if(focused){
                        return <MaterialCommunityIcons name="home" size={30} color={'#3B82F6'}/>
                    }
                    return <MaterialCommunityIcons name="home" size={30} color={color}/>

                }
             }}  
            />
         <Tab.Screen 
                name="Livros" 
                component={ListaLivros} 
                options={{ 
                    headerShown: false,
                tabBarIcon: ({ color, focused }) => {
                    if(focused){
                        return <Ionicons name="book-sharp" size={27} color={'#3B82F6'}/>
                    }
                    return <Ionicons name="book-sharp" size={27} color={color}/>

                }
             }}  
            />
            <Tab.Screen 
                name="Empréstimos" 
                component={ListaEmprestimos} 
                options={{ 
                    headerShown: false,
                tabBarIcon: ({ color, focused }) => {
                    if(focused){
                        return <MaterialCommunityIcons name="book-plus" size={28} color={'#3B82F6'}/>
                    }
                    return <MaterialCommunityIcons name="book-plus" size={28} color={color}/>

                }
             }}  
            />
            <Tab.Screen 
                name="Usuários" 
                component={Usuario} 
                options={{ 
                    headerShown: false,
                tabBarIcon: ({ focused }) => {
                    if(focused){
                        return(
                            <View style={{with: 29, height: 29, backgroundColor: '#3B82F6', borderRadius: 3, justifyContent: 'center', alignItems: 'center'}}>
                            <Ionicons name="person" size={24} color={'#1E3A8A'}/>
                        </View>
                        )
                    }
                    return (
                        <View style={{with: 29, height: 29, backgroundColor: '#F5F5DC', borderRadius: 3, justifyContent: 'center', alignItems: 'center'}}>
                        <Ionicons name="person" size={24} color={'#1E3A8A'}/>
                    </View>
                       
                    )

                }
             }}  
            />
    </Tab.Navigator>
    )
}
export default TabBar;