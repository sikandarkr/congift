import { ICONS } from "./icons";

export const NAV_MENU = [
    { label: 'home', link: 'Home', icon: ICONS.HOME, subtitle: '' },
    { label: 'giftbox', link: 'Giftbox', icon: ICONS.GIFTBOX, subtitle: 'Gift received & sent', requiresLogin: true },
    { label: 'my account', link: 'MyAccount', icon: ICONS.MYACCOUNT, subtitle: 'Profile, Privacy & More', requiresLogin: true },
    { label: 'support & faqs', link: 'Support', icon: ICONS.SUPPORT, subtitle: 'Terms of Use, Feedback & More' },
    //{ label: 'help', link: 'Tutorials', icon: ICONS.HELP, subtitle: '' },
]