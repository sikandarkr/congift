import React from 'react';
import { withNavigation } from 'react-navigation';
//import Constants from 'expo-constants';
import Container from '../../components/common/Container';
import Content from '../../components/common/Content';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';

class UiContainer extends React.Component {
    render() {
        const { footerIcon, menu, renderHeader, noBorder, noBack, closeIcon, scrollable, noFooter, noHeader, btn1, btn2, onBtn1Press, onBtn2Press, title, onBack, backEvent, cart, Btn1Disabled, skip, navigation, onTap, cancelLabel } = this.props;
        return (
            <Container>
                {/*{noHeader ? null : <Header
                    cart={cart}
                    menu={menu}
                    closeIcon={closeIcon}
                    noBorder={noBorder} noBack={noBack}
                    title={title} onBack={() => onBack()}
                    backEvent={backEvent}
                    renderHeader={renderHeader}
                    skip={skip}
                    navigation={navigation}
                    skipNavigation={onTap} 
                    cancelLabel={cancelLabel}
                />}*/}
                <Content scrollable={scrollable}>
                    {this.props.children}
                </Content>
                {noFooter ? null : <Footer
                    footerIcon={footerIcon}
                    size={this.props.size} btn1={btn1} btn2={btn2}
                    onBtn1Press={() => onBtn1Press()}
                    onBtn2Press={() => onBtn2Press()}
                    Btn1Disabled={Btn1Disabled ? Btn1Disabled : false}/>}
            </Container>
        )
    }
}
export default withNavigation(UiContainer);
