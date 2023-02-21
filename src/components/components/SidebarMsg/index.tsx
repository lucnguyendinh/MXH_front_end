import classNames from 'classnames/bind'

import styles from './SidebarMsg.module.scss'

const cx = classNames.bind(styles)

const SidebarMsg = () => {
    return <div className={cx('wrapper')}>Sidebar</div>
}

export default SidebarMsg
