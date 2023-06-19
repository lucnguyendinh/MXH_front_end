import classNames from 'classnames/bind'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import styles from './Friends.module.scss'

const cx = classNames.bind(styles)

const FriendsSkeleton = () => {
    return (
        <div className={cx('wrapper')}>
            <Skeleton count={30} height={'55px'} style={{ marginBottom: '8px' }} />
        </div>
    )
}

export default FriendsSkeleton
