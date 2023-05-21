import classNames from 'classnames/bind'

import styles from './Notifications.module.scss'

const cx = classNames.bind(styles)

const Notifications = () => {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <h1 className={cx('h')}>Thông báo</h1>
                <div className={cx('content')}>
                    <div className={cx('item')}>
                        <div className={cx('img')}>
                            <img
                                src="https://znews-photo.zingcdn.me/w660/Uploaded/mdf_eioxrd/2021_07_06/2.jpg"
                                alt=""
                            />
                        </div>
                        <div>
                            <p>
                                <strong>Lực Nguyễn</strong> và <strong>14 người khác</strong> vừa thích ảnh của bạn
                            </p>
                            <p>3 phút trước</p>
                        </div>
                    </div>
                    <div className={cx('item')}>
                        <div className={cx('img')}>
                            <img
                                src="https://znews-photo.zingcdn.me/w660/Uploaded/mdf_eioxrd/2021_07_06/2.jpg"
                                alt=""
                            />
                        </div>
                        <div>
                            <p>
                                <strong>Lực Nguyễn</strong> và <strong>14 người khác</strong> vừa thích ảnh của bạn
                            </p>
                            <p>3 phút trước</p>
                        </div>
                    </div>
                    <div className={cx('item')}>
                        <div className={cx('img')}>
                            <img
                                src="https://znews-photo.zingcdn.me/w660/Uploaded/mdf_eioxrd/2021_07_06/2.jpg"
                                alt=""
                            />
                        </div>
                        <div>
                            <p>
                                <strong>Lực Nguyễn</strong> và <strong>14 người khác</strong> vừa thích ảnh của bạn
                            </p>
                            <p>3 phút trước</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Notifications
