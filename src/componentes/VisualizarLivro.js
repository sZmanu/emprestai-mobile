import React from 'react';
import {
  Modal,
  View,
  StyleSheet,
  Text,
  ScrollView,
  Pressable,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {formatarDataParaFormulario} from '../utils/dataLivro';

const VisualizarLivro = ({livro, onClose}) => {
  if (!livro) {
    return null;
  }

  return (
    <Modal transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.fundo}>
        <Pressable
          style={StyleSheet.absoluteFill}
          onPress={onClose}
          accessibilityRole="button"
          accessibilityLabel="Fechar detalhes do livro"
        />
        <View style={styles.modal} accessibilityViewIsModal>
          <View style={styles.topBar}>
            <Pressable
              onPress={onClose}
              style={styles.fechar}
              accessibilityRole="button"
              accessibilityLabel="Fechar">
              <Icon name="x" size={22} color="white" />
            </Pressable>
          </View>
          <ScrollView contentContainerStyle={styles.conteudo}>
            <View style={styles.cabecalho}>
              <Text style={styles.titulo} accessibilityRole="header">
                {livro.titulo?.trim() || 'Livro sem título'}
              </Text>
              <Text style={styles.subtitulo}>
                {livro.autor?.trim()
                  ? `por ${livro.autor}`
                  : 'Autor não informado'}
              </Text>
            </View>
            <View style={styles.corpo}>
              <View style={styles.informacoes}>
                <View style={styles.informacao}>
                  <View style={styles.icone}>
                    <Icon name="user" size={20} color="#1E3A8A" />
                  </View>
                  <View style={styles.valorContainer}>
                    <Text style={styles.label}>Autor</Text>
                    <Text style={styles.valor}>
                      {livro.autor?.trim() || 'Não informado'}
                    </Text>
                  </View>
                </View>
                <View style={styles.divisor} />
                <View style={styles.informacao}>
                  <View style={styles.icone}>
                    <Icon name="calendar" size={20} color="#1E3A8A" />
                  </View>
                  <View style={styles.valorContainer}>
                    <Text style={styles.label}>Publicação</Text>
                    <Text style={styles.valor}>
                      {formatarDataParaFormulario(livro.dataPublicacao || '') ||
                        'Não informada'}
                    </Text>
                  </View>
                </View>
              </View>
              <View style={styles.sinopseCabecalho}>
                <View style={styles.marcador} />
                <Text style={styles.sinopseTitulo} accessibilityRole="header">
                  Sobre o livro
                </Text>
              </View>
              <Text style={styles.sinopse} selectable>
                {livro.sinopse?.trim() ||
                  'Este livro ainda não possui uma sinopse cadastrada.'}
              </Text>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  fundo: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.65)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 24,
  },
  modal: {
    width: '90%',
    maxWidth: 520,
    maxHeight: '90%',
    borderRadius: 22,
    backgroundColor: '#FAFBFF',
    overflow: 'hidden',
    elevation: 12,
    shadowColor: '#0F172A',
    shadowOpacity: 0.2,
    shadowRadius: 20,
    shadowOffset: {width: 0, height: 8},
  },
  topBar: {
    backgroundColor: '#142f5a',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 4,
  },
  identificacao: {flexDirection: 'row', alignItems: 'center', gap: 8, flex: 1},
  identificacaoTexto: {
    color: '#BFDBFE',
    fontSize: 13,
    fontFamily: 'Quicksand SemiBold',
    flexShrink: 1,
  },
  fechar: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  conteudo: {paddingBottom: 8},
  cabecalho: {
    backgroundColor: '#142f5a',
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 30,
  },
  titulo: {
    color: 'white',
    fontSize: 28,
    lineHeight: 36,
    fontFamily: 'Quicksand Bold',
  },
  subtitulo: {
    color: '#BFDBFE',
    fontSize: 16,
    lineHeight: 24,
    fontFamily: 'Quicksand Medium',
    marginTop: 10,
  },
  corpo: {padding: 24},
  informacoes: {backgroundColor: '#EFF4FC', borderRadius: 16, padding: 16},
  informacao: {flexDirection: 'row', alignItems: 'center', gap: 12},
  icone: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#DBEAFE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  valorContainer: {flex: 1, minWidth: 0},
  label: {
    color: '#64748B',
    fontSize: 12,
    fontFamily: 'Quicksand SemiBold',
    marginBottom: 4,
  },
  valor: {
    color: '#142f5a',
    fontSize: 16,
    lineHeight: 23,
    fontFamily: 'Quicksand SemiBold',
  },
  divisor: {height: 1, backgroundColor: '#DCE5F2', marginVertical: 14},
  sinopseCabecalho: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 28,
    marginBottom: 14,
  },
  marcador: {width: 4, height: 22, borderRadius: 2, backgroundColor: '#3B82F6'},
  sinopseTitulo: {
    color: '#142f5a',
    fontSize: 20,
    fontFamily: 'Quicksand Bold',
    flexShrink: 1,
  },
  sinopse: {
    color: '#475569',
    fontSize: 16,
    lineHeight: 27,
    fontFamily: 'Quicksand Regular',
  },
});

export default VisualizarLivro;
