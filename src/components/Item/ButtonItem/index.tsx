import classNames from 'classnames/bind'
import { Link } from 'react-router-dom'
import noAvt from '../../../public/img/person/non-avt.jpg'

import styles from './ButtonItem.module.scss'

interface Props {
    children: any
    img?: any
    icon?: any
    width: any
    height: any
    to?: any
    className?: any
    toChildren?: any
    closeTab?: any
    onClick?: any
}

const cx = classNames.bind(styles)

const ButtonItem = (props: Props) => {
    const { children, img, icon, width, height, to, className, toChildren, closeTab, onClick } = props

    if (to) {
        return (
            <Link onClick={onClick} to={`/profile/${to}`}>
                <div className={cx('wrapper', className)} style={{ width, height }}>
                    <span>
                        <div className={cx('img')}>
                            <img src={img || noAvt} alt="avt" />
                        </div>
                        <div className={cx('text')}>{children}</div>
                    </span>
                </div>
            </Link>
        )
    } else {
        return (
            <div onClick={onClick} className={cx('wrapper', className)} style={{ width, height }}>
                <span>
                    {!icon ? (
                        <Link to={`/profile/${toChildren}`} onClick={closeTab}>
                            <div className={cx('img')}>
                                <img src={img || noAvt} alt="avt" />
                            </div>
                        </Link>
                    ) : (
                        <div className={cx('img')}>{icon}</div>
                    )}
                    <div className={cx('text')}>{children}</div>
                </span>
            </div>
        )
    }
}

export default ButtonItem
