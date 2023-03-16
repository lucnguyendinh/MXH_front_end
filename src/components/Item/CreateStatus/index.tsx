import classNames from 'classnames/bind'
import { Icon } from '@iconify/react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import styles from './CreateStatus.module.scss'
import { upStatus } from '../../../redux/Api/apiRequest'

const cx = classNames.bind(styles)

interface Props {
    setNewsFeed: any
}

const CreateStatus = (props: Props) => {
    const { setNewsFeed } = props
    const dispatch = useDispatch()
    const user = useSelector((state: any) => state.auth.login.currentUser?.userInfo._id)
    const [optionCheck, setOptionCheck] = useState(1)
    const [checkOption, setCheckOption] = useState(false)
    const [content, setContent] = useState('')
    const [shareW, setShareW] = useState('Công khai')

    const handleUp = () => {
        const status = {
            content,
            user,
            shareW: optionCheck,
        }

        upStatus(status, dispatch)
        setNewsFeed(false)
    }

    const option = [
        {
            title: 'Công khai',
            des: 'Bất kì ai ở trên hoặc ngoài',
            icon: <Icon icon="mdi:world-wide-web" />,
            id: 1,
        },
        {
            title: 'Bạn bè',
            des: 'Bạn bè của bạn',
            icon: <Icon icon="fa-solid:user-friends" />,
            id: 2,
        },
        {
            title: 'Chỉ mình tôi',
            icon: <Icon icon="material-symbols:lock" />,
            id: 3,
        },
        {
            title: 'Tuỳ chỉnh',
            des: 'Bao gồm và loại trừ bạn bè, danh sách',
            icon: <Icon icon="uiw:setting" />,
            id: 4,
        },
    ]

    return (
        <div className={cx('wrapper')}>
            {!checkOption ? (
                <div className={cx('container')}>
                    <div className={cx('header')}>
                        <h1>Tạo bài viết</h1>
                        <div className={cx('close')}>
                            <div className={cx('icon')} onClick={() => setNewsFeed(false)}>
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
                                <div className={cx('option')} onClick={() => setCheckOption(true)}>
                                    {shareW}
                                </div>
                            </div>
                        </div>
                        <div className={cx('input')}>
                            <div className={cx('work')}>
                                <input
                                    onChange={(e) => setContent(e.target.value)}
                                    value={content}
                                    type="text"
                                    placeholder="Bạn đang nghĩ gì thế ?"
                                />
                            </div>
                        </div>
                    </div>
                    <div className={cx('footer')}>
                        <div className={cx('more')}>
                            <h4>Thêm vào bài viết của bạn</h4>
                            <div className={cx('icon-more')}>
                                <Icon className={cx('icon', 'green')} icon="icomoon-free:images" />
                                <Icon className={cx('icon', 'blue')} icon="fluent-mdl2:add-friend" />
                                <Icon
                                    className={cx('icon', 'orange')}
                                    icon="material-symbols:add-reaction-outline-sharp"
                                />
                                <Icon className={cx('icon', 'red')} icon="akar-icons:check-in" />
                                <Icon className={cx('icon', 'light-blue')} icon="ph:flag-fill" />
                                <Icon className={cx('icon')} icon="iwwa:option-horizontal" />
                            </div>
                        </div>
                        <div onClick={handleUp} className={cx('up')}>
                            Đăng
                        </div>
                    </div>
                </div>
            ) : (
                <div className={cx('option-container')}>
                    <div className={cx('header')}>
                        <div className={cx('close')}>
                            <div className={cx('icon')} onClick={() => setCheckOption(false)}>
                                <Icon icon="material-symbols:arrow-back-rounded" />
                            </div>
                        </div>
                        <h1>Đối tượng của bài viết</h1>
                    </div>
                    <div className={cx('option-content')}>
                        <h3>Ai có thể xem bài viết của bạn?</h3>
                        <p>Bài viết của bạn sẽ hiển thị ở Bảng feed, trang cá nhân và kết quả tìm kiếm.</p>
                        <div className={cx('option-options')}>
                            {option.map((item, index) => {
                                return (
                                    <div
                                        key={index}
                                        className={cx('option-option-item')}
                                        onClick={() => {
                                            setOptionCheck(item.id)
                                            setShareW(item.title)
                                        }}
                                    >
                                        <div className={cx('option-icon')}>{item.icon}</div>
                                        <div className={cx('option-des')}>
                                            <div className={cx('option-option-title')}>{item.title}</div>
                                            <div className={cx('option-option-des')}>{item.des}</div>
                                        </div>
                                        <input
                                            type="radio"
                                            checked={optionCheck === item.id}
                                            onChange={() => {
                                                setOptionCheck(item.id)
                                                setShareW(item.title)
                                            }}
                                        />
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <div className={cx('option-footer')}>
                        <div className={cx('option-done')} onClick={() => setCheckOption(false)}>
                            Xong
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default CreateStatus
