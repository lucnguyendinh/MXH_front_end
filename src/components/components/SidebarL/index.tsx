import classNames from 'classnames/bind'
import { Icon } from '@iconify/react'

import styles from './SidebarL.module.scss'
import ButtonItem from '../../Item/ButtonItem'

const cx = classNames.bind(styles)

const SidebarL = () => {
    const items = [
        {
            icon: (
                <Icon
                    icon="material-symbols:account-circle"
                    width="40"
                    height="40"
                />
            ),
            text: 'Nguyen Dinh Luc',
        },
        {
            icon: <Icon icon="fa-solid:user-friends" width="40" height="40" />,
            text: 'Bạn bè',
        },
        {
            icon: <Icon icon="ic:round-watch-later" width="40" height="40" />,
            text: 'Gần Đây',
        },
    ]

    return (
        <div className={cx('wrapper')}>
            {items.map((item, i) => {
                return (
                    <div key={i}>
                        <ButtonItem
                            img={item.icon}
                            width={'100%'}
                            height={'50px'}
                        >
                            {item.text}
                        </ButtonItem>
                    </div>
                )
            })}
        </div>
    )
}

export default SidebarL
