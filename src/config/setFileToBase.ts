const setFileToBase = (file: any, setUrl: any) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
        setUrl(reader.result)
    }
}

export default setFileToBase
