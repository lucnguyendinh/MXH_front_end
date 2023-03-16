import classNames from 'classnames/bind'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { logOutUser, registerN } from '../../../redux/Api/apiRequest'
import styles from './RegisterN.module.scss'
import config from '../../../config'
import { logOutSuccess } from '../../../redux/Slice/authSlice'

const cx = classNames.bind(styles)

const RegisterN = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const user = useSelector((state: any) => state.auth.login.currentUser)

    const idUser = user?.user?._id
    const accessToken = user?.accessToken

    const [name, setName] = useState<String>()
    const [favorites, setFavorites] = useState<String>()
    const [other, setOther] = useState<String>()
    const [gt, setGt] = useState<String>()
    const sexs = ['nam', 'nữ']

    const handleSubmit = (e: any) => {
        e.preventDefault()
        const infoUser = {
            fullName: name,
            favorites,
            otherOf: other,
            sex: gt,
            idUser,
        }
        registerN(infoUser, dispatch, navigate)
    }

    let axiosJWT = config.createAxios(user, dispatch, logOutSuccess, idUser)
    const handleClick = () => {
        logOutUser(dispatch, navigate, idUser, accessToken, axiosJWT)
    }

    useEffect(() => {
        if (!idUser) {
            navigate('/register')
        }
    }, [])

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <form onSubmit={handleSubmit}>
                    <input
                        onChange={(e) => setName(e.target.value)}
                        className={cx('input')}
                        type="text"
                        placeholder="Họ và tên"
                    />
                    <input
                        onChange={(e) => setFavorites(e.target.value)}
                        className={cx('input')}
                        type="text"
                        placeholder="Sở thích"
                    />
                    <input
                        onChange={(e) => setOther(e.target.value)}
                        className={cx('input')}
                        type="text"
                        placeholder="Khác"
                    />
                    <div className={cx('sex')}>
                        {sexs.map((sex) => {
                            return (
                                <div key={sex}>
                                    <label>{sex}</label>
                                    <input
                                        className={cx('radio')}
                                        checked={gt === sex}
                                        type="radio"
                                        onChange={() => setGt(sex)}
                                    />
                                </div>
                            )
                        })}
                    </div>
                    <button className={cx('continue')}>Tiếp tục</button>
                    <div className={cx('login')} onClick={handleClick}>
                        Thoát
                    </div>
                </form>
            </div>
        </div>
    )
}

export default RegisterN
