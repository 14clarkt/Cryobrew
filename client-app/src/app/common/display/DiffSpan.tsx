interface Props {
    content: string;
}

export default function DiffSpan(props: Props) {
    const contentArray = props.content.split("\\*");

    return (
        <span>
            {contentArray.map((val, ind) => 
                (ind % 2 === 0) ? <span key={ind}>{val}</span>
                : <span style={{color: "yellow"}}key={ind}>{val}</span>
            )}
        </span>
    )
}