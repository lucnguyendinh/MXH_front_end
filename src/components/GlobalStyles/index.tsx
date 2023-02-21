import './GlobalStyles.scss'

interface props {
    children: any
}

const GlobalStyles = (props: props) => {
    const { children } = props
    return children
}

export default GlobalStyles
