interface Props {
    content: string;
}

export default function DiffSpan(props: Props) {
    const contentArray = props.content.split("\\*");

    return (
        <span>
            {contentArray.map((val, ind) => 
                <span style={{
                    color: ind % 2===0 ? "white" : "yellow"
                }}key={ind}>{val}</span>
            )}
        </span>
    )
}