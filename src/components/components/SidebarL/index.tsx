import classNames from 'classnames/bind'
import { Icon } from '@iconify/react'

import styles from './SidebarL.module.scss'
import ButtonItem from '../../Item/ButtonItem'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import Error from '../Error'
import Toast from '../../Item/Toast'

const cx = classNames.bind(styles)

const SidebarL = () => {
    const [error, setError] = useState(false)
    const user = useSelector((state: any) => state.auth.login.currentUser)
    const list: any = [
        {
            icon: <Icon icon="fa-solid:user-friends" className={cx('icon')} />,
            title: 'Bạn bè ( đề xuất )',
            to: '/friends',
        },
        {
            icon: <Icon icon="jam:screen-f" className={cx('icon')} />,
            title: 'Watch',
            to: '/watch',
        },
        {
            icon: <Icon icon="fluent:feed-24-regular" className={cx('icon')} />,
            title: 'Bảng feed (Gần đây nhất)',
            to: '/newfeed',
        },
        {
            icon: <Icon icon="el:group" className={cx('icon')} />,
            title: 'Nhóm',
        },
        {
            icon: <Icon icon="healthicons:market-stall" className={cx('icon')} />,
            title: 'Marketplace',
        },
    ]

    return (
        <>
            <div className={cx('wrapper')}>
                <ButtonItem img={user?.userInfo?.avtImg?.url} width={'100%'} height={'50px'} to={user?.userInfo?._id}>
                    {user?.userInfo?.fullName}
                </ButtonItem>
                {list.map((l: any, i: any) => {
                    if (l.to) {
                        return (
                            <Link key={i} to={l.to}>
                                <ButtonItem icon={l.icon} width={'100%'} height={'55px'}>
                                    {l.title}
                                </ButtonItem>
                            </Link>
                        )
                    }
                    return (
                        <ButtonItem onClick={() => setError(true)} key={i} icon={l.icon} width={'100%'} height={'55px'}>
                            {l.title}
                        </ButtonItem>
                    )
                })}
            </div>
            {error && (
                <Toast
                    title={'Warning'}
                    msg={'Chức năng hiện đang được cập nhật, vui lòng thử lại sau'}
                    toggle={setError}
                />
            )}
        </>
    )
}

export default SidebarL
