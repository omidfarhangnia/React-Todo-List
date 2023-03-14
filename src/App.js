import './App.css';
import { useState } from 'react';
import ghostImage from "./image/ghost__image.jpg";

function AddWorks({ inputsValue, toAddNewCard, toSaveNewCard }) {
  const ImportanceOption = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

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
          onChange={(e) => {toAddNewCard(e.target)}} 
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
          onChange={(e) => {toAddNewCard(e.target)}} 
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
          onChange={(e) => {toAddNewCard(e.target)}} 
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
          onChange={(e) => {toAddNewCard(e.target)}} 
          id={"importance__input"}
        >
          <option value={null}>without choose</option>
          {ImportanceOption.map((option, index) => <option key={index} value={option}>{option}</option>)}
        </select>
      </div>
      <button 
        onClick={(e) => {toSaveNewCard(e)}}
      >
        add it
      </button>
    </form>
  );
}

function ShowWorks({ cards, editingCardId, setEditingCardId, editInputsValue, filterStatus, toChangeNewCard, toRemoveCard, toSaveEdit }) {
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
    let CardsCopy = [...cards]
    // this is the function for sorting by numbers
    if(filterStatus === "score"){
      CardsCopy = CardsCopy.sort((a, b) => b.cardImportance - a.cardImportance);
    }
    if(filterStatus === "time"){
      CardsCopy = CardsCopy.sort((a, b) => {
        // add comments now
        let aHour = a.cardTime.match(/\d+(?=:)/g)[0][0] === "0" ? a.cardTime.match(/\d+(?=:)/g)[0][1] : a.cardTime.match(/\d+(?=:)/g)[0];
        let aMinute = a.cardTime.match(/\d+(?!:)$/g)[0][0] === "0" ? a.cardTime.match(/\d+(?!:)$/g)[0][1] : a.cardTime.match(/\d+(?!:)$/g)[0];
        
        let bHour = b.cardTime.match(/\d+(?=:)/g)[0][0] === "0" ? b.cardTime.match(/\d+(?=:)/g)[0][1] : b.cardTime.match(/\d+(?=:)/g)[0];
        let bMinute = b.cardTime.match(/\d+(?!:)$/g)[0][0] === "0" ? b.cardTime.match(/\d+(?!:)$/g)[0][1] : b.cardTime.match(/\d+(?!:)$/g)[0];

        if(Number(aHour) > Number(bHour)){
          return 1;
        }else if(Number(bHour) > Number(aHour)){
          return -1;
        }else{
          if(Number(aMinute) > Number(bMinute)){
            return 1;
          }else{
            return -1;
          }
        }
      });
    }
    // with card message
    return(
      <div className='cards__container'>
        {CardsCopy.map((card) => {
         if(editingCardId !== card.id){
          return(
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
              <button 
                className='card__setting--edit'
                onClick={() => {
                  setEditingCardId(card.id)
                }}
              >
                  edit
              </button>
              <button 
                className='card__setting--remove'
                onClick={(e) => {toRemoveCard(card.id)}}
              >
                remove
              </button>
            </div>
            </div>
          );
         }else{
          return(
            <div key={card.id} className='card edit__status'>
              <div>
                <label for="edit__title__input">
                  work title
                </label>
                <input 
                  value={editInputsValue.cardTitle}
                  name={"cardTitle"}
                  id={"edit__title__input"}
                  onChange={(e) => {toChangeNewCard(e.target, card.id)}}
                />
              </div>
              <div>
                <label for="edit__work__time">
                  work time
                </label>
                <input 
                  type={'time'}
                  name={"cardTime"}
                  id={"edit__work__time"}
                  value={editInputsValue.cardTime}
                  onChange={(e) => {toChangeNewCard(e.target, card.id)}}
                />
              </div>
              <div className='textAreaEditor'>
                <label for="edit__work__explanation">
                  work explanation
                </label>
                <textarea 
                  value={editInputsValue.cardExplanation}
                  name={"cardExplanation"}
                  id={"edit__work__explanation"}
                  onChange={(e) => {toChangeNewCard(e.target, card.id)}}
                />
              </div>
              <div>
                <label for="edit__work__importance">
                  importance
                </label>
                <input 
                  type={"number"} 
                  min={0} max={10} 
                  id={"edit__work__importance"}
                  name={"cardImportance"}
                  value={editInputsValue.cardImportance}
                  onChange={(e) => {toChangeNewCard(e.target, card.id)}}
                />
              </div>
              <div className='card__setting'>
                <button
                  onClick={() => {toSaveEdit(card.id)}}
                >
                  save
                </button>
              </div>
            </div>
          );
         }
        })}
      </div>
    );
  }
}

