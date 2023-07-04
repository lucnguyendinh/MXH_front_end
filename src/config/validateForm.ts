const validateForm = {
    email: (email: any) => {
        let err: String
        const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (email === '') return (err = 'Email is reqired!')
        else if (!email_pattern.test(email)) return (err = 'Email is not correct')
    },
    phoneNumber: (phoneNumber: any) => {
        let err: String
        const phoneNumber_pattern = /^\d{10}$/
        if (phoneNumber === '') return (err = 'Phone number is reqired!')
        else if (!phoneNumber_pattern.test(phoneNumber)) return (err = 'Phone number is not correct')
    },
    name: (name: any) => {
        let err: String
        if (name === '') return (err = 'Name is reqired!')
    },
    password: (password: any) => {
        let err: String
        const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/
        if (password === '') return (err = 'Password is reqired!')
        else if (!password_pattern.test(password)) return (err = 'Password is not correct')
    },
    other: (other: any) => {
        let err: String
        if (other === '') return (err = 'reqired!!!')
    },
}

export default validateForm
