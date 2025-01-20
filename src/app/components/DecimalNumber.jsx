

export default function DecimalNumber({size, number}) {
    const parts = number.toLocaleString().split(".")
    const whole = parts[0]
    const decimal = parts[1]

    const textSize = sizes[size];

    return <span className={textSize.whole + " tracking-wide"}>{whole}</span>
}