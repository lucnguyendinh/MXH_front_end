import classNames from 'classnames/bind'
import { Icon } from '@iconify/react'
import styles from './Toast.module.scss'
import { useEffect } from 'react'

interface Props {
    title: any
    msg: String
    toggle: any
}

const cx = classNames.bind(styles)

const Toast = (props: Props) => {
    const { title, msg, toggle } = props
    const type = [
        {
            title: 'Success',
            icon: <Icon style={{ color: '#47d864' }} icon="icon-park-solid:check-one" height={'45px'} width={'45px'} />,
        },
        {
            title: 'Info',
            icon: <Icon style={{ color: '#2f86eb' }} icon="material-symbols:info" height={'45px'} width={'45px'} />,
        },
        {
            title: 'Warning',
            icon: <Icon style={{ color: '#ffc021' }} icon="ion:warning" height={'45px'} width={'45px'} />,
        },
        {
            title: 'Error',
            icon: <Icon style={{ color: '#ff623d' }} icon="material-symbols:error" height={'45px'} width={'45px'} />,
        },
    ]
    const style: any = type.filter((t: any) => t.title === title)

    useEffect(() => {
        setTimeout(() => {
            toggle('')
        }, 4000)
    }, [toggle])

    return (
        <div className={cx('wrapper', title)}>
            <div className={cx('icon')}>{style[0].icon}</div>
            <div className={cx('body')}>
                <h3>{style[0].title}</h3>
                <p className={cx('msg')}>{msg}</p>
            </div>
            <div onClick={() => toggle('')} className={cx('close')}>
                <Icon icon="material-symbols:close" height={'45px'} width={'45px'} />
            </div>
        </div>
    )
}

export default Toast
