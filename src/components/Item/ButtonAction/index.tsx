import classNames from 'classnames/bind'
import { Link } from 'react-router-dom'

import styles from './ButtonHome.module.scss'

interface Props {
    children: any
    className?: any
    onClick?: any
    style?: any
    key?: number
    to?: any
}

const cx = classNames.bind(styles)

const ButtonHome = (props: Props) => {
    const { children, className, onClick, style, to } = props

    return (
        <Link to={to}>
            <div
                className={cx('wrapper', {
                    [className]: true,
                })}
                onClick={onClick}
                style={style}
            >
                <span>{children}</span>
            </div>
        </Link>
    )
}

export default ButtonHome
