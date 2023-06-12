import classNames from 'classnames/bind'
import { Icon } from '@iconify/react'

import styles from './Follow.module.scss'
import ButtonItem from '../ButtonItem'
import { Link } from 'react-router-dom'

interface Props {
    title: any
    option?: any
    setFollowers?: any
    setFollowing?: any
    followers?: any
}

const cx = classNames.bind(styles)

const Follow = (props: Props) => {
    const { title, option, setFollowers, setFollowing, followers } = props
    const closeTab = () => {
        if (setFollowers) setFollowers(false)
        if (setFollowing) setFollowing(false)
    }
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('header')}>
                    <h3>{title}</h3>
                    <Icon className={cx('close')} onClick={closeTab} icon="mdi:close" />
                </div>
                <div className={cx('user-follow')}>
                    {followers.map((f: any, i: any) => {
                        return (
                            <div key={i}>
                                <ButtonItem
                                    className={cx('item-user')}
                                    img={f.avtImg.url}
                                    width={'100%'}
                                    height={'55px'}
                                    //to={f._id}
                                    toChildren={f._id}
                                    closeTab={closeTab}
                                >
                                    <Link to={`/profile/${f._id}`} onClick={closeTab}>
                                        <p className={cx('name')}>{f.fullName}</p>
                                    </Link>
                                    {option && (
                                        <div onClick={() => option.handle(f._id)} className={cx('btn-delete')}>
                                            {option.title}
                                        </div>
                                    )}
                                </ButtonItem>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default Follow
