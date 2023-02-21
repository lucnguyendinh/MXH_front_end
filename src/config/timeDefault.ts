const timeDefault = (time: number) => {
    let displayTime = ''
    if (time < 60) {
        return (displayTime = 'Vừa xong')
    } else if (time < 3600) {
        return (displayTime = `${Math.floor(time / 60)} phút trước`)
    } else if (time < 86400) {
        return (displayTime = `${Math.floor(time / 60 / 60)} giờ trước`)
    } else if (time < 2592000) {
        return (displayTime = `${Math.floor(time / 60 / 60 / 24)} ngày trước`)
    } else if (time < 77760000) {
        return (displayTime = `${Math.floor(
            time / 60 / 60 / 24 / 30,
        )} tháng trước`)
    } else {
        return (displayTime = `${Math.floor(
            time / 60 / 60 / 24 / 30 / 12,
        )} năm trước trước`)
    }
}

export default timeDefault
