import React from 'react';
import { COMMON_COLORS } from '../../constants/colors';
import moment from 'moment';
import { DatePicker } from '../../components/common/DatePicker';
import { COMMON_STYLES } from '../../constants/styles'

const CalendarDatePicker = (props) => {
    let dobs = props.dob ? moment(props.dob,"DD/MM/YYYY") : moment("01/01/1970","DD/MM/YYYY");
    return (
        <DatePicker
            defaultDate={new Date(dobs.year(), dobs.month(), dobs.date())}
            maximumDate={new Date()}
            timeZoneOffsetInMinutes={undefined}
            modalTransparent={false}
            animationType={"fade"}
            androidMode={"calendar"}
            placeHolderText={props.dob ? dobs.format('DD/MM/YYYY') : "dd/mm/yyyy"}
            textStyle={[{ color: COMMON_COLORS.LIGHT_GRAY }, COMMON_STYLES.FONT_POPPINSREGULAR, COMMON_STYLES.TITLE_TEXT_SIZE]}
            onDateChange={props.chosenDate}
            disabled={false}
            placeHolderTextStyle={[{ color: COMMON_COLORS.LIGHT_GRAY }, COMMON_STYLES.FONT_POPPINSREGULAR, COMMON_STYLES.TITLE_TEXT_SIZE]}
        />
    )
}
export default CalendarDatePicker;