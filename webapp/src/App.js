import './App.css';
import {useState, useEffect} from 'react';

function App() {
  
  // Set state from Fetch
  const [firebaseTrade, setFirebaseTrade] = useState([]);
  // Show / hide sections
  const [showSearch, setShowSearch] = useState(true);
  const [showCalculate, setShowCalculate] = useState(true)
  // Handle inputs
  const [calculated, setCalculated] = useState([]);
  // Search for item
  const [searchItem, setSearchItem] = useState("");
  const [weightGram, setWeightGram] = useState(Number);
  const [itemCalculate, setItemCalculate] = useState([]);
  
  
  // Fetch from DB api
  useEffect( () => {
    fetch(loadAllProductNamesAndGroup)
    .then(res => res.json())
    .then(data => setFirebaseTrade(data))
  },[showSearch])


  const requestBody = {
    ingredients: itemCalculate,
    calories: weightGram
  };

  const loadAllProductNamesAndGroup = "http://localhost:5000/api/products-all";
  const calculateProducts = "http://localhost:5000/api/weight-calculate";
  
  const calculate = async (item) => {
    
    setItemCalculate(item)

    fetch(calculateProducts, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(requestBody),
  }).then((res) => {
    if(res.status === 404) {
      alert("Something went wrong" + res.status)
    }
    console.log(requestBody + " Status message: " + res.status)
    res.json()
    .then(data => setCalculated(data))
    calculated.forEach(e => {
      e.forEach(x => {
        console.log(x.item)
      })
    })
  })
}



return (
  <div className="App">
    <header className="App-header">
      <button className="button" onClick={() => setShowSearch(!showSearch)}> Sök livsmedel</button>
      <button className="button" onClick={() => setShowCalculate(!showCalculate)}> Näringsvärden</button>
    </header>
  <div className="Page-body">
      <div className="Show-Adds">
        {showSearch &&
          <>
          <input
            className="Search-Bar"
            type="text"
            id="searchbar"
            placeholder="Sök livsmedel..."
            value={searchItem}
            onChange={(e) => setSearchItem(e.target.value)}
          />
          {firebaseTrade.filter(item => (item.name.toLowerCase().includes(searchItem.toLowerCase() || item.main_group.toLowerCase().includes(searchItem.toLowerCase())))).slice(0, 10).map(filterAdds => (
            <div className="Items" key={filterAdds.number}>
              Name: {filterAdds.name} <br/>
              Main group: {filterAdds.main_group} <br/>
              <input
                className="Weight-Input"
                type="text"
                id="weightinput"
                placeholder="Gram..."
                value={weightGram}
                onChange={(e) => {
                    setWeightGram(e.target.value)
                    //setItemCalculate(filterAdds.name)
                  }}/>
              <button className="" onClick={async() => await calculate(filterAdds.name)}>Calculate</button>
            </div>))}
          </>
        }
      </div>
        <div>
          {showCalculate &&
            <>
            <h2 className='Headline'>Näringsvärden</h2>
            {calculated.map(item => (
              item.map(prod => (
                <div className="Items Calculate" key={prod.item.product_name}>
                Produkt: {prod.item.product_name} <br/>
                {prod.item.value} gram {prod.item.nutrients_name} per {prod.item.weight_gram} gram <br/>
                {Math.round(prod.kcal * 100 / 100)} kcal {prod.item.nutrients_name} per {weightGram} gram <br/>
              </div>
              ))
            ))}
            </>
          }
        </div>
    </div>
  </div>
  );
}

export default App;
