import classNames from 'classnames/bind'
import noAvt from '../../../public/img/person/non-avt.jpg'

import styles from './Sender.module.scss'

const cx = classNames.bind(styles)

interface Props {
    chat?: any
    userChat?: any
}

const Sender = (props: Props) => {
    const { chat, userChat } = props
    return (
        <>
            {!userChat ? (
                <div className={cx('me')}>
                    <div className={cx('text')}>
                        <p>{chat}</p>
                    </div>
                </div>
            ) : (
                <div className={cx('item-mess')}>
                    <div className={cx('avt')}>
                        <img src={userChat?.avtImg?.url ? userChat?.avtImg.url : noAvt} alt="" />
                    </div>
                    <div className={cx('content')}>
                        <div className={cx('name')}>{userChat?.fullName}</div>
                        <div className={cx('text')}>
                            <p>{chat}</p>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Sender
