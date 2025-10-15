import { Balloon } from "../components/Balloon";
import { useEffect, useState, useCallback } from "react";
import type { BalloonType } from "../components/Balloon";

const Game = () => {
    const [listaBalloon, setListaBalloon] = useState<BalloonType[]>([]);
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(30);
    const [gameOver, setGameOver] = useState(false);
    const [playerName, setPlayerName] = useState(""); 
    const [showInput, setShowInput] = useState(true); 

const createBalloon = (): BalloonType => {
    const colors = [
        "bg-red-500",
        "bg-blue-500",
        "bg-green-500",
        "bg-yellow-400",
        "bg-pink-500",
        "bg-purple-500",
        ];

    return {
      color: colors[Math.floor(Math.random() * colors.length)],
      top: Math.floor(Math.random() * 70),
      left: Math.floor(Math.random() * 70),
      id: Date.now() + Math.random(),
      size: Math.floor(Math.random() * (100 - 25 + 1)) + 25, 
    };
};

useEffect(() => {
    if (gameOver) return;

    const interval = setInterval(() => {
        setListaBalloon((prevList) => [...prevList, createBalloon()]);
    }, 2000);

    return () => clearInterval(interval);
}, [gameOver]);

useEffect(() => {
    if (timeLeft <= 0) {
        setGameOver(true);
        setListaBalloon([]); 
        return;
    }

    const timer = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearTimeout(timer);
    }, [timeLeft]);

const deleteBalloon = useCallback((id: number) => {
    setListaBalloon((prev) => prev.filter((b) => b.id !== id));
}, []);

const handlePop = (id: number) => {
    if (gameOver) return;
    setScore((prev) => prev + 1);
    deleteBalloon(id);
    setListaBalloon((prev) => [...prev, createBalloon()]); 
    };

const restartGame = () => {
    setScore(0);
    setTimeLeft(30);
    setGameOver(false);
    setListaBalloon([]);
    setShowInput(true); 
    };

const getRank = (score: number): string => {
    if (score < 10) return "Principiante";
    if (score < 20) return "Intermedio";
    return "Experto";
    };

const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (playerName.trim()) {
        setShowInput(false); 
    }
    };

return (
    <div className="flex flex-col items-center p-10 text-center text-white">
    {showInput && (
        <form onSubmit={handleNameSubmit} className="mb-4">
        <input
            type="text"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            placeholder="Ingresa tu nombre"
            className="p-2 rounded-lg text-black"
        />
        <button
            type="submit"
            className="ml-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-lg"
        >
            Iniciar
        </button>
        </form>
    )}

    {!showInput && (
        <>
        <h1 className="text-3xl text-light-blue-400 font-bold mb-4"> BALLOON POP :)</h1>

            <div className="mb-4 text-xl">
                Tiempo: <span className="text-purple-400">{timeLeft}</span> 
            </div>
            <div className="mb-4 text-xl">
                Puntuación: <span className="text-purple-400">{score}</span>
            </div>

            {gameOver && (
                <div className="mb-3 text-2xl text-pink-400 font-semibold">
                Juego Terminado 
                </div>
            )}

            <div className="relative border-2 border-pink-600 w-[600px] aspect-[6/5] overflow-hidden bg-gray-800 rounded-lg">
                {listaBalloon.map((balloon) => (
                <Balloon
                    key={balloon.id}
                    id={balloon.id}
                    color={balloon.color}
                    top={balloon.top}
                    left={balloon.left}
                    size={balloon.size}
                    onDelete={deleteBalloon}
                    onPop={handlePop}
                />
                ))}
            </div>

            {gameOver && (
                <div className="mt-4">
                <p className="text-xl">
                    Jugador: <span className="text-blue-400">{playerName}</span>
                </p>
                <p className="text-xl">
                    Rango: <span className="text-purple-400">{getRank(score)}</span>
                </p>
                <button
                    onClick={restartGame}
                    className="mt-6 px-6 py-2 bg-green-500 hover:bg-green-600 text-white font-bold rounded-lg"
                >
                    Reiniciar Juego
                </button>
                </div>
            )
            }
            </>
        )}
        </div>
    );
};

export default Game;