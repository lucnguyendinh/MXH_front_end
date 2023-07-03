import classNames from 'classnames/bind'

import styles from './Friends.module.scss'
import ButtonItem from '../../Item/ButtonItem'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import FriendsSkeleton from '../../skeleton/Friends'
import { useSelector } from 'react-redux'

const cx = classNames.bind(styles)

const Friends = () => {
    const user = useSelector((state: any) => state.auth.login.currentUser)
    const idUserInfo = user?.userInfo._id
    const following = user?.userInfo.follow.following
    const [users, setUsers] = useState<any>([])
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        const getAllUser = async () => {
            try {
                const idUser = [...following, idUserInfo]
                setLoading(true)
                const res = await axios.get(`/auth/alluser`)
                const rcmFriend = res.data.filter((itemA: any) => !idUser.some((itemB) => itemB === itemA._id))
                setUsers(rcmFriend)
                setLoading(false)
            } catch (err) {
                console.log(err)
            }
        }
        getAllUser()
    }, [following, idUserInfo])
    return (
        <>
            {loading ? (
                <FriendsSkeleton />
            ) : (
                <div className={cx('wrapper')}>
                    {users.map((u: any, i: any) => {
                        return (
                            <ButtonItem
                                key={i}
                                className={cx('item-user')}
                                img={u?.avtImg?.url}
                                width={'100%'}
                                height={'55px'}
                                toChildren={u?._id}
                            >
                                <div className={cx('children')}>
                                    <Link to={`/profile/${u?._id}`}>
                                        <p className={cx('name')}>{u?.fullName}</p>
                                    </Link>
                                    <div className={cx('btn-follow')}>Follow</div>
                                </div>
                            </ButtonItem>
                        )
                    })}
                </div>
            )}
        </>
    )
}

export default Friends
