import React, {useEffect, useState} from 'react';
import {Modal, Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import DateTimePicker, {DateTimePickerAndroid} from '@react-native-community/datetimepicker';
import {formatarDataParaFormulario, formatarDataParaISO} from '../utils/dataLivro';

export default function CampoData({value, onChange, disabled = false, visible = true, label, style, textStyle}) {
  const [aberto, setAberto] = useState(false);
  const [dataTemporaria, setDataTemporaria] = useState(new Date());

  useEffect(() => {
    if (!visible || disabled) {
      setAberto(false);
    }
  }, [visible, disabled]);

  const selecionar = (_evento, data) => {
    if (!data) { return; }
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const ano = String(data.getFullYear()).padStart(4, '0');
    onChange(`${dia}/${mes}/${ano}`);
  };

  const abrir = () => {
    if (disabled || !visible) { return; }
    let data = new Date();
    try {
      data = new Date(`${formatarDataParaISO(formatarDataParaFormulario(value || ''))}T12:00:00`);
    } catch {
      // Campos vazios iniciam o calendário na data atual.
    }
    if (Platform.OS === 'android') {
      DateTimePickerAndroid.open({
        value: data,
        mode: 'date',
        display: 'calendar',
        onValueChange: selecionar,
        positiveButton: {label: 'Selecionar'},
        negativeButton: {label: 'Cancelar'},
      });
    } else {
      setDataTemporaria(data);
      setAberto(true);
    }
  };

  return (
    <>
      <TouchableOpacity
        style={style}
        disabled={disabled}
        onPress={abrir}
        accessibilityRole="button"
        accessibilityState={{disabled}}
        accessibilityLabel={`${label}${value ? ': ' + formatarDataParaFormulario(value) : ''}`}>
        <Text style={textStyle}>{formatarDataParaFormulario(value || '') || 'Selecionar data'}</Text>
      </TouchableOpacity>
      <Modal visible={aberto && visible && !disabled} transparent animationType="fade" onRequestClose={() => setAberto(false)}>
        <View style={styles.fundo}>
          <View style={styles.calendario}>
            <Text style={styles.titulo}>{label}</Text>
            <DateTimePicker
              value={dataTemporaria}
              mode="date"
              display="inline"
              themeVariant="light"
              onValueChange={(_evento, data) => setDataTemporaria(data)}
            />
            <View style={styles.botoes}>
              <TouchableOpacity accessibilityRole="button" onPress={() => setAberto(false)}>
                <Text style={styles.botao}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity accessibilityRole="button" onPress={() => {
                selecionar(null, dataTemporaria);
                setAberto(false);
              }}>
                <Text style={styles.botao}>Selecionar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  fundo: {flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)', justifyContent: 'center', alignItems: 'center'},
  calendario: {width: '94%', maxWidth: 420, padding: 16, borderRadius: 10, backgroundColor: 'white'},
  titulo: {fontSize: 16, color: '#374151', marginBottom: 8},
  botoes: {flexDirection: 'row', justifyContent: 'space-between'},
  botao: {color: '#1E3A8A', padding: 10, fontSize: 16},
});
