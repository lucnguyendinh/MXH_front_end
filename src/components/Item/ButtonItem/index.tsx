import classNames from 'classnames/bind'
import { Link } from 'react-router-dom'
import noAvt from '../../../public/img/person/non-avt.jpg'

import styles from './ButtonItem.module.scss'

interface Props {
    children: any
    img: any
    width: any
    height: any
    to?: any
}

const cx = classNames.bind(styles)

const ButtonItem = (props: Props) => {
    const { children, img, width, height, to } = props

    return (
        <Link to={`/profile/${to}`}>
            <div className={cx('wrapper')} style={{ width, height }}>
                <span>
                    <div className={cx('img')}>
                        <img src={img || noAvt} alt="avt" />
                    </div>
                    <div className={cx('text')}>{children}</div>
                </span>
            </div>
        </Link>
    )
}

export default ButtonItem
