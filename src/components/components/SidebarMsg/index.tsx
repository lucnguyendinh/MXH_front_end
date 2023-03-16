import classNames from 'classnames/bind'
import { Icon } from '@iconify/react'

import styles from './SidebarMsg.module.scss'
import MsgItem from '../MsgItem'
import { useState } from 'react'
import { useSelector } from 'react-redux'

const cx = classNames.bind(styles)

interface Props {
    className?: any
    item?: any
    setIdMess?: any
    setIdU?: any
}

const SidebarMsg = (props: Props) => {
    const { className, item, setIdMess, setIdU } = props
    const user = useSelector((state: any) => state.auth.login.currentUser)
    const [idM, setIdM] = useState<any>()

    const handleClick = (i: any) => {
        setIdMess(i._id)
        setIdM(i._id)
        const idFriend = i.members.filter((i: any) => i !== user?.userInfo._id).join('')
        setIdU(idFriend)
    }
    return (
        <div className={cx('wrapper', className)}>
            <div className={cx('header')}>
                <h1>Chat</h1>
                <div className={cx('h-option')}>
                    <div className={cx('icon-option')}>
                        <Icon icon="iwwa:option-horizontal" width="30" height="30" />
                    </div>
                    <div className={cx('icon-option')}>
                        <Icon icon="material-symbols:video-call-rounded" width="30" height="30" />
                    </div>
                    <div className={cx('icon-option')}>
                        <Icon icon="ic:outline-note-add" width="30" height="30" />
                    </div>
                </div>
            </div>
            {/* item */}
            <div className={cx('container')}>
                {item?.map((i: any, index: any) => {
                    return (
                        <MsgItem
                            item={i?.members}
                            currentChat={idM === i._id}
                            key={index}
                            onClick={() => handleClick(i)}
                        />
                    )
                })}
            </div>
        </div>
    )
}

export default SidebarMsg
