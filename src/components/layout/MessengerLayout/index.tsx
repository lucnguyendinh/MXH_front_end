import classNames from 'classnames/bind'

import Header from '../../components/Header'
import SidebarMsg from '../../components/SidebarMsg'
import Messenger from '../../page/Messenger'
import styles from './MessengerLayout.module.scss'

const cx = classNames.bind(styles)

const MessengerLayout = () => {
    return (
        <div className={cx('wrapper')}>
            <Header />
            <div className={cx('container')}>
                <SidebarMsg />
                <Messenger />
            </div>
        </div>
    )
}

export default MessengerLayout
