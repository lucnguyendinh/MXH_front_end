import classNames from 'classnames/bind'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { registeUser } from '../../../redux/Api/apiRequest'

import styles from './Register.module.scss'
import validateForm from '../../../config/validateForm'
import Toast from '../../Item/Toast'

const cx = classNames.bind(styles)

const Register = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const user = useSelector((state: any) => state.auth.login.currentUser)
    const userRegister = user?.user
    const userLogin = user?.userInfo

    const [email, setEmail] = useState<String>()
    const [sdt, setSdt] = useState<String>()
    const [password, setPassword] = useState<String>()
    const [validate, setValidate] = useState<any>(null)
    const [err, setErr] = useState<any>('')

    useEffect(() => {
        if (userRegister) {
            navigate('/registerN')
        }
        if (userLogin) {
            navigate('/')
        }
    }, [navigate, userRegister, userLogin])

    const handleSubmit = (e: any) => {
        e.preventDefault()
        const validateEmail = validateForm.email(email)
        const validatePhoneNumber = validateForm.phoneNumber(sdt)
        const validatePassword = validateForm.password(password)
        if (validateEmail || validatePhoneNumber || validatePassword) {
            setValidate({
                email: validateEmail,
                phoneNumber: validatePhoneNumber,
                password: validatePassword,
            })
            return
        }
        setValidate({
            email: validateEmail,
            phoneNumber: validatePhoneNumber,
            password: validatePassword,
        })
        const newUser = {
            email,
            sdt,
            password,
        }
        registeUser(newUser, dispatch, navigate, setErr)
    }
    if (userLogin || userRegister) {
        return <div></div>
    }
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <form onSubmit={handleSubmit}>
                    {validate?.email && <p style={{ color: 'red' }}>{validate.email}</p>}
                    <input
                        onChange={(e) => setEmail(e.target.value)}
                        className={cx('input')}
                        type="text"
                        placeholder="Email"
                    />
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
                        placeholder="Mật khẩu"
                    />
                    <button className={cx('register')}>Đăng kí</button>
                    <Link className={cx('login')} to={'/login'}>
                        Đăng nhập
                    </Link>
                </form>
            </div>
            {err && <Toast title={'Error'} msg={err} toggle={setErr} />}
        </div>
    )
}

export default Register
