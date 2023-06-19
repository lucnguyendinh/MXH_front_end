import classNames from 'classnames/bind'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import styles from './Personal.module.scss'

const cx = classNames.bind(styles)

const PersonalSkeleton = () => {
    return (
        <div style={{ backgroundColor: '#f0f2f5', height: '100vh' }} className={cx('wrapper')}>
            <div className={cx('wrapper')}>
                <div className={cx('header')}>
                    <div className={cx('cover-img')}>
                        <Skeleton height={'410px'} width={'1300px'} />
                    </div>
                    <div className={cx('h-content')}>
                        <div className={cx('info')}>
                            <Skeleton className={cx('avt')} circle={true} height={'135px'} width={'135px'} />
                        </div>
                        <div className={cx('h-footer')}>
                            <div className={cx('item')}>
                                <Skeleton height={'40px'} width={'80px'} />
                            </div>
                            <div className={cx('item')}>
                                <Skeleton height={'40px'} width={'80px'} />
                            </div>
                            <div className={cx('item')}>
                                <Skeleton height={'40px'} width={'80px'} />
                            </div>
                            <div className={cx('item')}>
                                <Skeleton height={'40px'} width={'80px'} />
                            </div>
                            <div className={cx('item')}>
                                <Skeleton height={'40px'} width={'80px'} />
                            </div>
                            <div className={cx('item')}>
                                <Skeleton height={'40px'} width={'80px'} />
                            </div>
                            <div className={cx('item')}>
                                <Skeleton height={'40px'} width={'80px'} />
                            </div>
                        </div>
                    </div>
                    <div className={cx('content')}>
                        <div className={cx('introduct')}>
                            <h2 className={cx('h-intro')}>Giới thiệu</h2>
                            <Skeleton height={'100%'} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PersonalSkeleton
