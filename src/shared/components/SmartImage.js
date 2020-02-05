import * as _ from "lodash";
import * as React from "react";
import { Animated, StyleSheet, View, Platform } from "react-native";
import * as FileSystem from 'expo-file-system'
import SHA1 from "crypto-js/sha1";
import { Image } from "react-native-expo-image-cache";


const propsToCopy = [
    "borderRadius", "borderBottomLeftRadius", "borderBottomRightRadius", "borderTopLeftRadius", "borderTopRightRadius"
];

export default class SmartImage extends React.Component {

    // async componentWillMount() {
    //     const { preview, uri } = this.props;
    //     this.setState({ intensity: new Animated.Value(100) });
    //     const entry = await getCacheEntry(uri);
    //     if (!entry.exists) {
    //         if (preview) {
    //             this.setState({ uri: preview });
    //         }
    //         if (uri.startsWith("file://")) {
    //             await FileSystem.copyAsync({ from: uri, to: entry.path });
    //         } else {
    //             await FileSystem.downloadAsync(uri, entry.path);
    //         }
    //     }
    //     this.setState({ uri: entry.path });
    // }

    // onLoadEnd(uri) {
    //     if (!uri.startsWith("data:")) {
    //         const intensity = new Animated.Value(100);
    //         this.setState({ intensity });
    //         Animated.timing(intensity, { duration: 300, toValue: 0, useNativeDriver: Platform.OS === "ios" }).start();
    //     }
    // }

    render() {
        const { style, uri } = this.props;
        //const { uri, intensity } = this.state;
        const computedStyle = [
            StyleSheet.absoluteFill,
            _.pickBy(StyleSheet.flatten(style), (value, key) => propsToCopy.indexOf(key) !== -1)
        ];
        return (
            <View {...{ style }}>
                {
                    uri && (
                        <Image
                            {...{ uri }}
                            // Fix: Banner flickering on bottom bar press.
                            /*resizeMode={this.props.cover ? 'stretch' : "contain"}*/
                            style={[computedStyle]}
                        />
                    )
                }
            </View>
        );
    }
}

const getCacheEntry = async (uri) => {
    const ext = uri.substring(uri.lastIndexOf("."), uri.indexOf("?") === -1 ? undefined : uri.indexOf("?"));
    const path = FileSystem.cacheDirectory + SHA1(uri) + ext;
    const info = await FileSystem.getInfoAsync(path);
    const { exists } = info;
    return { exists, path };
}
