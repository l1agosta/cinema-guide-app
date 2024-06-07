import {Heart} from "../../../icons/Heart.tsx";
import {Reroll} from "../../../icons/Reroll.tsx";
import './RandomFilm.css';
import {Star} from "../../../icons/Star.tsx";
import randomFilm from "../../../store/random-film.ts";
import {useEffect} from "react";
import {observer} from "mobx-react-lite";
export const RandomFilm = observer(() => {
    useEffect(() => {
        randomFilm.getRandom();
    }, [])

    return (
        <div className="main-container">
            <div className="col-5 random-film">
                <div>
                    <div className="statistics d-flex gap-4">
                        <span className="rating-film">
                            <Star/>
                            <span className="px-1">
                                {randomFilm.random.rating}
                            </span>
                        </span>
                        <span className="stats-text">{randomFilm.random.year}</span>
                        <span className="stats-text">заглушка жанра</span>
                        <span className="stats-text">{randomFilm.random.time} минут</span>
                        <span className="stats-text">заглушка продакшена</span>
                        {/*<span className="stats-text">{randomFilm.random.productions[0].title}</span>*/}
                    </div>
                    <div className="main-title-film mt-4">
                        <h2>{randomFilm.random.title}</h2>
                        <p className="description-film mt-3">{randomFilm.random.description}</p>
                    </div>
                    <div className="buttons-film d-flex gap-3 mt-5">
                        <button className="purple-btn">Трейлер</button>
                        <button className="dark-btn">О фильме</button>
                        <button className="dark-btn">
                            <Heart/>
                        </button>
                        <button className="dark-btn" onClick={() => randomFilm.getRandom()}>
                            <Reroll/>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
});