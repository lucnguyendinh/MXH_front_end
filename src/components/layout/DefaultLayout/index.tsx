import classNames from 'classnames/bind'

import Header from '../../components/Header'
import SidebarL from '../../components/SidebarL'
import SidebarR from '../../components/SidebarR'
import styles from './DefaultLayout.module.scss'

interface Props {
    children: any
}

const cx = classNames.bind(styles)

const DefaultLayout = (props: Props) => {
    const { children } = props
    return (
        <div className={cx('wrapper')}>
            <Header />
            <div className={cx('container')}>
                <div className={cx('side-bar-l')}>
                    <SidebarL />
                </div>
                <div className={cx('content')}>{children}</div>
                <div className={cx('side-bar-r')}>
                    <SidebarR />
                </div>
            </div>
        </div>
    )
}

export default DefaultLayout
