import React from 'react';
import { Text, View,  StyleSheet, TouchableOpacity} from 'react-native';
import { formatarDataParaFormulario } from '../utils/dataLivro';

const CardUsuario = ({ usuario, onEditar, onExcluir }) => {
    return(
        <View style={styles.containerCard}>
            <View style={{marginTop: 3, width: '100%', paddingHorizontal:10}}>
            <View style={styles.containerInform}>
            <Text style={styles.textInform}>Usuário:</Text>
            <Text style={styles.textResult}>{usuario.nome}</Text>
            </View>
            <View style={styles.containerInform}>
            <Text style={styles.textInform}>E-mail:</Text>
            <Text style={styles.textResult}>{usuario.email}</Text>
            </View>
            <View style={styles.containerInform}>
            <Text style={styles.textInform}>Telefone:</Text>
            <Text style={styles.textResult}>{usuario.telefone}</Text>
            </View>
            <View style={styles.containerInform}>
            <Text style={styles.textInform}>Data Nascimento:</Text>
            <Text style={styles.textResult}>{formatarDataParaFormulario(usuario.dataNascimento || '')}</Text>
            </View>
            <View style={styles.containerInform}>
            <Text style={styles.textInform}>Status de empréstimo</Text>
            <Text style={styles.textResult}>{usuario.statusEmprestimo}</Text>
            </View>
            
            <View style={styles.containerButton}>
            <TouchableOpacity onPress={onEditar} style={styles.buttonEmprestimo2}>
                    <Text style={styles.textButton2}>Editar</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={onExcluir} style={styles.buttonEmprestimo2}>
                    <Text style={styles.textButton2}>Excluir</Text>
                </TouchableOpacity>
            </View>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    containerCard: {
       backgroundColor: '#374151',
       borderRadius: 20,
       width: 260,
       justifyContent: 'center',
       alignItems: 'center',
       paddingVertical: 10,
       rowGap: 2,
       elevation: 4,
       shadowColor: 'black',
       shadowOpacity: 0.1, 
     
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
        fontFamily: 'Quicksand Medium',
        color: 'white'
    },
    textResult: {
        fontFamily: 'Quicksand Regular',
        fontSize: 13,
        color: 'white'
    },
    containerButton: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '55%',
        marginTop: 10,
        marginBottom: 2,
        justifyContent: 'space-between',
        alignSelf: 'center'
    },
    
    buttonEmprestimo2: {
        width: 55,
        height: 17,
        backgroundColor: '#D1D5DB',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 3,
    },
    textButton2: {
        fontSize: 8,
        fontFamily: 'Quicksand Bold',
        color: '#374151'
    },
     
});
export default CardUsuario;
