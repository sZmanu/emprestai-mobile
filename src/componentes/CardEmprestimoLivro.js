import React from 'react';
import { Text, View,  StyleSheet, TouchableOpacity} from 'react-native';
import {formatarDataParaFormulario} from '../utils/dataLivro';

const CardEmprestimoLivro = ({ emprestimo, onDevolver, onEditar }) => {

    return(
        <View style={styles.containerCard}>
            <View style={{flexWrap: 'wrap', alignItems: 'center'}}>
            <Text style={styles.title}>{emprestimo.livro?.titulo}</Text>
            </View>
            <View style={{backgroundColor: 'white', height: 150, width: 120, margin: 5}}></View>
            <View style={{marginTop: 3}}>
            <View style={styles.containerInform}>
            <Text style={styles.textInform}>Usuário:</Text>
            <Text style={styles.textResult}>{emprestimo.usuario?.nome}</Text>
            </View>
            <View style={styles.containerInform}>
            <Text style={styles.textInform}>Data de empréstimo:</Text>
            <Text style={styles.textResult}>{formatarDataParaFormulario(emprestimo.dataEmprestimo)}</Text>
            </View>
            <View style={styles.containerInform}>
            <Text style={styles.textInform}>Devolução:</Text>
            <Text style={styles.textResultDevolucao}>{formatarDataParaFormulario(emprestimo.dataDevolucao)}</Text>
            </View>
            
            <View style={styles.containerButton}>
                <TouchableOpacity style={styles.buttonEmprestimo} onPress={onDevolver}>
                    <Text style={styles.textButton}>Devolver</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonEmprestimo2} onPress={onEditar}>
                    <Text style={styles.textButton}>Editar</Text>
                </TouchableOpacity>
            </View>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    containerCard: {
       backgroundColor: '#D1D5DB',
       borderRadius: 12,
       width: 170,
       justifyContent: 'space-evenly',
       alignItems: 'center',
       paddingVertical: 10,
       paddingHorizontal: 10,
       rowGap: 1,
       elevation: 4,
       shadowColor: 'black',
       shadowOpacity: 0.5,
    },
    title: {
        color: '#374151',
        fontFamily: 'Quicksand Bold',
        fontSize: 15
    },
    containerInform: {
        flexDirection: 'row',
        columnGap: 5,
        flexWrap: 'wrap',
        alignSelf: 'flex-start',
        alignItems: 'center',
        height: 'auto',
    },
    textInform: {
        fontSize: 13,
        fontFamily: 'Quicksand Bold',
        color: '#374151'
    },
    textResult: {
        fontFamily: 'Quicksand Medium',
        fontSize: 13,
    },
    textResultDevolucao: {
        fontFamily: 'Quicksand Medium',
        fontSize: 13,
        color: '#1E3A8A'

    },
    containerButton: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '100%',
        marginTop: 10,
        marginBottom: 2,
        justifyContent: 'center',
        columnGap: 10
    },
    buttonEmprestimo: {
        width: 55,
        height: 17,
        backgroundColor: '#3B82F6',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 3,
    },
    buttonEmprestimo2: {
        width: 55,
        height: 17,
        backgroundColor: '#1E3A8A',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 3,
    },
    
    textButton: {
        fontSize: 8,
        fontFamily: 'Quicksand Bold',
        color: 'white'
    },
     
});
export default CardEmprestimoLivro;
