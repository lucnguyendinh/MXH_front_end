import classNames from 'classnames/bind'

import styles from './SendMail.module.scss'
import axios from 'axios'
import { useState } from 'react'

const cx = classNames.bind(styles)

const Login = () => {
    const [success, setSuccess] = useState(false)
    const handleSendMail1 = async () => {
        try {
            await axios.post(`mail/sendMail`)
            setSuccess(true)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className={cx('wrapper')}>
            <div onClick={handleSendMail1} className={cx('send-mail-1')}>
                Gửi mail số 1
            </div>
            {success && <div>Thành công</div>}
        </div>
    )
}

export default Login
