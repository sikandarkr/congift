import React from 'react';
import { ScrollView, View } from 'react-native';
import SegmentedControlTab from "react-native-segmented-control-tab";
import { COMMON_STYLES } from '../../constants/styles';
import { COMMON_COLORS } from '../../constants/colors';

class MultiSwitch extends React.Component {

    state = {
        btns: [],
        selectedIndex: 0
    };

    componentDidMount() {
        this.setState({ btns: this.props.variants });
    }

    changeSelection(i) {
        const { btns } = this.state;
        btns.map(btn => btn.selected = false);
        btns[i].selected = true;
        this.setState({ btns, selectedIndex: i });
        this.props.onChange(i);
    }

    render() {
        const { btns } = this.state;
        const tabs = btns.map(b => b.variation);
        if (!btns|| !tabs|| tabs[0] === '') return null;
        return (
            <View style={[COMMON_STYLES.MARGIN_BOTTOM]}>
                <ScrollView horizontal={true}>
                    <SegmentedControlTab
                        values={tabs}
                        selectedIndex={this.state.selectedIndex}
                        tabStyle={{ borderColor: COMMON_COLORS.PRIMARY }}
                        activeTabStyle={{ backgroundColor: COMMON_COLORS.PRIMARY }}
                        tabTextStyle={[COMMON_STYLES.PRIMARY_COLOR, COMMON_STYLES.LOW_HORIZONTAL_PADDING]}
                        activeTabTextStyle={{ color: COMMON_COLORS.WHITE }}
                        onTabPress={(index) => this.changeSelection(index)}
                    />
                </ScrollView>
            </View>
        );
    }
}

export default MultiSwitch;
