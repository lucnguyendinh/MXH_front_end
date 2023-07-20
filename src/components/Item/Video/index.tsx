import classNames from 'classnames/bind'
import { useRef, useEffect, useState } from 'react'
import { Icon } from '@iconify/react'

import styles from './Video.module.scss'
import { Link, useNavigate } from 'react-router-dom'

interface Props {
    url: any
    idVideo?: any
    volume?: any
    setVolume?: any
}

const cx = classNames.bind(styles)

const Video = (props: Props) => {
    const { url, idVideo, volume, setVolume } = props
    const videoRef = useRef<any>(null)
    const navigate = useNavigate()
    const [toggle, setToggle] = useState<Boolean>(true)

    const [duration, setDuration] = useState<any>(0)
    const [currentTime, setCurrentTime] = useState<any>(0)
    const [timeNumber, setTimeNumber] = useState<String>('')
    const [currentTimeNumber, setCurrentTimeNumber] = useState<String>('')
    const [dragging, setDragging] = useState<Boolean>(false)
    const [preVolume, setPreVolume] = useState<any>()

    useEffect(() => {
        const handleScroll = () => {
            const videoElement = videoRef.current
            if (!videoElement) return

            const videoPosition = videoElement.getBoundingClientRect()
            const isVisible = videoPosition.top >= 0 && videoPosition.bottom <= window.innerHeight

            if (isVisible) {
                videoElement.play()
                setToggle(false)
            } else {
                videoElement.pause()
                setToggle(true)
            }
        }

        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    function formatTime(seconds: any) {
        const secondsToFix = seconds.toFixed(0)
        const hours = Math.floor(secondsToFix / 3600)
        const minutes = Math.floor((secondsToFix % 3600) / 60)
        const remainingSeconds = secondsToFix % 60

        const formattedHours = String(hours).padStart(2, '0')
        const formattedMinutes = String(minutes).padStart(2, '0')
        const formattedSeconds = String(remainingSeconds).padStart(2, '0')

        if (formattedHours === '00') {
            return `${formattedMinutes}:${formattedSeconds}`
        }

        return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`
    }

    useEffect(() => {
        setTimeNumber(formatTime(duration))
    }, [duration])
    useEffect(() => {
        setCurrentTimeNumber(formatTime(currentTime))
    }, [currentTime])

    const handleToggle = () => {
        if (toggle) {
            videoRef.current.play()
            setToggle(!toggle)
        } else {
            videoRef.current.pause()
            setToggle(!toggle)
        }
    }

    const handleTimeColumnClick = (e: any) => {
        const timeColumnWidth = e.currentTarget.clientWidth
        const clickX = e.nativeEvent.offsetX

        // Tính toán phần trăm dựa vào tọa độ của điểm click trên time-column
        const percentage = clickX / timeColumnWidth

        videoRef.current.currentTime = percentage * duration
    }

    const handleMouseMove = (e: any) => {
        if (!dragging) return

        const timeColumnWidth = e.currentTarget.clientWidth
        const clickX = e.nativeEvent.offsetX

        // Tính toán phần trăm dựa vào tọa độ của điểm click trên time-column
        const percentage = clickX / timeColumnWidth

        videoRef.current.currentTime = percentage * duration
    }

    const handleVolumeColumnClick = (e: any) => {
        const volumeColumnHeight = e.currentTarget.clientHeight
        const clickY = e.nativeEvent.offsetY

        // Tính toán phần trăm dựa vào tọa độ của điểm click trên time-column
        const percentage = clickY / volumeColumnHeight

        setPreVolume(percentage)
        setVolume(percentage)
        videoRef.current.volume = percentage
    }

    const handleFullscreenClick = () => {
        if (videoRef.current.requestFullscreen) {
            videoRef.current.requestFullscreen()
        } else if (videoRef.current.mozRequestFullScreen) {
            videoRef.current.mozRequestFullScreen()
        } else if (videoRef.current.webkitRequestFullscreen) {
            videoRef.current.webkitRequestFullscreen()
        } else if (videoRef.current.msRequestFullscreen) {
            videoRef.current.msRequestFullscreen()
        }
    }

    return (
        <div
            onClick={() => {
                if (toggle) {
                    videoRef.current.play()
                    setToggle(!toggle)
                } else if (idVideo) {
                    navigate('/status/' + idVideo)
                } else {
                    handleFullscreenClick()
                }
            }}
            className={cx('wrapper')}
        >
            <video
                onLoadedMetadata={() => setDuration(videoRef.current.duration)}
                onTimeUpdate={() => setCurrentTime(videoRef.current.currentTime)}
                className={cx('video')}
                ref={videoRef}
                src={url}
                muted={!volume}
                loop
                playsInline
            />
            <div
                onClick={(e) => e.stopPropagation()}
                className={cx('controls', {
                    'toggle-off': toggle,
                })}
            >
                <div className={cx('toggle')} onClick={handleToggle}>
                    {toggle ? (
                        <Icon className={cx('icon')} icon="fluent:play-16-filled" />
                    ) : (
                        <Icon className={cx('icon')} icon="material-symbols:pause" />
                    )}
                </div>
                <div className={cx('time-number')}>
                    {currentTimeNumber} / {timeNumber}
                </div>
                <div
                    onClick={handleTimeColumnClick}
                    onMouseDown={() => setDragging(true)}
                    onMouseMove={handleMouseMove}
                    onMouseUp={() => setDragging(false)}
                    className={cx('time-column')}
                >
                    <div className={cx('time-now')} style={{ width: `${(currentTime / duration) * 100}%` }}></div>
                </div>
                {idVideo ? (
                    <Link to={`/status/${idVideo}`}>
                        <div className={cx('enlarge')}>
                            <Icon className={cx('icon')} icon="icomoon-free:enlarge2" />
                        </div>
                    </Link>
                ) : (
                    <div className={cx('enlarge')} onClick={handleFullscreenClick}>
                        <Icon className={cx('icon')} icon="icomoon-free:enlarge2" />
                    </div>
                )}
                <div className={cx('volume')}>
                    {volume ? (
                        <Icon onClick={() => setVolume(0)} className={cx('icon')} icon="lucide:volume-2" />
                    ) : (
                        <Icon onClick={() => setVolume(preVolume || 1)} className={cx('icon')} icon="lucide:volume-x" />
                    )}
                    <div className={cx('level')} onClick={handleVolumeColumnClick}>
                        <div
                            style={{ height: `${volume * 100}%` }}
                            className={cx('level-now', {
                                position: volume,
                            })}
                        ></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Video
