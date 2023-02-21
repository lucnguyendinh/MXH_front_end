import classNames from 'classnames/bind'
import { Icon } from '@iconify/react'

import styles from './SidebarR.module.scss'
import ButtonItem from '../../Item/ButtonItem'

const cx = classNames.bind(styles)

const Sidebar = () => {
    const items = [
        {
            icon: <Icon icon="icon-park:avatar" />,
            text: 'Ngo Thi Thu Ha',
        },
        {
            icon: <Icon icon="icon-park:avatar" />,
            text: 'Ngo Thi Thu Cun',
        },
        {
            icon: <Icon icon="icon-park:avatar" />,
            text: 'Ngo Thi Thu Chui',
        },
        {
            icon: <Icon icon="icon-park:avatar" />,
            text: 'Ngo Thi  Chu Chun',
        },
    ]

    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <p>Nguoi lien he</p>
                <div className={cx('h-footer')}>
                    <Icon
                        className={cx('h-icon')}
                        icon="material-symbols:video-call-rounded"
                    />
                    <Icon className={cx('h-icon')} icon="ic:baseline-search" />
                    <Icon
                        className={cx('h-icon')}
                        icon="iwwa:option-horizontal"
                    />
                </div>
            </div>
            <div className={cx('body')}>
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
        </div>
    )
}

export default Sidebar
