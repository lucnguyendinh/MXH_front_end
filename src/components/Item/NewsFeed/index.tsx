import classNames from 'classnames/bind'
import ButtonReact from '../ButtonReact'

import styles from './NewsFeed.module.scss'

const cx = classNames.bind(styles)

interface Props {
    setNewsFeed: any
}

const NewsFeed = (props: Props) => {
    const { setNewsFeed } = props

    const handleClick = () => {
        setNewsFeed(true)
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <div className={cx('img')}>
                    <img src="" alt="" />
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
