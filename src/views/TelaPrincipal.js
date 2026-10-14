import React from "react";
import { Text, View, ScrollView, StyleSheet, Image, TextInput, TouchableOpacity, Dimensions} from "react-native";


const { height } = Dimensions.get('window');

const TelaPrincipal = () => {

    return (
            <ScrollView contentContainerStyle={{ flexGrow: 1,  minHeight: height}} >
                <View style={styles.container}>
                    <View style={{width: '100%', height: 50, backgroundColor: '#1E3A8A', position: 'absolute',top: 0}}></View>
                    <Image source={require('../images/imageInicio.png')} style={styles.imagemInicio}/>
                    <View style={{alignItems: 'center', width: '90%', justifyContent: 'space-between', marginBottom: 150, rowGap: 35}}>
                    <Text style={styles.title}>Bem vindo ao</Text>
                    <Image source={require('../images/logo.png')} style={styles.imagem}/>
                    

                    <View style={{width: '90%', rowGap: 25, justifyContent: 'space-between', alignItems: 'center'}}>
                        <TextInput placeholder="TÍTULO DO LIVRO"  style={styles.input}/>
                        <TextInput placeholder="AUTOR DO LIVRO" style={styles.input}/>
                        <TouchableOpacity style={styles.btn}>
                            <Text style={styles.textBtn}>Pesquisar</Text>
                        </TouchableOpacity>
                    </View>
                    </View>   
                </View>

            </ScrollView>
        
    );
}
const styles = StyleSheet.create({
    container:{
        backgroundColor: '#F5F5DC',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontSize: 37,
        fontFamily: 'Quicksand SemiBold',
        color: '#3B82F6',
    },
    imagem: {
        width: 220,
        height: 220,
    },
    imagemInicio: {
        height: 620,
        width: 165,
        position: 'absolute',
        left: 0,
        bottom: 0
    },
    input: {
        backgroundColor: '#D1D5DB',
        width: '100%',
        borderRadius: 10,
        height: 45,
        elevation: 4,
        shadowColor: 'black',
        paddingHorizontal: 10,
        fontFamily: 'Poppins Regular',
        fontSize: 15
    },
    btn: {
        backgroundColor: '#1E3A8A',
        height: 40,
        width: 120,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textBtn: {
        color: 'white',
        ffontFamily: 'Quicksand Medium',
        fontSize: 15
    }
})
export default TelaPrincipal;
