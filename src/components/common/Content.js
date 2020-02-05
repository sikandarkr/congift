import React from 'react';
import { ScrollView, View } from 'react-native';

export default function Content(props) {
    if (props.scrollable) {
        return <ScrollView style={{ flex: 1 }}>{props.children}</ScrollView>;
    }
    return <View style={{ flex: 1 }}>{props.children}</View>

}