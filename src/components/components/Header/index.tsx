import classNames from 'classnames/bind'
import { Icon } from '@iconify/react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'

import ButtonHome from '../../Item/ButtonAction'
import styles from './Header.module.scss'
import { logOutUser } from '../../../redux/Api/apiRequest'
import noAvt from '../../../public/img/person/non-avt.jpg'

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
    const location = useLocation()
    const idUserInfo = user?.userInfo?._id

    const accessToken = user?.accessToken

    const icons: Icons[] = [
        {
            icon: <Icon className={cx('home-ic')} icon="ci:home-alt-fill" width="35" height="35" />,
            stt: 1,
            to: '/',
        },
        {
            icon: <Icon className={cx('home-ic')} icon="mdi:facebook-messenger" width="35" height="35" />,
            stt: 2,
            to: '/messenger',
        },
        {
            icon: <Icon className={cx('home-ic')} icon="mdi:bell-notification" width="35" height="35" />,
            stt: 3,
            to: '/notifications',
        },
    ]

    const handleClick = () => {
        logOutUser(dispatch, navigate, idUserInfo, accessToken)
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('logo')}>
                <Icon className={cx('icon')} icon="emojione-monotone:letter-l" />
            </div>
            <div className={cx('action')}>
                {icons.map((icon: Icons) => {
                    let stt: Number
                    if (location.pathname.startsWith('/notifications')) {
                        stt = 3
                    } else if (location.pathname.startsWith('/messenger')) {
                        stt = 2
                    } else {
                        stt = 1
                    }
                    return (
                        <div key={icon.stt}>
                            <ButtonHome
                                to={icon.to}
                                className={cx('element', {
                                    active: stt === icon.stt,
                                    'no-active': stt !== icon.stt,
                                })}
                            >
                                {icon.icon}
                            </ButtonHome>
                        </div>
                    )
                })}
            </div>
            <div className={cx('end')}>
                <div className={cx('element-user')} onClick={handleClick}>
                    <img src={user?.userInfo?.avtImg?.url || noAvt} alt="" />
                </div>
            </div>
        </div>
    )
}

export default Header
