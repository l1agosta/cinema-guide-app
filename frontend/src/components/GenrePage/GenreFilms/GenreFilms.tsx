import {useParams} from "react-router-dom";
import films from "../../../store/films.ts";
import {FilmCard} from "../../../ui/FilmCard/FilmCard.tsx";
import {film} from "../../../interfaces/film.ts";
import {useEffect} from "react";

export function GenreFilms() {
    const {title} = useParams();

    useEffect(() => {
        if (title) {
            films.getByGenre(title);
        }
    }, []);

    return (
        <div className="main-container mt-5">
            <h1 className="mb-5">{title}</h1>
            <div className="d-flex gap-5 mt-5 flex-wrap">
                {films.genreFilms.map((item: film, index: number) => {
                    return <FilmCard key={item.id} title={item.title} id={item.id} image={item.image} index={index}/>
                })}
            </div>
        </div>
    );
}