import { useEffect, useState } from "react";
import { Button } from "semantic-ui-react";

export default function ScrollToTop() {
    const handleScrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const handleScrolled = () => {
        setAtTop(window.scrollY === 0)
    }

    const [atTop, setAtTop] = useState(true)
    
    useEffect(() => {
        window.addEventListener('scroll', handleScrolled)
    }, [])
    

    return (
        <Button
            style={{
                position: 'fixed',
                bottom: 10,
                right: 10,
                color: "yellow",
            }}
            inverted
            onClick={handleScrollToTop}
            color="yellow"
            icon='up arrow'
            disabled={atTop}
        />
    )
}