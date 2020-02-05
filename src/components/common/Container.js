import React from 'react';
import { View } from 'react-native';

export default function Container(props) {
    return <View style={{ flex: 1 }}>{props.children}</View>
}