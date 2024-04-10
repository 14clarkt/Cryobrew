import { generateKey } from "../functions/CommonFunctions";
import { colorMap } from "../options/ColorList";

interface Props {
    content: string;
}

export default function DiffSpan(props: Props) {
    const colorizeSpan = (text: string): JSX.Element[] => {
        let earliestSet: [string, number] = ["none", -1]

        //find the earliest instance of a color tag.
        colorMap.forEach((value, key) => {
            let colorIndex = text.indexOf(value)
            if (colorIndex !== -1 && (earliestSet[1] === -1 || earliestSet[1] > colorIndex)) {
                earliestSet = [key, colorIndex]
            }
        })

        //return normal span if no tags were found.
        if (earliestSet[1] === -1)
            return [<span key={generateKey('ds0')}>{text}</span>]

        const splitSymbol = colorMap.get(earliestSet[0])!
        const textArray = text.split(splitSymbol);
        
        if (textArray.length > 2) {
            //Split at the second occurance of the splitsymbol and run this again on that split.
            let colorIndex = text.indexOf(splitSymbol)
            let recurssionText = text.slice(colorIndex + splitSymbol.length)
            colorIndex = recurssionText.indexOf(splitSymbol)
            recurssionText = recurssionText.slice(colorIndex + splitSymbol.length)
            return [<span key={generateKey('ds1')}>{textArray[0]}</span>, <span key={generateKey('ds2')} style={{ color: earliestSet[0] }}>{textArray[1]}</span>, ...colorizeSpan(recurssionText)]
        } else {
            return [<span key={generateKey('ds3')}>{textArray[0]}</span>, <span key={generateKey('ds4')} style={{ color: earliestSet[0] }}>{textArray[1]}</span>]
        }
    }

    return (
        <span key={generateKey('ds')}>
            {colorizeSpan(props.content)}
        </span>
    )
}
