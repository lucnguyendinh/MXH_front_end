import { useRef, useEffect } from 'react'

interface Props {
    url: any
}

const Video = (props: Props) => {
    const { url } = props
    const videoRef = useRef<any>(null)
    useEffect(() => {
        const handleScroll = () => {
            const videoElement = videoRef.current
            if (!videoElement) return

            const videoPosition = videoElement.getBoundingClientRect()
            const isVisible = videoPosition.top >= 0 && videoPosition.bottom <= window.innerHeight

            if (isVisible) {
                videoElement.play()
            } else {
                videoElement.pause()
            }
        }

        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])
    return <video style={{ width: '100%' }} ref={videoRef} src={url} muted={true} controls loop />
}

export default Video
