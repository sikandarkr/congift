import React from 'react';
import { View, TouchableOpacity, Linking, StyleSheet, Text, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COMMON_COLORS } from '../../constants/colors';
import { ONE_COL } from '../../constants/dimensions';
import { normalize } from '../../utils/common.util';
import { COMMON_STYLES } from '../../constants/styles';

const AddressCard = ({ store, onTap }, props) => {
    return (
        <View style={styles.container}>
            <View style={styles.rowAlign}>
                <View style={{ flex: 0.75 }}>
                    <Text style={[COMMON_STYLES.FONT_NOTOSANSMEDIUM, COMMON_STYLES.DEFAULT_TEXT_SIZE]}>{store.title}</Text>
                    <Text style={[COMMON_STYLES.DEFAULT_TEXT_SIZE]}>{store.description}</Text>
                </View>
                <View style={[{ flex: 0.25 }, COMMON_STYLES.FLEX_CENTER]}>
                    <Image style={{ height:100, width:75, resizeMode: 'contain' }} source={{ uri: store.logo}} />
                </View>
            </View>
            <View style={styles.rowAlign}>
                <TouchableOpacity style={[COMMON_STYLES.BLUE_BUTTON, COMMON_STYLES.MODERATE_HORIZONTAL_PADDING]} onPress={() => onTap()}>
                    <Text style={[COMMON_STYLES.TEXT_WHITE, COMMON_STYLES.DEFAULT_TEXT_SIZE]}>
                        <Ionicons name="md-compass" style={[COMMON_STYLES.TEXT_WHITE, COMMON_STYLES.DEFAULT_TEXT_SIZE]} /> Directions</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[COMMON_STYLES.BLUE_BUTTON, COMMON_STYLES.LOW_HORIZONTAL_MARGIN, COMMON_STYLES.MODERATE_HORIZONTAL_PADDING]}
                    onPress={() => Linking.openURL(`tel:${store.contact}`)}>
                    <Text style={[COMMON_STYLES.TEXT_WHITE, COMMON_STYLES.DEFAULT_TEXT_SIZE]}>
                        <Ionicons name="md-call" style={[COMMON_STYLES.TEXT_WHITE, COMMON_STYLES.DEFAULT_TEXT_SIZE]} /> Call</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
export default AddressCard;
const styles = StyleSheet.create({
    container: {
        width: ONE_COL * 0.9, alignSelf: 'center', position: 'absolute', borderRadius: normalize(5), justifyContent: 'center',
        bottom: normalize(25), backgroundColor: COMMON_COLORS.WHITE, elevation: 2, padding: normalize(10)
    },
    rowAlign: { flex: 1, flexDirection: 'row' }
})
