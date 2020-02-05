import React, { Component } from 'react';
import { Animated } from 'react-native';

class FadeView extends Component {
    state = {
        visible: true,
        x: new Animated.Value(-100),
    };

    slide = () => {
        Animated.spring(this.state.x, {
            toValue: 0,
        }).start();
        this.setState({
            visible: true,
        });
    };

    static getDerivedStateFromProps(nextProps) {

        return { visible: nextProps.visible };
    }

    render() {
        return (
            <Animated.View
                style={[{
                    transform: [
                        {
                            translateX: this.state.x
                        }
                    ]
                }]}
            >
                {this.props.children}
            </Animated.View>
        );
    }
}
export default FadeView;