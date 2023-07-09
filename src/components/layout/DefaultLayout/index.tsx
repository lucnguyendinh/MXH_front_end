import classNames from 'classnames/bind'

import Header from '../../components/Header'
import SidebarL from '../../components/SidebarL'
import SidebarR from '../../components/SidebarR'
import styles from './DefaultLayout.module.scss'
import { useState } from 'react'

interface Props {
    children: any
}

const cx = classNames.bind(styles)

const DefaultLayout = (props: Props) => {
    const { children } = props
    const [option, setOption] = useState(false)
    return (
        <div
            className={cx('wrapper')}
            onClick={() => {
                if (option) setOption(!option)
            }}
        >
            <Header setOption={setOption} option={option} />
            <div className={cx('container')}>
                <div
                    onClick={(e) => e.stopPropagation()}
                    className={cx('side-bar-l', {
                        'open-side': option,
                    })}
                >
                    <SidebarL />
                </div>
                <div className={cx('content')}>{children}</div>
                <div className={cx('side-bar-r')}>
                    <SidebarR />
                </div>
            </div>
        </div>
    )
}

export default DefaultLayout
