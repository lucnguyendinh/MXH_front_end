import classNames from 'classnames/bind'
import { Icon } from '@iconify/react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useLocation, Link } from 'react-router-dom'

import ButtonHome from '../../Item/ButtonAction'
import styles from './Header.module.scss'
import { logOutUser } from '../../../redux/Api/apiRequest'

interface Props {
    setOption?: any
    option?: Boolean
}
interface Icons {
    icon: any
    stt: number
    to: string
}

const cx = classNames.bind(styles)

const Header = (props: Props) => {
    const { setOption, option } = props
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
            <Link className={cx('logo')} to="/">
                <Icon className={cx('icon')} icon="emojione-monotone:letter-l" />
            </Link>
            <div className={cx('action')}>
                <div
                    onClick={() => {
                        if (setOption) setOption(!option)
                    }}
                    className={cx('option')}
                >
                    <ButtonHome className={cx('element')}>
                        {<Icon icon="mdi:hamburger-menu" width="35" height="35" />}
                    </ButtonHome>
                </div>
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
                    <h4>Đăng xuất</h4>
                </div>
            </div>
        </div>
    )
}

export default Header
