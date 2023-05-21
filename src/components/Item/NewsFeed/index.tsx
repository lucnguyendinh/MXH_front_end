import classNames from 'classnames/bind'
import { useSelector } from 'react-redux'

import ButtonReact from '../ButtonReact'
import styles from './NewsFeed.module.scss'
import noAvt from '../../../public/img/person/non-avt.jpg'

const cx = classNames.bind(styles)

interface Props {
    setNewsFeed: any
}

const NewsFeed = (props: Props) => {
    const { setNewsFeed } = props
    const user = useSelector((state: any) => state.auth.login.currentUser)
    const handleClick = () => {
        setNewsFeed(true)
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <div className={cx('img')}>
                    <img src={user?.userInfo?.avtImg?.url || noAvt} alt="" />
                </div>
                <div className={cx('input')} onClick={handleClick}>
                    <p>Bạn đang nghĩ gì thế ?</p>
                </div>
            </div>
            <div className={cx('footer')}>
                <ButtonReact className={cx('btn')} onClick={handleClick}>
                    Video trực tiếp
                </ButtonReact>
                <ButtonReact className={cx('btn')} onClick={handleClick}>
                    Ảnh / video
                </ButtonReact>
                <ButtonReact className={cx('btn')} onClick={handleClick}>
                    Cảm xúc, hoạt động
                </ButtonReact>
            </div>
        </div>
    )
}

export default NewsFeed
