import classNames from 'classnames/bind'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { registeUser } from '../../../redux/Api/apiRequest'

import styles from './Register.module.scss'

const cx = classNames.bind(styles)

const Register = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const user = useSelector((state: any) => state.auth.login.currentUser)

    const userRegister = user?.user
    const userLogin = user?.userInfo

    useEffect(() => {
        if (userRegister) {
            navigate('/registerN')
        }
        if (userLogin) {
            navigate('/')
        }
    }, [])

    const [email, setEmail] = useState<String>()
    const [sdt, setSdt] = useState<String>()
    const [password, setPassword] = useState<String>()

    const handleSubmit = (e: any) => {
        e.preventDefault()
        const newUser = {
            email,
            sdt,
            password,
        }
        registeUser(newUser, dispatch, navigate)
    }
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <form onSubmit={handleSubmit}>
                    <input
                        onChange={(e) => setEmail(e.target.value)}
                        className={cx('input')}
                        type="text"
                        placeholder="Email"
                    />
                    <input
                        onChange={(e) => setSdt(e.target.value)}
                        className={cx('input')}
                        type="text"
                        placeholder="Số điện thoại"
                    />
                    <input
                        onChange={(e) => setPassword(e.target.value)}
                        className={cx('input')}
                        type="text"
                        placeholder="Mật khẩu"
                    />
                    <button className={cx('register')}>Đăng kí</button>
                    <Link className={cx('login')} to={'/login'}>
                        Đăng nhập
                    </Link>
                </form>
            </div>
        </div>
    )
}

export default Register
