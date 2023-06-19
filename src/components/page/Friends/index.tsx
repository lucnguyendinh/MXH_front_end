import classNames from 'classnames/bind'

import styles from './Friends.module.scss'
import ButtonItem from '../../Item/ButtonItem'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import FriendsSkeleton from '../../skeleton/Friends'

const cx = classNames.bind(styles)

const Friends = () => {
    const [users, setUsers] = useState<any>([])
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        const getAllUser = async () => {
            try {
                setLoading(true)
                const res = await axios.get(`/auth/alluser`)
                setUsers(res.data)
                setLoading(false)
            } catch (err) {
                console.log(err)
            }
        }
        getAllUser()
    }, [])
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
