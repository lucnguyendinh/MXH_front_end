import classNames from 'classnames/bind'
import { Icon } from '@iconify/react'

import styles from './CreateStatus.module.scss'

const cx = classNames.bind(styles)

interface Props {
    setNewsFeed: any
}

const CreateStatus = (props: Props) => {
    const { setNewsFeed } = props
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('header')}>
                    <h1>Tạo bài viết</h1>
                    <div className={cx('close')}>
                        <div
                            className={cx('icon')}
                            onClick={() => setNewsFeed(false)}
                        >
                            <Icon icon="mdi:close" />
                        </div>
                    </div>
                </div>
                <div className={cx('content')}>
                    <div className={cx('user')}>
                        <div className={cx('avatar')}>
                            <img src="https://via.placeholder.com/40" alt="" />
                        </div>
                        <div className={cx('info')}>
                            <div className={cx('name')}>Nguyễn Đình Lực</div>
                            <div className={cx('option')}>Công khai</div>
                        </div>
                    </div>
                    <div className={cx('input')}>
                        <div className={cx('work')}>
                            <input
                                type="text"
                                placeholder="Bạn đang nghĩ gì thế ?"
                            />
                        </div>
                    </div>
                </div>
                <div className={cx('footer')}>
                    <div className={cx('more')}>
                        <h4>Thêm vào bài viết của bạn</h4>
                        <div className={cx('option-more')}></div>
                    </div>
                    <div className={cx('up')}>
                        <button>Đăng</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateStatus
