import classNames from 'classnames/bind'

import styles from './OnlyHeaderLayout.module.scss'
import Header from '../../components/Header'

const cx = classNames.bind(styles)

interface Props {
    children: any
}

const OnlyHeaderLayout = (props: Props) => {
    const { children } = props
    return (
        <div className={cx('wrapper')}>
            <Header />
            <div className={cx('container')}>{children}</div>
        </div>
    )
}

export default OnlyHeaderLayout
