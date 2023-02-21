import classNames from 'classnames/bind'

import styles from './ButtonItem.module.scss'

interface Props {
    children: any
    img: any
    width: any
    height: any
}

const cx = classNames.bind(styles)

const ButtonItem = (props: Props) => {
    const { children, img, width, height } = props

    return (
        <div className={cx('wrapper')} style={{ width, height }}>
            <span>
                <div className={cx('img')}>{img}</div>
                <div className={cx('text')}>{children}</div>
            </span>
        </div>
    )
}

export default ButtonItem
