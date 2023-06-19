import classNames from 'classnames/bind'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import styles from './Notifications.module.scss'

const cx = classNames.bind(styles)

const NotificationsSkeleton = () => {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <h1 className={cx('h')}>Thông báo</h1>
                <div className={cx('content')}>
                    <Skeleton height={'76px'} count={10} style={{ width: '94%', margin: '8px 3%' }} />
                </div>
            </div>
        </div>
    )
}

export default NotificationsSkeleton
