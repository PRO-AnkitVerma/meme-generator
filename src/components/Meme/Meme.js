import React, { useState, useEffect } from "react";
import "./Meme.css";

function Meme(props) {
    const [meme, setMeme] = useState({
        topText: "",
        bottomText: "",
        randomImage: "http://i.imgflip.com/1bij.jpg",
    });

    const [allMemes, setAllMemes] = useState([]);

    const getNewMemeImage = () => {
        const randomNumber = Math.floor(Math.random() * allMemes.length);
        const url = allMemes[randomNumber].url;
        setMeme((prevState) => {
            return {
                ...prevState,
                randomImage: url,
            };
        });
    };

    useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
            .then((resp) => resp.json())
            .then((data) => {
                setAllMemes(data.data.memes);
            });
    }, []);

    function handleChange(event) {
        const { name, type, value, checked } = event.target;
        const newValue = type === "checkbox" ? checked : value;
        setMeme((prevState) => ({ ...prevState, [name]: newValue }));
    }

    return (
        <main>
            <div className="form">
                <input
                    type="text"
                    name="topText"
                    placeholder="top text"
                    className="form--input"
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="bottomText"
                    placeholder="bottom text"
                    onChange={handleChange}
                    className="form--input"
                />
                <button className="form--button" onClick={getNewMemeImage}>
                    Get a new meme image 🖼
                </button>
            </div>

            <div className="meme">
                <img src={meme.randomImage} alt="" className="meme--image" />
                <h2 className="meme--text top">{meme.topText}</h2>
                <h2 className="meme--text bottom">{meme.bottomText}</h2>
            </div>
        </main>
    );
}

export default Meme;
