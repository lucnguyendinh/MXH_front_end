import classNames from 'classnames/bind'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { logOutUser, registerN } from '../../../redux/Api/apiRequest'
import styles from './RegisterN.module.scss'
import validateForm from '../../../config/validateForm'

const cx = classNames.bind(styles)

const RegisterN = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const user = useSelector((state: any) => state.auth.login.currentUser)
    const userLogin = user?.userInfo
    const idUser = user?.user?._id
    const accessToken = user?.accessToken

    const [name, setName] = useState<String>('')
    const [favorites, setFavorites] = useState<String>('')
    const [other, setOther] = useState<String>('')
    const [gt, setGt] = useState<String>('')
    const [validate, setValidate] = useState<any>(null)
    const sexs = ['nam', 'nữ']

    useEffect(() => {
        if (userLogin) {
            navigate('/')
        }
        if (!idUser) {
            navigate('/register')
        }
    }, [idUser, userLogin])

    const handleSubmit = (e: any) => {
        e.preventDefault()
        const validateName = validateForm.other(name)
        const validateFavorites = validateForm.other(favorites)
        const validateOther = validateForm.other(other)
        const validateGt = validateForm.other(gt)

        if (validateName || validateFavorites || validateOther || validateGt) {
            setValidate({
                name: validateName,
                favorites: validateFavorites,
                other: validateOther,
                gt: validateGt,
            })
            return
        }
        const infoUser = {
            fullName: name,
            favorites,
            otherOf: other,
            sex: gt,
            idUser,
        }
        registerN(infoUser, dispatch, navigate)
    }
    const handleClick = () => {
        logOutUser(dispatch, navigate, idUser, accessToken)
    }
    if (userLogin || !idUser) {
        return <div></div>
    }
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <form onSubmit={handleSubmit}>
                    {validate?.name && <p style={{ color: 'red' }}>{validate.name}</p>}
                    <input
                        onChange={(e) => setName(e.target.value)}
                        className={cx('input')}
                        type="text"
                        placeholder="Họ và tên"
                    />
                    {validate?.favorites && <p style={{ color: 'red' }}>{validate.favorites}</p>}

                    <input
                        onChange={(e) => setFavorites(e.target.value)}
                        className={cx('input')}
                        type="text"
                        placeholder="Sở thích"
                    />
                    {validate?.other && <p style={{ color: 'red' }}>{validate.other}</p>}
                    <input
                        onChange={(e) => setOther(e.target.value)}
                        className={cx('input')}
                        type="text"
                        placeholder="Khác"
                    />
                    {validate?.gt && <p style={{ color: 'red' }}>{validate.gt}</p>}

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
