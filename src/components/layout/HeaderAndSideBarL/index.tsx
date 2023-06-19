import classNames from 'classnames/bind'

import Header from '../../components/Header'
import SidebarL from '../../components/SidebarL'
import styles from './HeaderAndSideBarL.module.scss'

interface Props {
    children: any
}

const cx = classNames.bind(styles)

const HeaderAndSideBarL = (props: Props) => {
    const { children } = props
    return (
        <div className={cx('wrapper')}>
            <Header />
            <div className={cx('container')}>
                <div className={cx('side-bar-l')}>
                    <SidebarL />
                </div>
                <div className={cx('content')}>{children}</div>
            </div>
        </div>
    )
}

export default HeaderAndSideBarL
