import classNames from 'classnames/bind'
import { Icon } from '@iconify/react'

import styles from './Error.module.scss'
import { useEffect, useState } from 'react'

const cx = classNames.bind(styles)

const Error = (props: any) => {
    const { setError } = props
    const [time, setTime] = useState(3)
    useEffect(() => {
        const timerId = setInterval(() => {
            setTime((pre) => pre - 1)
        }, 1000)
        return () => clearInterval(timerId)
    }, [])
    useEffect(() => {
        const timeout = setTimeout(() => {
            setError(false)
        }, 3000)
        return () => clearTimeout(timeout)
    }, [])
    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                <div className={cx('header')}>
                    <h3>Thông báo !!! ({time})</h3>
                    <Icon onClick={() => setError(false)} className={cx('icon')} icon="mdi:close" />
                </div>
                <div className={cx('title')}>
                    <p>Chức năng hiện đang được cập nhật, vui lòng thử lại sau</p>
                </div>
            </div>
        </div>
    )
}

export default Error
