import classNames from 'classnames/bind'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

import { loginUser } from '../../../redux/Api/apiRequest'
import styles from './Login.module.scss'

const cx = classNames.bind(styles)

const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const user = useSelector((state: any) => state.auth.login.currentUser)

    const [sdt, setSdt] = useState<String>()
    const [password, setPassword] = useState<String>()

    const userRegister = user?.user
    const userLogin = user?.userInfo

    const handleSubmit = (e: any) => {
        e.preventDefault()
        const newUser = {
            sdt,
            password,
        }
        loginUser(newUser, dispatch, navigate)
    }

    useEffect(() => {
        if (userRegister) {
            navigate('/registerN')
        }
        if (userLogin) {
            navigate('/')
        }
    }, [])

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <form onSubmit={handleSubmit}>
                    <input
                        onChange={(e) => setSdt(e.target.value)}
                        className={cx('input')}
                        type="text"
                        placeholder="Email hoặc số điện thoại"
                    />
                    <input
                        onChange={(e) => setPassword(e.target.value)}
                        className={cx('input')}
                        type="password"
                        placeholder="Mật Khẩu"
                    />
                    <button className={cx('login')}>Đăng Nhập</button>
                    <Link className={cx('register')} to={'/register'}>
                        Tạo tài khoản mới
                    </Link>
                </form>
            </div>
        </div>
    )
}

export default Login