function FilterInput({ filterStatus, toChangeFilter }) {
  return(
    <form className='filterForm'>
      <label for={"filterSelect"}>
        you can use filter
      </label>
      <select value={filterStatus} id='filterSelect' onChange={(e) => {toChangeFilter(e.target.value)}}>
        <option value={null}>no filter</option>
        <option value={"score"}>by score</option>
        <option value={"time"}>by time</option>
      </select>
    </form>
  );
}

export default function FunctionalTODOList() {
  const [cards, setCards] = useState([]);
  const [id, setId] = useState(0);
  const [editingCardId, setEditingCardId] = useState(null);
  const [inputsValue, setInputsValue] = useState({
    titleInput: "",
    numberInput: "",
    textAreaInput: "",
    selectInput: "",
  });
  const [editInputsValue, setEditInputsValue] = useState({
    cardTitle: '', 
    cardImportance: '', 
    cardTime: '', 
    cardExplanation: ''
  });
  const [filterStatus, setFilterStatus] = useState(null);

  function handleChangeCardValue(target) {
    setEditInputsValue({
      ...editInputsValue,
      [target.name]: target.value
    });
  }

  function handleChangeFilter(value) {
    setFilterStatus(value)
  }

  function handleRemoveCard(cardId) {
    setCards(
      cards.filter(a => 
        a.id !== cardId
      )
    )
  }

  function handleResetInputs() {
    setEditInputsValue({
      cardTitle: '', 
      cardImportance: '', 
      cardTime: '', 
      cardExplanation: ''
  })
  }

  function handleAddNewCard(target) {
    setInputsValue({
      ...inputsValue,
      [target.name]: target.value
    })
  }

  function handleSaveNewCard(e) {
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

        setId(id + 1);
        
        setInputsValue({
          titleInput: "",
          numberInput: "",
          textAreaInput: "",
          selectInput: "",
        });
      }else{
        alert("please fill 'work title', 'work time' and 'importance' (explanation is recommended).")
      }
  }

  function handleSaveEdit(cardId) {
    setEditingCardId(null)

    let oldArrSituation;
    for(var i = 0; i < cards.length; i++){
      if(cards[i].id === cardId){
        oldArrSituation = i;
      }
    }

    // i want to clear my inputs

    handleResetInputs();

    const newArr = [...cards];
    newArr[oldArrSituation] = editInputsValue


    setCards(newArr)
  }

  return(
    <div id={"todo__list"}>
      <AddWorks 
        inputsValue={inputsValue} 
        toAddNewCard={handleAddNewCard}  
        toSaveNewCard={handleSaveNewCard}
      />
      <FilterInput 
        filterStatus={filterStatus}
        toChangeFilter={handleChangeFilter}
      />
      <ShowWorks 
        cards={cards}
        editingCardId={editingCardId}
        setEditingCardId={setEditingCardId}
        editInputsValue={editInputsValue}
        filterStatus={filterStatus}
        toChangeNewCard={handleChangeCardValue}
        toRemoveCard={handleRemoveCard}
        toSaveEdit={handleSaveEdit}
      />
    </div>
  );
}