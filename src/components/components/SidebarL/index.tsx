import classNames from 'classnames/bind'

import styles from './SidebarL.module.scss'
import ButtonItem from '../../Item/ButtonItem'
import { useSelector } from 'react-redux'

const cx = classNames.bind(styles)

const SidebarL = () => {
    const user = useSelector((state: any) => state.auth.login.currentUser)

    return (
        <div className={cx('wrapper')}>
            <ButtonItem img={user?.userInfo?.avtImg?.url} width={'100%'} height={'50px'} to={user?.userInfo?._id}>
                {user?.userInfo?.fullName}
            </ButtonItem>
        </div>
    )
}

export default SidebarL
