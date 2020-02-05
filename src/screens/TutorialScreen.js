import React from 'react';
import { View, Image, TouchableOpacity, Text, BackHandler } from 'react-native';
import Swiper from '../containers/Swiper';
import { ONE_COL } from '../constants/dimensions';
import { CITY_NAME, CITY_CODE } from '../constants/common';
import { normalize } from "../utils/common.util";
import LoginLink from '../components/user/LoginLink';

class TutorialScreen extends React.Component {
    state = {
        search: '',
        sliderIndex: 0,
        maxSlider: 2
    }

    //Disable swiping on the screen (IOS)
    static navigationOptions = () => {
        return {
            gesturesEnabled: false,
        };
    };

    images = [
        { title: 'GIFTING', image: require('../../assets/tutorial/gifting.jpg'), description: 'Send a personalized gift to your dear one from hundreds of popular brands and surprise them on their special moment' },
        { title: 'TEASE', image: require('../../assets/tutorial/tease.jpg'), description: 'A unique feature where you simply invite a user to treat you! Love can be shared in so many ways!' },
        { title: 'FAVOURITES', image: require('../../assets/tutorial/favourites.jpg'), description: 'Walkin to the store and use the barcode to redeem your gift straight from your phone.' },
    ];
    setRef = (c) => {
        this.listRef = c;
    }

    scrollToIndex = (index, animated) => {
        this.listRef && this.listRef.scrollToIndex({ index, animated })
    }

    componentDidMount() {
        this.setState({ maxSlider: this.images.length - 1 })
        const { sliderIndex, maxSlider } = this.state
        let nextIndex = 0

        if (sliderIndex < maxSlider) { nextIndex = sliderIndex + 1 }
        else { nextIndex = 0; }

        this.scrollToIndex(nextIndex, true)
        this.setState({ sliderIndex: nextIndex });
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }

    handleBackButton() {
        return true; // disabling back button behavior
    }
    _renderTutorial = (item, i) => {
        return (<View style={[{ flex: 1, marginTop:0, paddingBottom:5, paddingTop:0}]} key={i}>
            <Image source={item.image} style={[{width: ONE_COL, height: ONE_COL * 0.75, resizeMode:'contain'}]} />
            <Text>{item.title}</Text>
            <Text>{item.description}</Text>
        </View>);
    }

    async setLocation(index) {
        this.props.storeLocation({ name: CITY_NAME, code: CITY_CODE});
        this.props.navigation.navigate('Main');
    }

    _renderPageNClose = () => {
        return (
            <TouchableOpacity onPress={() => this.setLocation(0)} style={{ alignSelf: 'flex-end' }}>
                <Text>Skip</Text>
            </TouchableOpacity>
        )
    }

    render() {
        const first = this.props.navigation.getParam('first');
        return (
            <View style={{ flexDirection: 'column', flex:1 }}>
                <View style={{ flex:0.5, justifyContent: 'flex-end'}} >
                    {this._renderPageNClose()}
                </View>
                <View style={{ flex: 2.50}} >
                    <Swiper
                        index={0}
                        loop
                        //autoplayTimeout={5}
                        onIndexChanged={(i) => this.setState({ sliderIndex: i })}
                    >
                        {this.images.map((item, i) => this._renderTutorial(item, i))}
                    </Swiper>
                </View>
                <View style={{ flex:1, bottom: normalize(10), justifyContent: 'flex-end' }} >
                    <LoginLink />
                </View>
            </View>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    storeLocation: (location) => dispatch(storeLocation(location))
});

export default TutorialScreen;