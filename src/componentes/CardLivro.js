import { Text, View,  StyleSheet, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const CardLivro = ({ livro, onExcluir, onEditar, onVisualizar}) => {
    const navigation = useNavigation();

    return(
        <View style={styles.containerCard}>
            <View style={{flexWrap: 'wrap', alignItems: 'center'}}>
            <Text style={styles.title}>{livro.titulo}</Text>
            </View>

                <View style={{ backgroundColor: 'white', height: 130, width: 150, margin: 5 }} />
           
            <View style={{marginTop: 3}}>
            <View style={styles.containerInform}>
            <Text style={styles.textInform}>Autor:</Text>
            <Text style={styles.textResult}>{livro.autor}</Text>
            </View>
            <View style={styles.containerInform}>
            <Text style={styles.textInform}>Publicação:</Text>
            <Text style={styles.textResult}>{livro.dataPublicacao}</Text>
            </View>
            <View style={styles.containerButton}>
            <TouchableOpacity style={styles.buttonEditar} onPress={onEditar}>
                    <Text style={styles.textButton}>Editar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonExcluir}  onPress={onExcluir}>
                    <Text style={styles.textButton}>Excluir</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={onVisualizar} style={styles.buttonDetalhes}>
                                 <Text style={styles.textButton}>Detalhes</Text>
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
       paddingVertical: 5,
       paddingHorizontal: 10,
       rowGap: 1,
       elevation: 4,
       shadowColor: 'black',
       shadowOpacity: 0.5,
    },
    title: {
        color: '#374151',
        fontFamily: 'Quicksand Bold',
        fontSize: 15,
        fontWeight: 'bold',
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
        color: '#103570',
        fontWeight: 'bold',
    },
    textResult: {
        fontFamily: 'Quicksand Medium',
        fontSize: 13,
        fontWeight: 'semibold',
    },
    textResultStatus: {
        fontFamily: 'Quicksand Medium',
        fontSize: 13,
        color: '#3B82F6'

    },
    containerButton: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '100%',
        marginTop: 10,
        marginBottom: 2,
        justifyContent: 'space-between',
    },
    buttonExcluir: {
        width: 45,
        height: 15,
        backgroundColor: '#374151',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 3,
    },
    buttonEditar: {
        width: 45,
        height: 15,
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
    buttonDetalhes: {
        width: 45,
        height: 15,
        backgroundColor: '#3B82F6',
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
export default CardLivro;