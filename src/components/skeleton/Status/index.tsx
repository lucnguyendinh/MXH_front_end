import classNames from 'classnames/bind'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import styles from './Status.module.scss'

const cx = classNames.bind(styles)

const StatusSkeleton = () => {
    return (
        <div className={cx('wrapper')}>
            <Skeleton height={'500px'} count={4} style={{ margin: '8px', marginLeft: '16px' }} />
        </div>
    )
}

export default StatusSkeleton
