import classNames from 'classnames/bind'

import Header from '../../components/Header'
import SidebarL from '../../components/SidebarL'
import styles from './HeaderAndSideBarL.module.scss'
import { useState } from 'react'

interface Props {
    children: any
}

const cx = classNames.bind(styles)

const HeaderAndSideBarL = (props: Props) => {
    const { children } = props
    const [option, setOption] = useState(false)

    return (
        <div
            onClick={() => {
                if (option) setOption(!option)
            }}
            className={cx('wrapper')}
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
            </div>
        </div>
    )
}

export default HeaderAndSideBarL
