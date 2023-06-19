import classNames from 'classnames/bind'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import styles from './Home.module.scss'
import Header from '../../components/Header'

const cx = classNames.bind(styles)

const HomeSkeleton = () => {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <Header />
            </div>
            <div className={cx('container')}>
                <div className={cx('side-bar-l')}>
                    <Skeleton height={'50px'} count={10} style={{ margin: '8px', marginLeft: '16px' }} />
                </div>
                <div className={cx('content')}>
                    <Skeleton height={'500px'} count={4} style={{ margin: '8px', marginLeft: '16px' }} />
                </div>
                <div className={cx('side-bar-r')}>
                    <Skeleton height={'50px'} count={10} style={{ margin: '8px', marginLeft: '16px' }} />
                </div>
            </div>
        </div>
    )
}

export default HomeSkeleton
