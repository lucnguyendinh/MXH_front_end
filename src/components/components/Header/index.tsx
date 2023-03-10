import classNames from 'classnames/bind'
import { Icon } from '@iconify/react'
import { useDispatch, useSelector } from 'react-redux'

import ButtonHome from '../../Item/ButtonAction'
import styles from './Header.module.scss'
import { updateStt } from '../../../redux/Slice/otherSlice'
import { useNavigate } from 'react-router-dom'
import { logOutUser } from '../../../redux/Api/apiRequest'
import { useEffect } from 'react'

interface Icons {
    icon: any
    stt: number
    to: string
}

const cx = classNames.bind(styles)

const Header = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const user = useSelector((state: any) => state.auth.login.currentUser)

    const Rstt = useSelector((state: any) => state.other.stt)

    const id = user?.userInfo?._id

    const accessToken = useSelector(
        (state: any) => state.auth.login.currentUser?.accessToken,
    )

    const icons: Icons[] = [
        {
            icon: (
                <Icon
                    className={cx('home-ic')}
                    icon="ci:home-alt-fill"
                    width="40"
                    height="40"
                />
            ),
            stt: 1,
            to: '/',
        },
        {
            icon: (
                <Icon
                    className={cx('home-ic')}
                    icon="mdi:facebook-messenger"
                    width="40"
                    height="40"
                />
            ),
            stt: 2,
            to: '/messenger',
        },
        {
            icon: (
                <Icon
                    className={cx('home-ic')}
                    icon="mdi:bell-notification"
                    width="40"
                    height="40"
                />
            ),
            stt: 3,
            to: '/notifications',
        },
    ]

    const handleClick = () => {
        logOutUser(dispatch, navigate, id, accessToken)
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('logo')}>
                <h1>Logo</h1>
            </div>
            <div className={cx('action')}>
                {icons.map((icon: Icons) => {
                    return (
                        <div key={icon.stt}>
                            <ButtonHome
                                to={icon.to}
                                className={cx('element', {
                                    active: Rstt === icon.stt,
                                    'no-active': Rstt !== icon.stt,
                                })}
                                onClick={() => {
                                    const stt = icon.stt
                                    dispatch(updateStt({ stt }))
                                }}
                            >
                                {icon.icon}
                            </ButtonHome>
                        </div>
                    )
                })}
            </div>
            <div className={cx('end')}>
                <div className={cx('element-user')} onClick={handleClick}>
                    user
                </div>
            </div>
        </div>
    )
}

export default Header
