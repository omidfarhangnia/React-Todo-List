import './App.css';
import { useState } from 'react';
import ghostImage from "./image/ghost__image.jpg";

function AddWorks({ inputsValue, setInputsValue, cards, setCards, id, setid }) {
  const ImportanceOption = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  function handleChange(target) {
    setInputsValue({
      ...inputsValue,
      [target.name]: target.value
    })
  }

  function handleButtonClick(e) {
    e.preventDefault();
    if(!!inputsValue.titleInput &&
      !!inputsValue.numberInput &&
      !!inputsValue.selectInput){
        setCards([
          ...cards,
          {
            cardTitle: inputsValue.titleInput,
            cardTime: inputsValue.numberInput,
            cardExplanation: inputsValue.textAreaInput,
            cardImportance: inputsValue.selectInput,
            id: id
          }
        ])

        setid(id + 1);
        
        // setInputsValue({
        //   titleInput: "",
        //   numberInput: "",
        //   textAreaInput: "",
        //   selectInput: "",
        // });
      }else{
        alert("please fill 'work title', 'work time' and 'importance' (explanation is recommended).")
      }
  }

  return(
    <form className="Add__form">
      <div>
        <label 
          for="title__input"
        >
          work title
        </label>
        <input 
          value={inputsValue.titleInput} 
          name={"titleInput"} 
          onChange={(e) => {handleChange(e.target)}} 
          type={"text"} id={"title__input"}
        />
      </div>
      <div>
        <label
          for="time__input"
        >
          work time
        </label>
        <input 
          value={inputsValue.numberInput}
          name={"numberInput"}
          min="1" max="24" 
          onChange={(e) => {handleChange(e.target)}} 
          type={"time"} id={"time__input"}
        />
      </div>
      <div>
        <label 
          for="explanation__input"
        >
          work explanation
        </label>
        <textarea 
          value={inputsValue.textAreaInput}
          name={"textAreaInput"} 
          onChange={(e) => {handleChange(e.target)}} 
          id={"explanation__input"}
        >
        </textarea>
      </div>
      <div>
        {/* i am using input in this id because i want to end all these ids with input and make them cleaner */}
        <label 
          for="importance__input"
        >
          importance
        </label>
        <select 
          value={inputsValue.selectInput} 
          name={"selectInput"} 
          onChange={(e) => {handleChange(e.target)}} 
          id={"importance__input"}
        >
          <option value={null}>without choose</option>
          {ImportanceOption.map((option, index) => <option key={index} value={option}>{option}</option>)}
        </select>
      </div>
      <button 
        onClick={(e) => {handleButtonClick(e)}}
      >
        add it
      </button>
    </form>
  );
}

function ShowWorks({ cards, setCards }) {
  if(cards.length === 0){
    // without card message
    return(
      <div className="cards__container">
        <div className='empty__message'>
          <div className='empty__logo'>
            <img src={ghostImage} alt="this is an image of ghost" />
          </div>
          <h2>
            you have no cards.
          </h2>
        </div>
      </div>
    );
  }else{
    // with card message
    return(
      <div className='cards__container'>
        {cards.map((card) => (
          <div key={card.id} className='card'>
            <h3 className='card--header'>{card.cardTitle}</h3>
            <span className='card--importance'>{card.cardImportance}/10</span>
            <div className='card--time'>{card.cardTime}</div>
            {
              card.cardExplanation && 
              <div className='readMore'>
                <button 
                  className={`readMore--button readMore--button--${card.id}`}
                  onClick={() => {
                    const ReadMoreText = document.querySelector(`.readMore--text--${card.id}`);
                    const ReadMoreButton = document.querySelector(`.readMore--button--${card.id}`);

                    // at first i changed the text style
                    ReadMoreText.classList.toggle("d-none");

                    // and second i will check it for my button text content
                    if(ReadMoreText.className.includes("d-none")){
                      ReadMoreButton.textContent = "read more";
                    }else{
                      ReadMoreButton.textContent = "read less";
                    }
                    
                  }}
                >read More</button>
                <p className={`readMore--text readMore--text--${card.id} d-none`}>{card.cardExplanation}</p>
              </div>
            }
            <div className='card__setting'>
              <button className='card__setting--edit'>edit</button>
              <button 
                className='card__setting--remove'
                onClick={(e) => {
                  setCards(
                    cards.filter(a => 
                      a.id !== card.id
                    )
                  )
                }}
              >remove</button>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default function FunctionalTODOList() {
  const [cards, setCards] = useState([]);
  const [id, setid] = useState(0);
  // const [cards, setCards] = useState([
  //   {cardTitle: 'go climbing', cardTime: '22:32', cardExplanation: 'i should go climbing for my health', cardImportance: '8', id: 0},
  //   {cardTitle: 'go climbing', cardTime: '22:32', cardExplanation: 'i should go climbing for my health', cardImportance: '8', id: 1},
  //   {cardTitle: 'go climbing', cardTime: '22:32', cardExplanation: 'i should go climbing for my health', cardImportance: '8', id: 2},
  // ])
  const [inputsValue, setInputsValue] = useState({
    titleInput: "",
    numberInput: "",
    textAreaInput: "",
    selectInput: "",
  });

  return(
    <div id={"todo__list"}>
      <AddWorks 
        inputsValue={inputsValue} 
        setInputsValue={setInputsValue} 
        id={id} 
        setid={setid} 
        cards={cards} 
        setCards={setCards}/>
      <ShowWorks 
        cards={cards}
        setCards={setCards}
      />
    </div>
  );
}