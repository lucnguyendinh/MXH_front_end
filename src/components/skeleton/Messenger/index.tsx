import classNames from 'classnames/bind'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import styles from './Messenger.module.scss'
import Header from '../../components/Header'

const cx = classNames.bind(styles)

const MessengerSkeleton = () => {
    return (
        <div className={cx('wrapper')}>
            <Header />
            <div className={cx('container')}>
                <div className={cx('side-bar')}>
                    <Skeleton height={'72px'} count={20} style={{ margin: '8px', marginLeft: '16px' }} />
                </div>
                <div className={cx('msg')} style={{ textAlign: 'center' }}>
                    <Skeleton height={'50px'} width={'50%'} count={4} style={{ margin: '8px' }} />
                </div>
                <div className={cx('info')} style={{ textAlign: 'center' }}>
                    <Skeleton height={'90px'} width={'90px'} circle={true} />
                    <Skeleton height={'50px'} count={2} style={{ margin: '8px', marginLeft: '16px' }} />
                </div>
            </div>
        </div>
    )
}

export default MessengerSkeleton
