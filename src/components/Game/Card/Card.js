export default function Card({ card, handleChoice, flipped, disabled }) {

    const handleClick = () => {
        if (!disabled) {
            handleChoice(card)
        }
    }

    return (
        <div className="relative z-10">
            <div className={`${flipped ? "flipped" : ""}`}>
                <img className="m-0 p-0 w-4/5 object-cover border border-solid border-[#8b710b] rounded-[20px]"
                    src={card.src}
                    alt="card front"
                />
                <img className={`back ${flipped ? "transform rotate-y-0 transition-all duration-200 delay-200" : "transition-all duration-200 delay-200"}`}
                    src="/img/cover.png" 
                    onClick={handleClick}
                    alt="cover"
                />
            </div>
        </div>
    )
}
