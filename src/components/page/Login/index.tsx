import classNames from 'classnames/bind'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

import { loginUser } from '../../../redux/Api/apiRequest'
import styles from './Login.module.scss'
import validateForm from '../../../config/validateForm'

const cx = classNames.bind(styles)

const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const user = useSelector((state: any) => state.auth.login.currentUser)

    const [sdt, setSdt] = useState<String>('')
    const [password, setPassword] = useState<String>('')
    const [err, setErr] = useState<any>('')
    const [validate, setValidate] = useState<any>(null)

    const userRegister = user?.user
    const userLogin = user?.userInfo

    useEffect(() => {
        if (userRegister) {
            navigate('/registerN')
        }
        if (userLogin) {
            navigate('/')
        }
    }, [navigate, userLogin, userRegister])

    const handleSubmit = (e: any) => {
        e.preventDefault()
        const validatePhoneNumber = validateForm.phoneNumber(sdt)
        const validatePassword = validateForm.password(password)
        if (validatePhoneNumber || validatePassword) {
            setValidate({
                phoneNumber: validatePhoneNumber,
                password: validatePassword,
            })
            return
        }
        setValidate({
            phoneNumber: validatePhoneNumber,
            password: validatePassword,
        })
        const newUser = {
            sdt,
            password,
        }

        loginUser(newUser, dispatch, navigate, setErr)
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <form onSubmit={handleSubmit}>
                    {validate?.phoneNumber && <p style={{ color: 'red' }}>{validate.phoneNumber}</p>}
                    <input
                        onChange={(e) => setSdt(e.target.value)}
                        className={cx('input')}
                        type="text"
                        placeholder="Số điện thoại"
                    />
                    {validate?.password && <p style={{ color: 'red' }}>{validate.password}</p>}
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
            {err && <h1>{err}</h1>}
        </div>
    )
}

export default Login
