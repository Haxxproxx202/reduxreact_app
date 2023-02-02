import React, { useState } from 'react';
import {addChecked, addToList, deleteItem} from "../redux/actions/actions";
import Result from "./Result";
import {getMovie} from "../api/getMovie";

const Form = ({add, list, addToToWatch, addWatched, deleteItem, addToWatch}) => {
    const [item, setItem] = useState("");
    const [year, setYear] = useState("");
    const [loader, setLoader] = useState(false);
    const [movieNotFound, setMovieNotFound] = useState(false);

    const handleChange = (e) => {
        const {name, value} = e.target;
        if (name === "item") {
            setItem(value);
        } else {
            setYear(value);
        }

        // setItem(e.target.value);
    }
    const checkSubmit = (item) => {
        if (item.Response === "True") {
            setLoader(false);
            if (list.some(el => el.imdbID === item.imdbID)) {
                console.log("Object already added!")
            } else {
                add(item);
            }
        } else {
            setLoader(false);
            setMovieNotFound(true);
            setTimeout(() => {
                setMovieNotFound(false);
            }, 2000)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoader(true);
        getMovie(item, year, checkSubmit)
    }


    return (
        <>
            <form className="form" onSubmit={handleSubmit}>
                <input type="text" name="item" value={item} placeholder="Enter movie name" onChange={handleChange}/>
                <input type="text" name="year" value={year} placeholder="Enter year" onChange={handleChange}/>
                <input id="kk" type="image" src="../../src/images/searchicon.png" alt="Search icon"></input>


            </form>
            {loader && <div className="loader"><img src="../../src/images/VAyR.gif" alt="spinner"/></div>}
            {movieNotFound && <div className="movie-not-found">Movie not found</div>}
            {list.length === 0 && <div className="first-view">Hey! Start searching for movies :)</div>}
            <div className="grid-list">
                {
                    list.map((el, id) => (
                        <Result
                            key={id}
                            data={el}
                            addToToWatch={addToToWatch}
                            addWatched={addWatched}
                            deleteItem={deleteItem}
                            addToWatch={addToWatch}
                        />
                    ))
                }
            </div>
        </>

    );
};

export default Form;