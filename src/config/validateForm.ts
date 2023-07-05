const validateForm = {
    email: (email: any) => {
        let err: String
        const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (email === '') return (err = 'Không để trống ô này!')
        else if (!email_pattern.test(email)) return (err = 'Vui lòng nhập đúng email!')
    },
    phoneNumber: (phoneNumber: any) => {
        let err: String
        const phoneNumber_pattern = /^\d{10}$/
        if (phoneNumber === '') return (err = 'Không để trống ô này!')
        else if (!phoneNumber_pattern.test(phoneNumber)) return (err = 'Vui lòng nhập đúng số điện thoại!')
    },
    name: (name: any) => {
        let err: String
        if (name === '') return (err = 'Không để trống ô này!')
    },
    password: (password: any) => {
        let err: String
        const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/
        if (password === '') return (err = 'Không để trống ô này!')
        else if (!password_pattern.test(password))
            return (err = 'Mật khẩu phải có ít nhất 8 ký tự bao gồm chữ thường chữ hoa và số!')
    },
    other: (other: any) => {
        let err: String
        if (other === '') return (err = 'Không để trống ô này!')
    },
}

export default validateForm
