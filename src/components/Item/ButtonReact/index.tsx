import classNames from 'classnames/bind'

import styles from './ButtonReact.module.scss'

const cx = classNames.bind(styles)

interface Props {
    children: any
    className?: any
    onClick?: any
}

const ButtonReact = (props: Props) => {
    const { children, className, onClick } = props

    return (
        <div onClick={onClick} className={cx('wrapper', className)}>
            <span>{children}</span>
        </div>
    )
}

export default ButtonReact
