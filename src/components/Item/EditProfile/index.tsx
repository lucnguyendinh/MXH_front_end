import classNames from 'classnames/bind'
import { useRef, useState } from 'react'

import config from '../../../config'
import styles from './EditProfile.module.scss'
import noAvt from '../../../public/img/person/non-avt.jpg'
import noCoverImg from '../../../public/img/cover/cover-img.png'
import axios from 'axios'

const cx = classNames.bind(styles)

interface Props {
    setEditProfileCheck: any
    userInfo: any
}

const EditProfile = (props: Props) => {
    const { setEditProfileCheck, userInfo } = props
    const [linkAvt, setLinkAvt] = useState<any>(userInfo?.avtImg?.url)
    const [linkCover, setLinkCover] = useState<any>(userInfo?.coverImg?.url)
    const [fullName, setFullName] = useState<any>(userInfo?.fullName)
    const [favorites, setFavorites] = useState<any>(userInfo?.favorites)
    const [otherOf, setOtherOf] = useState<any>(userInfo?.otherOf)
    const inputFileAvt = useRef<any>(null)
    const inputFileCover = useRef<any>(null)

    const handleClick = async () => {
        try {
            const newP = {
                idUser: userInfo._id,
                avtImg: linkAvt,
                coverImg: linkCover,
                fullName,
                favorites,
                otherOf,
            }
            await axios.put('/profile/edit', newP)

            setEditProfileCheck(false)
        } catch (err) {
            console.log(err)
        }
    }

    const handleImageAvt = async (e: any) => {
        const file = e.target.files[0]
        config.setFileToBase(file, setLinkAvt)
    }

    const handleImageCover = async (e: any) => {
        const file = e.target.files[0]
        config.setFileToBase(file, setLinkCover)
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <h3 className={cx('h-edit')}>Chỉnh sửa trang cá nhân</h3>
                <h4 className={cx('huy')} onClick={() => setEditProfileCheck(false)}>
                    Huỷ
                </h4>
            </div>
            <div className={cx('container')}>
                <div className={cx('edit-avt')}>
                    <div className={cx('h-avt')}>
                        <h2>Ảnh đại diện</h2>
                        <p onClick={() => inputFileAvt.current.click()}>chỉnh sửa</p>
                        <input
                            type="file"
                            id="file"
                            ref={inputFileAvt}
                            style={{ display: 'none' }}
                            onChange={handleImageAvt}
                        />
                    </div>
                    <div className={cx('img')}>
                        <img src={linkAvt || noAvt} alt="" />
                    </div>
                </div>
                <div className={cx('edit-cover')}>
                    <div className={cx('h-cover')}>
                        <h2>Ảnh bìa</h2>
                        <p onClick={() => inputFileCover.current.click()}>chỉnh sửa</p>
                        <input
                            type="file"
                            id="file"
                            ref={inputFileCover}
                            style={{ display: 'none' }}
                            onChange={handleImageCover}
                        />
                    </div>
                    <div className={cx('img')}>
                        <img src={linkCover || noCoverImg} alt="" />
                    </div>
                </div>
                <div className={cx('edit-name')}>
                    <h2>Name</h2>
                    <div className="name">
                        <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} />
                    </div>
                </div>
                <div className={cx('edit-favorites')}>
                    <h2>Sở thích</h2>
                    <div className="favorites">
                        <textarea value={favorites} onChange={(e) => setFavorites(e.target.value)}></textarea>
                    </div>
                </div>
                <div className={cx('edit-other')}>
                    <h2>Tiểu sử</h2>
                    <div className="other">
                        <textarea value={otherOf} onChange={(e) => setOtherOf(e.target.value)}></textarea>
                    </div>
                </div>
            </div>
            <div className={cx('footer')} onClick={handleClick}>
                <p>Chỉnh sửa</p>
            </div>
        </div>
    )
}

export default EditProfile
