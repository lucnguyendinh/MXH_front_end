import classNames from 'classnames/bind'
import { Icon } from '@iconify/react'

import styles from './SidebarR.module.scss'
import ButtonItem from '../../Item/ButtonItem'
import { useEffect, useState } from 'react'
import axios from 'axios'

const cx = classNames.bind(styles)

const Sidebar = () => {
    const [users, setUsers] = useState<any>(null)

    useEffect(() => {
        const getAllUser = async () => {
            try {
                const res = await axios.get('/auth/alluser')
                setUsers(res.data)
            } catch (err) {
                console.log(err)
            }
        }
        getAllUser()
    }, [])

    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <p>Người liên hệ</p>
                <div className={cx('h-footer')}>
                    <Icon className={cx('h-icon')} icon="material-symbols:video-call-rounded" />
                    <Icon className={cx('h-icon')} icon="ic:baseline-search" />
                    <Icon className={cx('h-icon')} icon="iwwa:option-horizontal" />
                </div>
            </div>
            <div className={cx('body')}>
                {users?.map((u: any, i: any) => {
                    return (
                        <div key={i}>
                            <ButtonItem img={u.avtImg?.url} width={'100%'} height={'50px'} to={u._id}>
                                {u?.fullName}
                            </ButtonItem>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Sidebar
